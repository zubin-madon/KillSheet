import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from './AppContext';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


// Register Chart.js components
Chart.register(...registerables);

const KickData = () => {
  // Destructuring values that are shared with the app context
  const {
    holeTVD,
    currentDrillingMudWeight,
    dynamicPressureLoss1SPM1,
    dynamicPressureLoss1SPM2,
    dynamicPressureLoss1SPM3,
    dynamicPressureLoss2SPM1,
    dynamicPressureLoss2SPM2,
    dynamicPressureLoss2SPM3,
    dynamicPressureLoss3SPM1,
    dynamicPressureLoss3SPM2,
    dynamicPressureLoss3SPM3,
    stringStrokes,
    slowPumpRate1,
    slowPumpRate2,
    slowPumpRate3,
  } = useAppContext();
  
  // Local state hooks for variables used only within KickData
  const [SIDPP, setSIDPP] = useState('');
  const [SICP, setSICP] = useState('');
  const [pitGain, setPitGain] = useState('');
  const [killMudWeight, setKillMudWeight] = useState('');
  const [ICP, setICP] = useState('');
  const [FCP, setFCP] = useState('');
  const [KValue, setKValue] = useState('');
  const [k100OverStringStrokes, setK100OverStringStrokes] = useState('');
  
  // Helper function to select the first non-zero dynamic pressure loss
  const getDynamicPressureLoss = useCallback(() => {
    return (
      parseFloat(dynamicPressureLoss1SPM1) ||
      parseFloat(dynamicPressureLoss2SPM1) ||
      parseFloat(dynamicPressureLoss3SPM1) ||
      parseFloat(dynamicPressureLoss1SPM2) ||
      parseFloat(dynamicPressureLoss2SPM2) ||
      parseFloat(dynamicPressureLoss3SPM2) ||
      parseFloat(dynamicPressureLoss1SPM3) ||
      parseFloat(dynamicPressureLoss2SPM3) ||
      parseFloat(dynamicPressureLoss3SPM3) ||
      0
    );
  }, [
    dynamicPressureLoss1SPM1,
    dynamicPressureLoss2SPM1,
    dynamicPressureLoss3SPM1,
    dynamicPressureLoss1SPM2,
    dynamicPressureLoss2SPM2,
    dynamicPressureLoss3SPM2,
    dynamicPressureLoss1SPM3,
    dynamicPressureLoss2SPM3,
    dynamicPressureLoss3SPM3,
  ]);

  const getUsedSlowPumpRate = useCallback(
    (dynamicPressureLoss) => {
      // All SPM1 values correspond to slowPumpRate1
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss1SPM1)) return slowPumpRate1;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss2SPM1)) return slowPumpRate1;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss3SPM1)) return slowPumpRate1;

      // All SPM2 values correspond to slowPumpRate2
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss1SPM2)) return slowPumpRate2;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss2SPM2)) return slowPumpRate2;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss3SPM2)) return slowPumpRate2;

      // All SPM3 values correspond to slowPumpRate3
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss1SPM3)) return slowPumpRate3;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss2SPM3)) return slowPumpRate3;
      if (dynamicPressureLoss === parseFloat(dynamicPressureLoss3SPM3)) return slowPumpRate3;

      return 0; // Default fallback if no match is found
    },
    [
      dynamicPressureLoss1SPM1,
      dynamicPressureLoss2SPM1,
      dynamicPressureLoss3SPM1,
      dynamicPressureLoss1SPM2,
      dynamicPressureLoss2SPM2,
      dynamicPressureLoss3SPM2,
      dynamicPressureLoss1SPM3,
      dynamicPressureLoss2SPM3,
      dynamicPressureLoss3SPM3,
      slowPumpRate1,
      slowPumpRate2,
      slowPumpRate3,
    ]
  );

  // Calculation functions for each formula
  const calculateKillMudWeight = useCallback(() => {
    const tvd = parseFloat(holeTVD) || 0;
    const currentMW = parseFloat(currentDrillingMudWeight) || 0;
    const sidpp = parseFloat(SIDPP) || 0;
    return (currentMW + sidpp / (0.052 * tvd)).toFixed(2);
  }, [holeTVD, currentDrillingMudWeight, SIDPP]);

  const calculateICP = useCallback(
    (dynamicPressureLoss) => {
      const sidpp = parseFloat(SIDPP) || 0;
      return (sidpp + dynamicPressureLoss).toFixed(2);
    },
    [SIDPP]
  );

  const calculateFCP = useCallback(
    (killMW, dynamicPressureLoss) => {
      const currentMW = parseFloat(currentDrillingMudWeight) || 1; // Prevent division by zero
      return ((parseFloat(killMW) / currentMW) * dynamicPressureLoss).toFixed(2);
    },
    [currentDrillingMudWeight]
  );

  const calculateKValue = useCallback((icp, fcp) => {
    return (parseFloat(icp) - parseFloat(fcp)).toFixed(2);
  }, []);

  const calculateK100OverStringStrokes = useCallback(
    (kValue) => {
      const strokes = parseFloat(stringStrokes) || 1; // Prevent division by zero
      return ((parseFloat(kValue) * 100) / strokes).toFixed(2);
    },
    [stringStrokes]
  );
  
  // useEffect to recalculate values when dependencies change
  useEffect(() => {
    const dynamicPressureLoss = getDynamicPressureLoss();
    const usedKillMudWeight = calculateKillMudWeight();
    const calculatedICP = calculateICP(dynamicPressureLoss);
    const calculatedFCP = calculateFCP(usedKillMudWeight, dynamicPressureLoss);
    const calculatedKValue = calculateKValue(calculatedICP, calculatedFCP);
    const calculatedK100OverStringStrokes = calculateK100OverStringStrokes(calculatedKValue);

    setKillMudWeight(usedKillMudWeight);
    setICP(calculatedICP);
    setFCP(calculatedFCP);
    setKValue(calculatedKValue);
    setK100OverStringStrokes(calculatedK100OverStringStrokes);
  }, [
    SIDPP,
    holeTVD,
    currentDrillingMudWeight,
    stringStrokes,
    getDynamicPressureLoss,
    calculateKillMudWeight,
    calculateICP,
    calculateFCP,
    calculateKValue,
    calculateK100OverStringStrokes,
  ]);

  // Function to generate step-down data based on strokes and pressures
    const [strokePressureData, setStrokePressureData] = useState([]);
    const generateStrokePressureData = useCallback(() => {
    let strokes = parseFloat(stringStrokes) || 0;
    let currentICP = parseFloat(ICP) || 0;
    const decrement = parseFloat(k100OverStringStrokes) || 0;
  
    // Create step-down data
    const data = [];
    while (strokes >= 0) {
      data.push({ strokes: strokes.toFixed(0), pressure: currentICP.toFixed(2) });
      currentICP -= decrement;
      strokes -= 100; // Decrease strokes per step, e.g., 100 strokes
    }
  
    setStrokePressureData(data); // Update state with generated data
  }, [ICP, k100OverStringStrokes, stringStrokes]);

 // Trigger data generation when inputs change
