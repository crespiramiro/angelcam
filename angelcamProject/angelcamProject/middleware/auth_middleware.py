from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
import requests

class TokenAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Aquí puedes obtener el token desde los encabezados de la solicitud
        token = request.headers.get('Authorization')

        if not token:
            return JsonResponse({'error': 'No token provided'}, status=401)
        
        # Verifica si el token es válido
        response = requests.get('https://api.angelcam.com/v1/shared-cameras', headers={'Authorization': token})
        
        if response.status_code != 200:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        # Puedes agregar más lógica aquí para establecer el usuario en la solicitud
