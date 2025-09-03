from django.contrib import admin
from django.urls import path, include
from reports.views import health


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reports.urls')),  
    
 
]