useEffect(() => {
    generateStrokePressureData();
  }, [k100OverStringStrokes]);

  const chartData = {
    labels: strokePressureData.map((item) => item.strokes), // X-axis values (strokes)
    datasets: [
      {
        label: 'Pressure vs. Strokes',
        data: strokePressureData.map((item) => item.pressure), // Y-axis values (pressure)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // Ensures a 1:1 aspect ratio
    scales: {
      x: {
        title: {
          display: true,
          text: 'Strokes'
        },
        ticks: {
          maxRotation: 45, // Adjust rotation for better readability if needed
        },
      },
      y: {
        title: {
          display: true,
          text: 'Pressure'
        },
        ticks: {
          callback: function (value) {
            return value; // Adjust this callback if necessary
          },
        },
      },
    },
  };
  

  return (
    <div className="border-gray-400 border-4 p-3">
      <div className="border-2 border-black p-2">
        {/* Header */}
        <h2 className="text-lg font-bold text-gray-700">Kick Data Calculations</h2>

        {/* SIDPP, SICP, PIT GAIN */}
        <div className="grid grid-cols-3 gap-2 my-2">
          <div>
            <label className="block text-gray-700 font-bold">SIDPP</label>
            <input
              type="text"
              value={SIDPP}
              onChange={(e) => setSIDPP(e.target.value)}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="psi"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">SICP</label>
            <input
              type="text"
              value={SICP}
              onChange={(e) => setSICP(e.target.value)}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="psi"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">PIT GAIN</label>
            <input
              type="text"
              value={pitGain}
              onChange={(e) => setPitGain(e.target.value)}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="barrels"
            />
          </div>
        </div>

        {/* KILL MUD WEIGHT, ICP, FCP, K */}
        <div className="grid grid-cols-4 gap-2 my-4">
          <div>
            <label className="block text-gray-700 font-bold">KILL MUD WEIGHT (ppg)</label>
            <input
              type="text"
              value={killMudWeight}
              onChange={(e) => setKillMudWeight(e.target.value)}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="ppg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">ICP (psi)</label>
            <input
              type="text"
              value={ICP}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="psi"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">FCP (psi)</label>
            <input
              type="text"
              value={FCP}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="psi"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">(K) (psi)</label>
            <input
              type="text"
              value={KValue}
              className="w-full border-2 border-black p-1 text-lg"
              placeholder="psi"
              readOnly
            />
          </div>
        </div>

        {/* K*100/String Strokes */}
        <div className="mt-4">
          <label className="block text-gray-700 font-bold">K*100 / String Strokes</label>
          <input
            type="text"
            value={k100OverStringStrokes}
            className="w-full border-2 border-black p-1 text-lg"
            placeholder="psi"
            readOnly
          />
        </div>

        {/* Display the slow pump rate used for dynamic pressure loss */}
        <div className="mt-4">
          <p className="text-sm text-gray-600"><i>
            (Dynamic Pressure Loss used is at {getUsedSlowPumpRate(getDynamicPressureLoss())} SPM)
            </i></p>
        </div>

        <>
  {k100OverStringStrokes > 0 && (
    <div className="mt-4 flex flex-col md:flex-row gap-4">
      {/* Table */}
      <div className="md:w-1/3 flex-shrink-0 overflow-x-auto">
        <h3 className="text-lg font-bold mb-2">Stroke-Pressure Step-Down Table</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Strokes</th>
              <th className="py-2 px-4 border-b">Pressure (psi)</th>
            </tr>
          </thead>
          <tbody>
            {strokePressureData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{row.strokes}</td>
                <td className="py-2 px-4 border-b text-center">{row.pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="md:w-2/3 flex-grow flex items-top justify-center">
        <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
          {/* Ensures the container has a 1:1 aspect ratio */}
          <div className="absolute top-0 left-0 w-full h-full">
            <h3 className="text-lg font-bold mb-2">Stroke-Pressure Step-Down Chart</h3>
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  )}
</>




      </div>
    </div>
  );
};

export default KickData;
