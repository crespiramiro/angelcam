import { useState } from 'react';
import { CameraStream } from '../components/CameraStream';
import { CameraList } from '../components/CameraList';
import { RecordingsList } from '../components/RecordingsList';

const Home = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera);
    console.log(camera,'CAMARA');
  };

  return (
    <div className="container mx-auto p-4">
      <CameraList onSelectCamera={handleSelectCamera} />
      {selectedCamera && (
        <>
          <CameraStream cameraId={selectedCamera.id} />
          <RecordingsList cameraId={selectedCamera.id} />
        </>
      )}
    </div>
  );
};

export default Home;
