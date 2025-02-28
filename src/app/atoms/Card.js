"use client";
import { getAllFiles } from "@/app/service/service";
import { useEffect, useState } from "react";

const Card = () => {
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
    <div style={{ padding: "15px", width: "100%" }}>
      <div className="table-container mt-3 mb-5">
        <table
          className="responsive-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "auto",
          }}
        >
          <thead className="head">
            <tr>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd", textAlign: "left" }}>
                Nombre
              </th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd", textAlign: "left" }}>
                Apellido
              </th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd", textAlign: "left" }}>
                No Cc.
              </th>
            </tr>
          </thead>
          <tbody>
            {fileList.length > 0 ? (
              fileList.map((file, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {file.nombre}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {file.apellido}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                    {file.documento}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: "10px", textAlign: "center" }}>
                  No hay archivos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Card;

