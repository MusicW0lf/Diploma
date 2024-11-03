from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_main, name='user_main'),
    path('main/', views.user_main, name='user_main'),
    path('theme/', views.user_theme, name='user_theme'),
    path('subscription/', views.user_subscription, name='user_subscription'),
    path('courses/', views.user_courses, name='user_courses'),
    path('laboratory/', views.user_laboratory, name='user_laboratory'),
    path('user/', views.user_user, name='user_user'),
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
]
