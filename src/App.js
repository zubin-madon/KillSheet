import React, { useState, useEffect } from 'react';
import WellboreSchematic from './components/WellboreSchematic';
import UserInput from './components/UserInput';

function App() {
  const [csgData, setCsgData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('csgData');
    if (savedData) {
      setCsgData(JSON.parse(savedData));
    }
  }, []);

  const handleDataUpdate = (data) => {
    setCsgData(data);
    localStorage.setItem('csgData', JSON.stringify(data));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4">
        <UserInput onUpdate={handleDataUpdate} />
      </div>
      <div className="w-1/2 p-4">
        <WellboreSchematic csgData={csgData} />
      </div>
    </div>
  );
}

export default App;
