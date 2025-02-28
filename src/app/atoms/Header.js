import React from 'react'
function getCurrentYear() {
    return new Date().getFullYear();
  }
const Header = () => {
    const year = getCurrentYear();
  return (
    <div className="w-full h-20 bg-lime-700 flex justify-center">
      <h1>Subscriber user panel</h1>
      <p>abonados estadio parque sur año {year}</p>
    </div>
  )
}

export default Header
