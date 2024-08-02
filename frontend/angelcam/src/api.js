const BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchCameras() {
  const response = await fetch(`${BASE_URL}/cameras/`);
  if (!response.ok) {
    throw new Error('Failed to fetch cameras');
  }
  console.log(response);
  return response.json();
}

export async function fetchCameraStream(cameraId) {
  const response = await fetch(`${BASE_URL}/cameras/${cameraId}/stream/`);
  if (!response.ok) {
    throw new Error('Failed to fetch camera stream');
  }
  console.log(response);
  return response.json();
}

export async function fetchRecordings(cameraId) {
  const response = await fetch(`${BASE_URL}/cameras/${cameraId}/recordings/`);
  if (!response.ok) {
    throw new Error('Failed to fetch recordings');
  }
  console.log(response);
  return response.json();
}
