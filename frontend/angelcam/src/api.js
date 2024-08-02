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
    try {
        const response = await fetch(`${BASE_URL}/cameras/${cameraId}/stream/`);
        if (!response.ok) {
            throw new Error('Failed to fetch camera stream');
        }
        const data = await response.json();
        console.log('Camera Stream Data:', data); // Imprime el resultado en la consola
        return data;
    } catch (error) {
        console.error('Error fetching camera stream:', error);
        return null;
    }
}



export async function fetchRecordings(cameraId) {
    try {
        const response = await fetch(`${BASE_URL}/cameras/${cameraId}/recordings/`);
        if (!response.ok) {
            throw new Error('Failed to fetch recordings');
        }
        const data = await response.json();
        console.log('Recordings Data:', data); // Imprime el resultado en la consola
        return data;
    } catch (error) {
        console.error('Error fetching recordings:', error);
        return [];
    }
}