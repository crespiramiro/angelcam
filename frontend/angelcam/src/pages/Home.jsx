import { useState } from 'react';
import CameraList from '../components/CameraList'
import { CameraStream } from '../components/CameraStream';
import { RecordingsList } from '../components/RecordingsList';
import Header from '../components/Header';

const Home = ({onLogout}) => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera);
    console.log(camera, 'CAMARA');
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden container  bg-[#f5f5f5]  flex flex-col justify-start items-start ">
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
