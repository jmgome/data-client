import { useFormik } from "formik";
import * as Yup from "yup"; // Importar Yup
import { useState } from "react";
import AcientosTribuna from "../AcientosTribuna";
import { getAllFiles, UploadAbonado } from "@/app/service/service";

const FormularioTribuna = ( {refreshData} ) => {
  const [openModalTribuna, setOpenModalTribuna] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({
    tribuna: "",
    seats: [],
  });
  const [fileList, setFileList] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      num_cedula: "",
      tribuna: "",
      asiento: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras")
        .required("El nombre es obligatorio HPT")
        .max(30, "Máximo 30 caracteres")
        .min(3, "Mínimo 3 caracteres"),
      apellido: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras")
        .required("El apellido es obligatorio HPT")
        .max(30, "Máximo 30 caracteres")
        .min(3, "Mínimo 3 caracteres"),
      num_cedula: Yup.string()
        .matches(/^\d+$/, "Solo se permiten números")
        .min(7, "La cédula debe tener al menos 7 dígitos")
        .max(10, "La cédula no puede tener más de 10 dígitos")
        .required("La cédula es obligatoria"),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (!selectedSeats.tribuna || selectedSeats.seats.length === 0) {
        setErrors({ asiento: "Por favor, selecciona una tribuna y asientos." });
      }

      const dataToSend = {
        ...values,
        asiento: selectedSeats.seats,
        tribuna: selectedSeats.tribuna,
      };
      try {
        const response = await UploadAbonado(dataToSend);

        if (response.status === 200 || response.status === 201) {
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
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
            className="p-2 border rounded w-full"
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <span className="text-red-500">{formik.errors.nombre}</span>
          )}
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
            onBlur={formik.handleBlur}
            value={formik.values.apellido}
            className="p-2 border rounded w-full"
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <span className="text-red-500">{formik.errors.apellido}</span>
          )}
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
            onBlur={formik.handleBlur}
            value={formik.values.num_cedula}
            className="p-2 border rounded w-full"
          />
          {formik.touched.num_cedula && formik.errors.num_cedula && (
            <span className="text-red-500">{formik.errors.num_cedula}</span>
          )}
        </div>

        <button
          type="button"
          className="px-4 py-2 border-b mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpenModalTribuna(true)}
        >
          Seleccionar tribuna y asiento
        </button>

        {formik.errors.asiento && (
          <span className="text-red-500">{formik.errors.asiento}</span>
        )}
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
