from django.db import models
from django.contrib.auth import get_user_model
import random

# Assuming you have a User model already set up
User = get_user_model()

class Project(models.Model):
    LANGUAGES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('java', 'Java'),
        ('c', 'C'),
        ('ruby', 'Ruby'),
        ('go', 'Go'),
        ('html', 'HTML'),
        ('css', 'CSS'),
    ]
    
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    language = models.CharField(max_length=20, choices=LANGUAGES)
    code = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    random_colors = models.JSONField()  # Store a list of two colors (as a JSON array)
    
    def save(self, *args, **kwargs):
        if not self.random_colors:  # If random colors are not set, generate them
            self.random_colors = [self.generate_random_color(), self.generate_random_color()]
        super().save(*args, **kwargs)
    
    def generate_random_color(self):
        """Generate a random hex color."""
        return f'#{random.randint(0, 0xFFFFFF):06x}'
    
    def __str__(self):
        return self.name
