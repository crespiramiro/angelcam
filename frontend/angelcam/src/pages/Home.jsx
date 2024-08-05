import { useState } from 'react';
import { CameraStream } from '../components/CameraStream';
import { CameraList } from '../components/CameraList';
import { RecordingsList } from '../components/RecordingsList';
import Header from '../components/Header';

const Home = ({onLogout}) => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera);
    console.log(camera, 'CAMARA');
  };

  return (
    <div className="container mx-auto p-4">
        <Header onLogout={onLogout} />  
      <CameraList onSelectCamera={handleSelectCamera} />
      {selectedCamera && (
        <>
          <CameraStream camera={selectedCamera} />
          <RecordingsList cameraId={selectedCamera.id} />
        </>
      )}
    </div>
  );
};

export default Home;
