import { useState, useEffect } from 'react';
import { fetchRecordings } from '../api';

export const RecordingsList = ({ cameraId }) => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const data = await fetchRecordings(cameraId);
        setRecordings(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getRecordings();
  }, [cameraId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recordings</h2>
      <ul>
        {recordings.map((recording, index) => (
          <li key={index}>
            <video src={recording.url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
};

