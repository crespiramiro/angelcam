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
      console.log(data); // Añade este console.log para verificar la respuesta
      return data.results;
}


// export async function fetchCameraStream(cameraId) {
//     try {
//         const response = await fetch(`${BASE_URL}/cameras/${cameraId}/stream/`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch camera stream');
//         }
//         const data = await response.json();
//         console.log('Camera Stream Data:', data); // Imprime el resultado en la consola
//         return data;
//     } catch (error) {
//         console.error('Error fetching camera stream:', error);
//         return null;
//     }
// }

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

        console.log('Respuesta de la verificación del token:', response);

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



export async function fetchRecordings(cameraId) {
    try {
        const response = await fetch(`${BASE_URL}/cameras/${cameraId}/recordings/`);
        if (!response.ok) {
            throw new Error('Failed to fetch recordings');
        }
        const data = await response.json();
        console.log('Recordings Data:', data); // Imprime el resultado en la consola
        return [data]; // Devuelve un array con el objeto de grabación
    } catch (error) {
        console.error('Error fetching recordings:', error);
        return [];
    }
}
