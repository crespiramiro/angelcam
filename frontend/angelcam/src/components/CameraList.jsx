import { useState, useEffect } from "react";
import { fetchCameras } from "../api";

const CameraList = ({ onSelectCamera }) => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const data = await fetchCameras();
        if (Array.isArray(data)) {
          setCameras(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    getCameras();
  }, []);

  return (
    <section className="flex flex-col w-full h-full px-4 py-8 bg-[#f5f5f5]">
      <h2 className="text-2xl font-bold  self-center text-blue-500 opacity-70 my-8 ">Camera List</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center py-6 gap-x-12 ">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white w-2/6 p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectCamera(camera)}
          >
            <img
              src={camera.live_snapshot}
              alt={camera.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold">{camera.name}</h3>
              <p className="text-gray-500">Status: {camera.status}</p>
              <p className="text-gray-500">
                Owner: {camera.owner.first_name} {camera.owner.last_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CameraList;
