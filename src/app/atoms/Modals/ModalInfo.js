import React from 'react';

const ModalInfo = ({ open, setOpen,user }) => {

    if (!open || !user) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
        <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-lg max-h-[600px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-4">Datos Usuario</h2>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Apellido:</strong> {user.apellido}</p>
          <p><strong>Tribuna:</strong> {user.tribuna}</p>
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

export default ModalInfo;
