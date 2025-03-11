import { useState } from 'react';

const AcientosTribuna = ({ open, setOpen, setSelectedSeats }) => {
  const numRows = 5;
  const seatsPerRow = 10;
  const [selectedSeats, setInternalSelectedSeats] = useState([]);

  const toggleSeatSelection = (section, row, seat) => {
    const seatId = `${section}-${row}-${seat}`;
    setInternalSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(s => s !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const sections = ['Norte', 'Sur', 'Este', 'Oeste'];

  // Guardar asientos seleccionados y cerrar modal
  const handleSaveSeats = () => {
    setSelectedSeats(selectedSeats); // Actualizar asientos seleccionados en el padre
    setOpen(false); // Cerrar modal
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold mb-4">Selección de Asientos</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-center">{section}</h2>
            {/* Filas de asientos */}
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-4 justify-center">
                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                  const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                  const seatId = `${section}-${rowIndex + 1}-${seatIndex + 1}`;
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <div
                      key={seatIndex}
                      className={`w-12 h-12 border-2 flex items-center justify-center cursor-pointer ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                      onClick={() => toggleSeatSelection(section, rowIndex + 1, seatIndex + 1)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSaveSeats} // Guardar y cerrar modal
        >
          Guardar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setOpen(false)} // Solo cerrar sin guardar
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AcientosTribuna;
