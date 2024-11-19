from RestrictedPython import compile_restricted, safe_globals
from RestrictedPython.Guards import safe_builtins
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import builtins

@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        try:
            # Parse the request body to get the code
            data = json.loads(request.body)
            code = data.get('code', '')

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
