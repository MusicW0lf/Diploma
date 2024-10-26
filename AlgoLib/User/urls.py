from django.urls import path
from . import views

urlpatterns = [
    path('main/', views.user_main, name='user_main'),
    path('user/', views.user_user, name='user_user'),
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
]
