import { useState } from 'react';

const AcientosTribuna = ({ open, setOpen, setSelectedSeats, refreshData }) => {
  const numRows = 5;
  const seatsPerRow = 10;
  const totalSeatsPerSection = numRows * seatsPerRow;
  const maxSeatsToShow = 20;
  const [selectedSeats, setInternalSelectedSeats] = useState([]);
  const [selectedTribuna, setSelectedTribuna] = useState('');
  const [showMoreSeats, setShowMoreSeats] = useState({});

  const toggleSeatSelection = (section, row, seat) => {
    const seatId = `${section}-${row}-${seat}`;
    setInternalSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((s) => s !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
    setSelectedTribuna(section); 
  };

  const toggleShowMore = (section) => {
    setShowMoreSeats((prevShowMoreSeats) => ({
      ...prevShowMoreSeats,
      [section]: !prevShowMoreSeats[section],
    }));
  };

  const handleSaveSeats = () => {
    setSelectedSeats({ seats: selectedSeats, tribuna: selectedTribuna }); 
    setOpen(false);
  };

  const sections = ['Norte', 'Sur', 'Este', 'Oeste'];

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Selección de Asientos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => {
          const isExpanded = showMoreSeats[section];

          return (
            <div key={section} className="space-y-4">
              <h2 className="text-xl font-semibold mb-2 text-center">{section}</h2>
              {Array.from({ length: numRows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center space-x-2">
                  {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                    const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                    const seatId = `${section}-${rowIndex + 1}-${seatIndex + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    if (seatNumber > maxSeatsToShow && !isExpanded) return null;

                    return (
                      <div
                        key={seatIndex}
                        className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 flex items-center justify-center cursor-pointer ${
                          isSelected ? 'bg-green-500 text-white' : 'bg-white text-black'
                        }`}
                        onClick={() => toggleSeatSelection(section, rowIndex + 1, seatIndex + 1)}
                      >
                        {seatNumber}
                      </div>
                    );
                  })}
                </div>
              ))}

              {totalSeatsPerSection > maxSeatsToShow && (
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                    onClick={() => toggleShowMore(section)}
                  >
                    {isExpanded ? 'Mostrar menos' : '... Mostrar más'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            handleSaveSeats();
            refreshData;
          }}
        >
          Guardar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AcientosTribuna;
