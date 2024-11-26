from RestrictedPython import compile_restricted, safe_globals
from RestrictedPython.Guards import safe_builtins
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, random
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Project

@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        try:
            # Parse the request body to get the code
            data = json.loads(request.body)
            code = data.get('code', '')
            project_id = data.get('project_id')
            print(project_id)
            project = get_object_or_404(Project, project_id=project_id)
            project.code = code
            project.save()

            if not code:
                return JsonResponse({'stdout': None, 'error': 'No code provided.'})

            # Prepare restricted environment
            exec_globals = safe_globals.copy()
            exec_globals['__builtins__'] = safe_builtins.copy()

            # Add specific allowed built-ins
            allowed_builtins = {
                'range': range,
                'len': len,
                'int': int,
                'float': float,
                'str': str,  # Explicitly include str
                'list': list,
                'dict': dict,
                'set': set,
                'tuple': tuple,
                'sorted': sorted,
                'min': min,
                'max': max,
                'sum': sum,
                'any': any,
                'all': all,
                'enumerate': enumerate,
                'zip': zip,
        
            }

            def custom_print(*args, **kwargs):
                result.append(" ".join(map(str, args)))

            allowed_builtins['print'] = custom_print
            exec_globals['__builtins__'].update(allowed_builtins)


            # Prepare a result list to capture output
            result = []
            exec_globals['result'] = result.append  # Redirect result capture to the list

            compiled_code = compile_restricted(code, '<string>', 'exec', policy=None)
            exec(compiled_code, exec_globals, {})

            output = result if result else 'Execution completed without output.'

            return JsonResponse({'stdout': output, 'error': None})
        except Exception as e:
            # Handle errors gracefully
            return JsonResponse({'stdout': None, 'error': str(e)})
    return JsonResponse({'error': 'Invalid request method'}, status=405)



# Helper function to generate random colors
def generate_random_colors():
    colors = ['#'+ ''.join([random.choice('0123456789ABCDEF') for _ in range(6)]) for _ in range(2)]
    return colors

@login_required
def create_project(request, language):
    project_name = "ADD NAME POPUP PLS"
    project_code = "#write your project code here!"

    project = Project.objects.create(
        name=project_name,
        language=language,
        code=project_code,
        author=request.user,
        random_colors=generate_random_colors()
    )
    print("we created project!")

    return redirect('laboratory', project_id=project.project_id)

def laboratory(request, project_id=None):
    if not request.user.is_authenticated:
        return redirect("user_login")
    if project_id:
        try:
            project = Project.objects.get(pk=project_id)
            if request.user != project.author:
                return redirect('user_login')
            
            if request.method == 'POST':
                project.code = request.POST.get('code')
                project.save()

            return render(request, 'laboratory/code.html', {'project': project})

        except Project.DoesNotExist:
            return redirect('laboratory_main')
    else:
        user_projects = Project.objects.filter(author=request.user)
        return render(request, 'laboratory/laboratory.html', {'projects': user_projects})
