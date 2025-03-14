import { getAllFiles } from "@/app/service/service";
import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";
import ModalInfo from "./Modals/ModalInfo";
import FormularioTribuna from "./Forms/Formik";

const Card = () => {
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenInfo = (user) => {
    setSelectedUser(user);
    setIsOpenInfo(true);
  };

  const getAllFile = async () => {
    try {
      const { data } = await getAllFiles();
      console.log("Datos recibidos:", data);
      setFileList(data);
      setLoadingFiles(false);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      setError("Error al obtener los archivos.");
      setLoadingFiles(false);
    }
  };

  const refreshData = () => {
    getAllFile();
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
      <Modal open={openModal} setOpen={setOpenModal}>
        <FormularioTribuna
          refreshData={() => {
            refreshData(); 
            setOpenModal(false);
          }}
        />
      </Modal>

      <div className="mt-5 w-full">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b-2 text-left">Nombre</th>
                <th className="px-4 py-2 border-b-2 text-left">Apellido</th>
                <th className="px-4 py-2 border-b-2 text-left">No Cc.</th>
                <th className="px-4 py-2 border-b-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fileList.length > 0 ? (
                fileList.map((file, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b text-left">
                      {file.nombre}
                    </td>
                    <td className="px-4 py-2 border-b text-left">
                      {file.apellido}
                    </td>
                    <td className="px-4 py-2 border-b text-left">
                      {file.num_cedula}
                    </td>
                    <td>
                      <button
                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleOpenInfo(file)}
                      >
                        Ver más
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
      <ModalInfo
        open={isOpenInfo}
        setOpen={setIsOpenInfo}
        user={selectedUser}
      />
    </div>
  );
};

export default Card;
