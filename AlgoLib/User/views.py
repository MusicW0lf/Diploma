from django.shortcuts import render

def user_view(request):
    return render(request, 'user/user.html')
def user_register(request):
    return render(request, 'user/register.html')
def user_login(request):
    return render(request, 'user/login.html')