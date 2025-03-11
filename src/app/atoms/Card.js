import { getAllFiles } from "@/app/service/service";
import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";

const Card = () => {
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getAllFile = async () => {
    try {
      const { data } = await getAllFiles();
      console.log('Datos recibidos:', data); // Verifica la estructura de los datos
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
    <div className="w-full p-4">
      <div className="flex justify-between items-center mt-5">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 justify-end ml-auto"
          onClick={() => setOpenModal(true)}
        >
          Agregar nuevo abonado
        </button>
      </div>
      <Modal open={openModal} setOpen={setOpenModal} />

      <div className="mt-5 w-full">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b-2">Nombre</th>
                <th className="px-4 py-2 border-b-2">Apellido</th>
                <th className="px-4 py-2 border-b-2">No Cc.</th>
                <th className="px-4 py-2 border-b-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fileList.length > 0 ? (
                fileList.map((file, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{file.nombre}</td>
                    <td className="px-4 py-2 border-b">{file.apellido}</td>
                    <td className="px-4 py-2 border-b">{file.documento}</td>
                    <td>
                    <button
                      className="px-4 py-2 border-b mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      // onClick={() => setOpen(false)}
                    >
                      Ver mas
                    </button>
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No hay archivos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Card;
