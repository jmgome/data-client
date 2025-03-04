import React from 'react';

function getCurrentYear() {
  return new Date().getFullYear();
}

const Header = () => {
  const year = getCurrentYear();
  return (
    <div className="w-full h-20 bg-lime-700 flex items-center px-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-white">Subscriber User Panel</h1>
        <p className="text-white">Abonados Estadio Parque Sur - Año {year}</p>
      </div>
      <p className="text-white">ADMIN LOGGED IN</p>
    </div>
  );
};

export default Header;