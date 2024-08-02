import React, { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';
import { fetchRecordings } from '../api'; 

export const RecordingsList = ({ cameraId }) => {
  const [recordings, setRecordings] = useState([]);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const data = await fetchRecordings(cameraId);
        console.log('Recordings Data:', data); 
        setRecordings([data]); 
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    if (cameraId) {
      getRecordings();
    }
  }, [cameraId]);

  useEffect(() => {
    if (selectedRecording && videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls(); 

      if (Hls.isSupported()) {
        hls.loadSource(selectedRecording.url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = selectedRecording.url;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }

      return () => {
        hls.destroy();
      };
    }
  }, [selectedRecording]);

  return (
    <div>
      {recordings.length > 0 ? (
        <div>
          <ul>
            {recordings.map((recording) => (
              <li key={recording.stream_info}>
                <button onClick={() => setSelectedRecording(recording)}>
                  {recording.stream_info}
                </button>
              </li>
            ))}
          </ul>
          {selectedRecording && (
            <div>
              <video
                ref={videoRef}
                controls
                style={{ width: '100%', height: 'auto' }}
              ></video>
            </div>
          )}
        </div>
      ) : (
        <p>No recordings available</p>
      )}
    </div>
  );
};
