// PrintLayout.jsx
import React from 'react';
import UserInput from './UserInput';
import KickData from './KickData';
import WellboreSchematic from './WellboreSchematic';


const PrintLayout = () => {
  return (
    <div id="print-layout" className=" print:flex print:flex-col print:w-full print:h-screen">
      <div className="print:w-full">
        <UserInput />
      </div>
      <div className="print:w-full">
        <KickData />
      </div>
      <div className="print:w-full">
        <WellboreSchematic />
      </div>
    </div>
  );
};

export default PrintLayout;
