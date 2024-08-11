import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'; 
import { fetchRecordings } from '../api';

export const RecordingsList = ({ cameraId }) => {
  const [recording, setRecording] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getRecordings = async () => {
      const startTime = '2024-07-02T14:00:00Z';
      const endTime = '2024-07-02T14:02:00Z';

      try {
        const data = await fetchRecordings(cameraId, startTime, endTime);
        console.log('Recordings Data in Component:', data);
        if (data) {
          setRecording(data); 
        } else {
          console.error('No recording available:', data);
        }
      } catch (error) {
        console.error('Error fetching recording:', error);
      }
    };

    getRecordings();
  }, [cameraId]);

  useEffect(() => {
    if (recording && videoRef.current) {
      const hls = new Hls({
        liveSyncDurationCount: 1,
        maxLiveSyncPlaybackRate: 1, 
        liveDurationInfinity: false, 
      });
  
      const recordingUrl = recording.url;
  
      hls.loadSource(recordingUrl);
      hls.attachMedia(videoRef.current);
  
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
  
      return () => {
        hls.destroy();
      };
    }
  }, [recording]);

  return (
    <div>
      <h2>Recording</h2>
      {recording ? (
        <div>
          <h3>Recording Details</h3>
          <video
            ref={videoRef}
            controls
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ) : (
        <p>No recording available.</p>
      )}
    </div>
  );
};
