import React from 'react';
import { useFormik } from 'formik';

const FormularioTribuna = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      cedula: '',
      tribuna: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Muestra los valores en una alerta
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 w-full">
      <div className="flex flex-col">
        <label htmlFor="nombre" className="mb-1 font-semibold">Nombre</label>
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
        <label htmlFor="apellido" className="mb-1 font-semibold">Apellido</label>
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
        <label htmlFor="cedula" className="mb-1 font-semibold">Cédula</label>
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
        <label htmlFor="tribuna" className="mb-1 font-semibold">Tribuna</label>
        <input
          id="tribuna"
          name="tribuna"
          type="text"
          placeholder="Tribuna"
          onChange={formik.handleChange}
          value={formik.values.tribuna}
          className="p-2 border rounded w-full"
        />
      </div>

      <button type="submit" className="mt-4 bg-lime-700 text-white px-4 py-2 rounded hover:bg-green-600">
        Enviar
      </button>
    </form>
  );
};

export default FormularioTribuna;
