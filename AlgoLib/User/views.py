from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from .models import CustomUser

def user_main(request):
    return render(request, 'user/main.html')
def user_theme(request):
    return render(request, 'user/theme.html')
def user_subscription(request):
    return render(request, 'user/subscription.html')
def user_courses(request):
    return render(request, 'user/courses.html')
def user_laboratory(request):
    return render(request, 'user/laboratory.html')
def user_user(request):
    return render(request, 'user/user.html')
def user_register(request):
    return render(request, 'user/register.html')
def user_login(request):
    return render(request, 'user/login.html')
def user_tos(request):
    return render(request, 'user/tos.html')


# Registration view
def registration(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password_confirm = request.POST['password_confirm']

        if password != password_confirm:
            messages.error(request, "Passwords do not match.")
            return redirect('registration')

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Email already in use.")
            return redirect('registration')

        user = CustomUser.objects.create_user(username=username, email=email, password=password)
        login(request, user)

        print(f"User registered: {user.username}, {user.email}")
        messages.success(request, "Registration successful!")
        return redirect('user_main')  # redirect to the home page or wherever you'd like after login

    return redirect('user_main')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        # Authenticate using the email and password
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            messages.success(request, "Login successful!")
            return redirect('user_main')  # Redirect to the main page or dashboard
        else:
            messages.error(request, "Invalid credentials.")
            return redirect('login_view')  # Redirect back to the login page

    return redirect("user_login")


def logout_view(request):
    logout(request)
    return redirect('user_main')  # Redirect to the login page after logging out