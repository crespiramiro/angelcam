# views.py

from django.shortcuts import render
from django.http import JsonResponse
from .api import list_cameras, get_camera_stream, get_recordings
from .utils import extract_token  # Importar la función extract_token

def index(request):
    return render(request, 'cameras/index.html')

def api_list_cameras(request):
    token = extract_token(request)
    if not token:
        return JsonResponse({'error': 'Token no proporcionado'}, status=401)

    cameras = list_cameras(token)
    return JsonResponse(cameras)

def api_camera_stream(request, camera_id):
    token = extract_token(request)
    if not token:
        return JsonResponse({'error': 'Token no proporcionado'}, status=401)

    try:
        stream = get_camera_stream(token, camera_id)
        return JsonResponse(stream)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def api_recordings(request, camera_id):
    token = extract_token(request)
    if not token:
        return JsonResponse({'error': 'Token no proporcionado'}, status=401)

    try:
        recordings = get_recordings(token, camera_id)
        return JsonResponse(recordings)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
