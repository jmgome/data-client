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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          id="nombre"
          name="nombre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nombre}
        />
      </div>

      <div>
        <input
          id="apellido"
          name="apellido"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.apellido}
        />
      </div>

      <div>
        <input
          id="cedula"
          name="cedula"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.cedula}
        />
      </div>

      <div>
        <input
          id="tribuna"
          name="tribuna"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.tribuna}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioTribuna;