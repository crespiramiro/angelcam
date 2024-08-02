import { useState } from 'react';
import { CameraStream } from '../components/CameraStream';
import {CameraList} from '../components/CameraList'
import {RecordingsList} from '../components/RecordingsList'


 const Home = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <CameraList onSelectCamera={setSelectedCamera} />
      {selectedCamera && (
        <>
          <CameraStream cameraId={selectedCamera} />
          <RecordingsList cameraId={selectedCamera} />
        </>
      )}
    </div>
  );
};

export default Home;

