const BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchCameras() {
    const response = await fetch('http://127.0.0.1:8000/api/cameras/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data); // Añade este console.log para verificar la respuesta
    return data.results;
}

export async function fetchCameraStream(cameraId) {
  const response = await fetch(`${BASE_URL}/cameras/${cameraId}/stream/`);
  if (!response.ok) {
    throw new Error('Failed to fetch camera stream');
  }
  return response.json();
}

export async function fetchRecordings(cameraId) {
  const response = await fetch(`${BASE_URL}/cameras/${cameraId}/recordings/`);
  if (!response.ok) {
    throw new Error('Failed to fetch recordings');
  }
  return response.json();
}
