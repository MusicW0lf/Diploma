from django.urls import path
from .views import execute_code
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="laboratory/code.html"), name='home'),
    path('execute/', execute_code, name='execute_code'),
]
