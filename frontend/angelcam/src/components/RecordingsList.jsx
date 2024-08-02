import { useEffect, useState } from 'react';
import { fetchRecordings } from '../api'; // Ajusta la ruta según sea necesario

export const RecordingsList = ({ cameraId }) => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const data = await fetchRecordings(cameraId);
        setRecordings([data]);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    if (cameraId) {
      getRecordings();
    }
  }, [cameraId]);

  return (
    <div>
      {recordings.length > 0 ? (
        <ul>
          {recordings.map((recording, index) => (
            <li key={index}>
              <video controls width="600">
                <source src={recording.url} type="application/x-mpegUR" />
                Your browser does not support the video tag.
              </video>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recordings available</p>
      )}
    </div>
  );
};
