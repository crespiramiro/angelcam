const BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchCameras() {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch('http://127.0.0.1:8000/api/cameras/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `PersonalAccessToken ${token}`
        },
    });
    if (!response.ok) {
        console.log(token, 'TOKEN');
        const error = await response.json();
        console.error('Error:', error);
        throw new Error('Failed to fetch cameras');
      }
      
      const data = await response.json();
      console.log('fetchcamera DAta', data); 
      return data.results;
}



export async function verifyToken(token) {
    console.log('Verificando el token:', token);

    try {
        const response = await fetch('https://api.angelcam.com/v1/shared-cameras/', {
            method: 'GET',
            headers: {
                'Authorization': `PersonalAccessToken ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response to token verification', response);

        if (response.ok) {
            return true; // Token is valid
        } else {
            return false; // Token is invalid
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return false;
    }
}



export async function fetchRecordings(cameraId, startTime, endTime) {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`${BASE_URL}/cameras/${cameraId}/recording/stream?start=${startTime}&end=${endTime}`, {
            method: 'GET',
            headers: {
                'Authorization': `PersonalAccessToken ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recordings');
        }

        const data = await response.json();
        console.log('Recordings Data:', data);
        return data; 
    } catch (error) {
        console.error('Error fetching recordings:', error);
        return null; 
    }
}