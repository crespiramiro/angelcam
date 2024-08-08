# api.py

import requests

BASE_URL = 'https://api.angelcam.com/v1'

def get_headers(token):
    return {
        'Authorization': f'PersonalAccessToken {token}',
        'Content-Type': 'application/json'
    }

def list_cameras(token): 
    response = requests.get(f'{BASE_URL}/shared-cameras', headers=get_headers(token))
    return response.json()

def get_camera_stream(token, camera_id):
    response = requests.get(f'{BASE_URL}/shared-cameras/{camera_id}/recording/stream?start=2024-07-31T00:00:00.000Z', headers=get_headers(token))
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.text}

def get_recordings(token, camera_id):
    start_time = "2024-08-02T14:00:00Z"
    end_time = "2024-08-02T14:05:00Z"

    response = requests.get(
        f'{BASE_URL}/shared-cameras/{camera_id}/recording/stream?start={start_time}&end={end_time}',
        headers=get_headers(token)
    )
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.text}
