from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.user_view, name='user_view'),
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
]
