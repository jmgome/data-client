import React from 'react';
import FormularioTribuna from '../Forms/Formik';

const Modal = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-semibold mb-4">Agregar Nuevo</h2>
        <FormularioTribuna />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
