from django.urls import path
from .views import execute_code
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('', views.laboratory, name='laboratory_main'),
    path('execute/', execute_code, name='execute_code'),
    path('create-project/', views.create_project, name='create-project'),
    path('<int:project_id>/', views.laboratory, name='laboratory'),
    path('delete/<int:project_id>/', views.delete_project, name='delete_project'),
    path('rename/<int:project_id>/', views.rename_project, name="rename_project")
]
