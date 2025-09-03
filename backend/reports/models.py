from django.db import models
# reports/models.py

from django.db import models

class HazardReport(models.Model):
    CATEGORY_CHOICES = [
        ('road', 'Road'),
        ('sidewalk', 'Sidewalk'),
        ('electrical', 'Electrical'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='hazard_images/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=255, blank=True)
    reported_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.category}"

