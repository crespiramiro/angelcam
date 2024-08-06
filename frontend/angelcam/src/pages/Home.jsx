import { useState } from 'react';
import CameraStream from '../components/CameraStream';
import { RecordingsList } from '../components/RecordingsList';
import CameraList from '../components/CameraList'
import Header from '../components/Header';

const Home = ({ onLogout }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera);
    console.log(camera, 'CAMERA SELECTED'); // Verifica que la cámara seleccionada se muestra correctamente
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden container bg-[#f5f5f5] flex flex-col justify-start items-start">
      <Header onLogout={onLogout} />
      <CameraList onSelectCamera={handleSelectCamera} />  {/* Pasa la función handleSelectCamera */}
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
