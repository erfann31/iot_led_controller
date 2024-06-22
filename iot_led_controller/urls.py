from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from led_ctl.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index_view'),
    path('api/v1/led/', include('led_ctl.urls')),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)