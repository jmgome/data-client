"use client";
import { getAllFiles } from "./service/service";
import { useEffect, useState } from "react";

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);

  const getAllFile = async () => {
    try {
      const { data } = await getAllFiles();
      setFileList(data);
      setLoadingFiles(false);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      if (error.response) {
        console.log("Error en la respuesta:", error.response.data);
      } else if (error.request) {
        console.log("Error en la solicitud:", error.request);
      } else {
        console.log("Error general:", error.message);
      }
      setError("Error al obtener los archivos.");
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    getAllFile();
  }, []);

  if (loadingFiles) return <p>Cargando archivos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Archivos</h1>
      {fileList.length > 0 ? (
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              {file.nombre} {file.apellido} - Documento: {file.documento}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay archivos disponibles.</p>
      )}
    </div>
  );
}
