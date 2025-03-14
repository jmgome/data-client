import { useFormik } from "formik";
import { useState } from "react";
import AcientosTribuna from "../AcientosTribuna";
import { getAllFiles, UploadAbonado } from "@/app/service/service";

const FormularioTribuna = ( {refreshData} ) => {
  const [openModalTribuna, setOpenModalTribuna] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({ seats: [], tribuna: "" });
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);
console.log('refreshData', refreshData)
  // const getAllFile = async () => {
  //     try {
  //       const { data } = await getAllFiles();
  //       console.log("Datos recibidos:", data);
  //       setFileList(data);
  //       setLoadingFiles(false);
  //     } catch (error) {
  //       console.error("Error al obtener los archivos:", error);
  //       setError("Error al obtener los archivos.");
  //       setLoadingFiles(false);
  //     }
  //   };
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      num_cedula: "",
      tribuna: "",
      asiento: "",
    },
    onSubmit: async (values) => {
      if (!selectedSeats.tribuna || selectedSeats.seats.length === 0) {
        alert("Por favor, selecciona una tribuna y asientos.");
        return;
      }

      const dataToSend = {
        ...values,
        asiento: selectedSeats.seats,
        tribuna: selectedSeats.tribuna,
      };

      console.log("Datos a enviar:", dataToSend);

      try {
        const response = await UploadAbonado(dataToSend);

        if (response.status === 200 || response.status === 201) {
          alert("Datos guardados correctamente");
          
          refreshData(); 
          
        } else {
          console.error("Error al guardar los datos:", response.data);
          alert("Error al guardar los datos. Verifica la información.");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al conectar con el servidor. Intenta nuevamente.");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="nombre" className="mb-1 font-semibold">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="apellido" className="mb-1 font-semibold">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.apellido}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="num_cedula" className="mb-1 font-semibold">
            Cédula
          </label>
          <input
            id="num_cedula"
            name="num_cedula"
            type="text"
            placeholder="Cédula"
            onChange={formik.handleChange}
            value={formik.values.num_cedula} 
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          type="button"
          className="px-4 py-2 border-b mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpenModalTribuna(true)}
        >
          Seleccionar tribuna y asiento
        </button>

        <button
          type="submit"
          className="mt-4 bg-lime-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Enviar
        </button>
      </form>

      {openModalTribuna && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenModalTribuna(false)}
            >
              X
            </button>
            <AcientosTribuna
              open={openModalTribuna}
              setOpen={setOpenModalTribuna}
              setSelectedSeats={setSelectedSeats}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioTribuna;
