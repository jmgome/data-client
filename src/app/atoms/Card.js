import { getAllFiles } from "@/app/service/service";
import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";
import ModalInfo from "./Modals/ModalInfo";

const Card = () => {
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleOpenInfo = (user) => {
    setSelectedUser(user);
    setIsOpenInfo(true);
  };

  const getAllFile = async () => {
    try {
      const { data } = await getAllFiles();
      setFileList(data);
      setLoadingFiles(false);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      setError("Error al obtener los archivos.");
      setLoadingFiles(false);
    }
  };

  const [dataVersion, setDataVersion] = useState(0);
  const refreshData = () => {
    getAllFile();
    setDataVersion(dataVersion + 1); 
    setOpenModal(false);
  };
  useEffect(() => {
    getAllFile();
  }, []);
const addUser = (newFile)=>{
  setFileList(prev=> [...prev, newFile])
}
const filteredFiles = fileList.filter(
  (file) =>
    file.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.num_cedula.toString().includes(searchQuery)
);
  if (loadingFiles) return <p style={{display:"flex", justifyContent:"center"}}><img src="https://i.gifer.com/Zgmm.gif"alt="Cargando archivos..."/></p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full p-4">
      
      <div className="flex justify-between items-center mt-5">
      <input
          type="text"
          className="px-4 py-2 border rounded"
          placeholder="Filtrar por nombre o cédula"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 justify-end ml-auto"
          onClick={() => setOpenModal(true)}
        >
          Agregar nuevo abonado
        </button>
      
      
      </div>

      <Modal open={openModal} setOpen={setOpenModal} refreshData={refreshData}/>

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
            <tbody className="text-center">
              { filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
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
                        className="px-4 py-2 mt-4 bg-lime-700 text-white rounded hover:bg-lime-900"
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
