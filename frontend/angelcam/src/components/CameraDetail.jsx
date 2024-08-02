import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCameraById } from "../api";

export const CameraDetail = () => {
  const { id } = useParams();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getCameraDetail = async () => {
      const data = await fetchCameraById(id);
      setCamera(data);
    };

    getCameraDetail();
  }, [id]);

  if (!camera) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{camera.name}</h2>
      <p>{camera.description}</p>
      {/* Agrega más detalles según la estructura de tu cámara */}
    </div>
  );
};
