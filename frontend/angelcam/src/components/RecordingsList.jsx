import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'; 
import { fetchRecordings } from '../api';

export const RecordingsList = ({ cameraId }) => {
  const [recordings, setRecordings] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const data = await fetchRecordings(cameraId);
        console.log('Recordings Data in Component:', data);
        if (Array.isArray(data) && data.length > 0) {
          setRecordings(data);
        } else {
          console.error('No recordings available or data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    getRecordings();
  }, [cameraId]);

  useEffect(() => {
    if (recordings.length > 0 && videoRef.current) {
      const hls = new Hls();
      const firstRecordingUrl = recordings[0].url;

      hls.loadSource(firstRecordingUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    }
  }, [recordings]);

  return (
    <div>
      <h2>Recordings List</h2>
      {recordings.length > 0 ? (
        <ul>
          {recordings.map((recording, index) => (
            <li key={index}>
              <h3>Recording {index + 1}</h3>
              <video
                ref={videoRef}
                controls
                style={{ width: '100%', height: 'auto' }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No recordings available.</p>
      )}
    </div>
  );
};
