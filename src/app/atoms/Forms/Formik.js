import React, { useState } from "react";
import { useFormik } from "formik";
import Home from "../AcientosTribuna";
import { UploadAbonado } from "@/app/service/service";

const FormularioTribuna = () => {
  const [openModalTribuna, setOpenModalTribuna] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      cedula: "",
      tribuna: "",
    },
    onSubmit: async (values) => {
      const dataToSend = {
        ...values,
        asientos: selectedSeats,
      };

      try {
        const response = await UploadAbonado(dataToSend); 

        if (response.status === 200) {
          alert('Datos guardados correctamente');
        } else {
          alert('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
      }
    }, // Aquí cerramos correctamente el bloque `onSubmit`
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col space-y-4 w-full"
      >
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
          <label htmlFor="cedula" className="mb-1 font-semibold">
            Cédula
          </label>
          <input
            id="cedula"
            name="cedula"
            type="text"
            placeholder="Cédula"
            onChange={formik.handleChange}
            value={formik.values.cedula}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tribuna" className="mb-1 font-semibold">
            Tribuna
          </label>
          <button
            type="button"
            className="px-4 py-2 border-b mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setOpenModalTribuna(true)}
          >
            Seleccionar tribuna y asiento
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-lime-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Enviar
        </button>
      </form>

      {/* Modal para la selección de tribunas */}
      {openModalTribuna && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenModalTribuna(false)}
            >
              X
            </button>
            <Home
              open={openModalTribuna}
              setOpen={setOpenModalTribuna}
              setSelectedSeats={setSelectedSeats} // Pasar función para actualizar los asientos seleccionados
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioTribuna;
