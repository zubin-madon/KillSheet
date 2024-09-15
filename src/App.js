import React, { useState, useEffect, useRef } from 'react';
import WellboreSchematic from './components/WellboreSchematic';
import UserInput from './components/UserInput';
import KickData from './components/KickData';
import { AppProvider } from './components/AppContext';
import './styles.css';  // Ensure your styles are here
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [csgData, setCsgData] = useState([]);
  const userInputRef = useRef(null);
  const kickDataRef = useRef(null);
  const wellboreSchematicRef = useRef(null);

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

  const saveAsPDF = () => {
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4', // A4 size in mm
      
    });

    const components = [
      { ref: userInputRef, title: 'User Input' },
      { ref: kickDataRef, title: 'Kick Data' },
      { ref: wellboreSchematicRef, title: 'Wellbore Schematic' },
    ];

    components.forEach((component, index) => {
      html2canvas(component.ref.current, {
        scale: 3,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (index > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        if (index === components.length - 1) {
          const now = new Date();
          const dateString = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // Format as HH-MM-SS
          const filename = `Kill_Sheet_${dateString}_${timeString}.pdf`;
      
          pdf.save(filename);
        }
      });
    });
  };

  return (
    <AppProvider>
      <div className="relative flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col">
          <div className="flex">
            <div className="w-full p-4 flex flex-col space-y-4">
              <div ref={userInputRef}>
                <UserInput onUpdate={handleDataUpdate} />
              </div>
              <div ref={kickDataRef}>
                <KickData />
              </div>
            </div>
            <div className="w-full p-4">
              <div ref={wellboreSchematicRef}>
                <WellboreSchematic csgData={csgData} />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <button
            type="button"
            onClick={saveAsPDF}
            className="bg-gray-500 text-white border border-black rounded-md px-4 py-2 mb-4 ml-4 mr-4"
          >
            Save as PDF
          </button>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
