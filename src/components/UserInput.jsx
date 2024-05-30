import React, { useState, useEffect } from 'react';

const tubularData = {
  "2-7/8inDP(CYX)": {
    pipeSize: "2-7/8\" DP",
    lbFt: 10.4,
    rng: 2,
    grade: "CYX-105",
    thread: "HTPAC",
    toolCapBblM: 0.0042,
    dispBblM: 0.004,
    tensileLbs: 300100,
    torsFtLbs: 16200,
    muTorqFtLbs: 4800,
    idIn: 1.5,
    driftIn: 1.375,
    jtOdIn: 3.125
  },
  "2-7/8inDP(4145)": {
    pipeSize: "2-7/8\" DP",
    lbFt: 10.4,
    rng: 2,
    grade: "4145M",
    thread: "HTPAC",
    toolCapBblM: 0.0022,
    dispBblM: 0.0073,
    tensileLbs: null,
    torsFtLbs: null,
    muTorqFtLbs: 5200,
    idIn: 1.5,
    driftIn: 1.375,
    jtOdIn: 3.125
  },
  "4inDP": {
    pipeSize: "4\" DP",
    lbFt: 21.9,
    rng: 2,
    grade: "S-135",
    thread: "XTF39",
    toolCapBblM: 0.0346,
    dispBblM: 0.0181,
    tensileLbs: 403500,
    torsFtLbs: 32753,
    muTorqFtLbs: 22200,
    idIn: 3.34,
    driftIn: 2.438,
    jtOdIn: 4.875
  },
  "4inHW": {
    pipeSize: "4\" HW",
    lbFt: 28.24,
    rng: 2,
    grade: "STDHW",
    thread: "XTF39",
    toolCapBblM: 0.0209,
    dispBblM: 0.0336,
    tensileLbs: 724100,
    torsFtLbs: 37000,
    muTorqFtLbs: 22200,
    idIn: 2.562,
    driftIn: 2.313,
    jtOdIn: 4.875
  },
  "4-3/4inDC": {
    pipeSize: "4-3/4\" DC",
    lbFt: 46.72,
    rng: 2,
    grade: null,
    thread: "NC38",
    toolCapBblM: 0.0161,
    dispBblM: 0.0557,
    tensileLbs: 725000,
    torsFtLbs: 17600,
    muTorqFtLbs: 11000,
    idIn: 2.25,
    driftIn: 2.12,
    jtOdIn: 4.75
  },
  "5-1/2in(one)": {
    pipeSize: "5-1/2\" DP",
    lbFt: 26.13,
    rng: 3,
    grade: "S-135",
    thread: "XT57",
    toolCapBblM: 0.0674,
    dispBblM: 0.0318,
    tensileLbs: 895000,
    torsFtLbs: 101000,
    muTorqFtLbs: 56600,
    idIn: 4.25,
    driftIn: 4.12,
    jtOdIn: 7
  },
  "5-1/2in(two)": {
    pipeSize: "5-1/2\" DP",
    lbFt: 26.13,
    rng: 3,
    grade: "S-135",
    thread: "XT57",
    toolCapBblM: 0.051,
    dispBblM: 0.0652,
    tensileLbs: 1390000,
    torsFtLbs: 106200,
    muTorqFtLbs: 63700,
    idIn: 4,
    driftIn: 3.75,
    jtOdIn: 7
  },
  "5-7/8inHW": {
    pipeSize: "5-7/8\" HW",
    lbFt: 54.64,
    rng: 2,
    grade: null,
    thread: "NC50",
    toolCapBblM: 0.0286,
    dispBblM: 0.1165,
    tensileLbs: 1290000,
    torsFtLbs: 53000,
    muTorqFtLbs: 33100,
    idIn: 3,
    driftIn: 2.875,
    jtOdIn: 6.75
  },
  "6-3/4inDC": {
    pipeSize: "6-3/4\" DC",
    lbFt: 96.62,
    rng: 2,
    grade: "S-135",
    thread: "XTF69",
    toolCapBblM: 0.1072,
    dispBblM: 0.038,
    tensileLbs: 865000,
    torsFtLbs: 165000,
    muTorqFtLbs: 80000,
    idIn: 5.25,
    driftIn: 5.125,
    jtOdIn: 8.5
  },
  "6-5/8inDP": {
    pipeSize: "6-5/8\" DP",
    lbFt: 27.7,
    rng: 3,
    grade: "STDHW",
    thread: "XTF69",
    toolCapBblM: 0.0646,
    dispBblM: 0.0853,
    tensileLbs: 2380000,
    torsFtLbs: 177100,
    muTorqFtLbs: 80000,
    idIn: 4.5,
    driftIn: 4.25,
    jtOdIn: 8.5
  },
  "6-5/8inHW": {
    pipeSize: "6-5/8\" HW",
    lbFt: 71.58,
    rng: 2,
    grade: null,
    thread: "NC61",
    toolCapBblM: 0.0336,
    dispBblM: 0.2103,
    tensileLbs: 2000000,
    torsFtLbs: 99000,
    muTorqFtLbs: 62000,
    idIn: 3.25,
    driftIn: 3.125,
    jtOdIn: 8.75
  },
  "8-3/4inDC": {
    pipeSize: "8-3/4\" DC",
    lbFt: 176.2,
    rng: 2,
    grade: null,
    thread: "NC77",
    toolCapBblM: 0.0286,
    dispBblM: 0.357,
    tensileLbs: 3700000,
    torsFtLbs: 233000,
    muTorqFtLbs: 160000,
    idIn: 3,
    driftIn: 2.87,
    jtOdIn: 11
  },
  "11inDC": {
    pipeSize: "11\" DC",
    lbFt: 299,
    rng: 2,
    grade: null,
    thread: null,
    toolCapBblM: null,
    dispBblM: null,
    tensileLbs: null,
    torsFtLbs: null,
    muTorqFtLbs: null,
    idIn: null,
    driftIn: null,
    jtOdIn: null
  }
};



const UserInput = () => {
  // State variables for input fields
  const [formationStrengthTest, setFormationStrengthTest] = useState('');
  const [mudWeightAtTest, setMudWeightAtTest] = useState('');
  const [currentDrillingMudWeight, setCurrentDrillingMudWeight] = useState('');
  const [casingSize, setCasingSize] = useState('');
  const [casingMeasuredDepth, setCasingMeasuredDepth] = useState('');
  const [casingTVD, setCasingTVD] = useState('');
  const [holeSize, setHoleSize] = useState('');
  const [holeMeasuredDepth, setHoleMeasuredDepth] = useState('');
  const [holeTVD, setHoleTVD] = useState('');
  const [pumpDisplacement1, setPumpDisplacement1] = useState('');
  const [pumpDisplacement2, setPumpDisplacement2] = useState('');
  const [pumpDisplacement3, setPumpDisplacement3] = useState('');
  const [slowPumpRate1, setSlowPumpRate1] = useState('');
  const [slowPumpRate2, setSlowPumpRate2] = useState('');
  const [slowPumpRate3, setSlowPumpRate3] = useState('');
  const [dynamicPressureLoss1SPM1, setDynamicPressureLoss1SPM1] = useState('');
  const [dynamicPressureLoss1SPM2, setDynamicPressureLoss1SPM2] = useState('');
  const [dynamicPressureLoss1SPM3, setDynamicPressureLoss1SPM3] = useState('');
  const [dynamicPressureLoss2SPM1, setDynamicPressureLoss2SPM1] = useState('');
  const [dynamicPressureLoss2SPM2, setDynamicPressureLoss2SPM2] = useState('');
  const [dynamicPressureLoss2SPM3, setDynamicPressureLoss2SPM3] = useState('');
  const [dynamicPressureLoss3SPM1, setDynamicPressureLoss3SPM1] = useState('');
  const [dynamicPressureLoss3SPM2, setDynamicPressureLoss3SPM2] = useState('');
  const [dynamicPressureLoss3SPM3, setDynamicPressureLoss3SPM3] = useState('');
  const [length, setLength] = useState({ dp: '', hw: '', dc: '' });
  const [capacity, setCapacity] = useState({ dp: '', hw: '', dc: '' });
  const [volume, setVolume] = useState({ dp: '', hw: '', dc: '' });

  //Use Effect Hook to render data from local storage:
  useEffect(() => {
    const savedData = localStorage.getItem('inputData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormationStrengthTest(parsedData.formationStrengthTest);
      setMudWeightAtTest(parsedData.mudWeightAtTest);
      setCurrentDrillingMudWeight(parsedData.currentDrillingMudWeight);
      setCasingSize(parsedData.casingData.size);
      setCasingMeasuredDepth(parsedData.casingData.measuredDepth);
      setCasingTVD(parsedData.casingData.TVD);
      setHoleSize(parsedData.holeData.size);
      setHoleMeasuredDepth(parsedData.holeData.measuredDepth);
      setHoleTVD(parsedData.holeData.TVD);
      setPumpDisplacement1(parsedData.pumpData.displacement1);
      setPumpDisplacement2(parsedData.pumpData.displacement2);
      setPumpDisplacement3(parsedData.pumpData.displacement3);
      setSlowPumpRate1(parsedData.slowPumpRateData.SPM1);
      setDynamicPressureLoss1SPM1(parsedData.slowPumpRateData.Pump1SPM1);
      setDynamicPressureLoss2SPM1(parsedData.slowPumpRateData.Pump2SPM1);
      setDynamicPressureLoss3SPM1(parsedData.slowPumpRateData.Pump3SPM1);
      setSlowPumpRate2(parsedData.slowPumpRateData.SPM2);
      setDynamicPressureLoss1SPM2(parsedData.slowPumpRateData.Pump1SPM2);
      setDynamicPressureLoss2SPM2(parsedData.slowPumpRateData.Pump2SPM2);
      setDynamicPressureLoss3SPM2(parsedData.slowPumpRateData.Pump3SPM2);
      setSlowPumpRate3(parsedData.slowPumpRateData.SPM3);
      setDynamicPressureLoss1SPM3(parsedData.slowPumpRateData.Pump1SPM3);
      setDynamicPressureLoss2SPM3(parsedData.slowPumpRateData.Pump2SPM3);
      setDynamicPressureLoss3SPM3(parsedData.slowPumpRateData.Pump3SPM3);
      setLength(parsedData.preRecordedData.length);
      setCapacity(parsedData.preRecordedData.capacity);
      setVolume(parsedData.preRecordedData.volume);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = {
      formationStrengthTest,
      mudWeightAtTest,
      currentDrillingMudWeight,
      casingData: {
        size: casingSize,
        measuredDepth: casingMeasuredDepth,
        TVD: casingTVD,
      },
      holeData: {
        size: holeSize,
        measuredDepth: holeMeasuredDepth,
        TVD: holeTVD,
      },
      pumpData: {
        displacement1: pumpDisplacement1,
        displacement2: pumpDisplacement2,
        displacement3: pumpDisplacement3,
      },
      slowPumpRateData: {
        SPM1: slowPumpRate1,
        Pump1SPM1: dynamicPressureLoss1SPM1,
        Pump2SPM1: dynamicPressureLoss2SPM1,
        Pump3SPM1: dynamicPressureLoss3SPM1,
        SPM2: slowPumpRate1,
        Pump1SPM2: dynamicPressureLoss1SPM2,
        Pump2SPM2: dynamicPressureLoss2SPM2,
        Pump3SPM2: dynamicPressureLoss3SPM2,
        SPM1: slowPumpRate1,
        Pump1SPM3: dynamicPressureLoss1SPM3,
        Pump2SPM3: dynamicPressureLoss2SPM3,
        Pump3SPM3: dynamicPressureLoss3SPM3,
      },
      
      preRecordedData: {
        length,
        capacity,
        volume,
      },
    };
    localStorage.setItem('inputData', JSON.stringify(inputData));
    console.log('Submitted Data:', inputData);
    // Store inputData in localStorage or state as needed
  };

  //LOGIC FOR TUBULAR SELECTION
  const [rows, setRows] = useState([{ tubular: '', length: '', capacity: '', volume: '' }]);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    if (field === 'tubular') {
      const selectedTubular = tubularData[value];
      if (selectedTubular) {
        newRows[index] = {
          ...newRows[index],
          tubular: value,
          capacity: selectedTubular.toolCapBblM,
          length: '',
          volume: ''
        };
      } else {
        newRows[index] = { ...newRows[index], tubular: value, capacity: '', length: '', volume: '' };
      }
    } else if (field === 'length') {
      newRows[index] = { ...newRows[index], length: value, volume: value * newRows[index].capacity };
    } else {
      newRows[index][field] = value;
    }
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { tubular: '', length: '', capacity: '', volume: '' }]);
  };
  //END LOGIC FOR TUBULAR SELECTION

  return (
    <div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Formation Strength Data */}
        <div>
          <label className="block font-medium">Formation Strength Test</label>
          <div className="flex space-x-4">
          <input
            type="text"
            value={formationStrengthTest}
            onChange={(e) => setFormationStrengthTest(e.target.value)}
            placeholder="Surface Leak-off Pressure (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={mudWeightAtTest}
            onChange={(e) => setMudWeightAtTest(e.target.value)}
            placeholder="Mud Weight at Test (ppg)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
        </div>

        {/* Current Drilling Mud */}
        <div className="flex space-x-4">
          <label className="block font-medium">Current Drilling Mud Weight (ppg)</label>
          <input
            type="text"
            value={currentDrillingMudWeight}
            onChange={(e) => setCurrentDrillingMudWeight(e.target.value)}
            placeholder="Current Drilling Mud Weight"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Casing Shoe Data */}
        <div>
          <label className="block font-medium">Casing Shoe Data</label>
          <div className="flex space-x-4">
          <input
            type="text"
            value={casingSize}
            onChange={(e) => setCasingSize(e.target.value)}
            placeholder="Casing Size (inch)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={casingMeasuredDepth}
            onChange={(e) => setCasingMeasuredDepth(e.target.value)}
            placeholder="Measured Depth (feet)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={casingTVD}
            onChange={(e) => setCasingTVD(e.target.value)}
            placeholder="True Vertical Depth (feet)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
        </div>

        {/* Hole Data */}
        <div>
          <label className="block font-medium">Hole Data</label>
          <div className="flex space-x-4">
          <input
            type="text"
            value={holeSize}
            onChange={(e) => setHoleSize(e.target.value)}
            placeholder="Hole Size (inch)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={holeMeasuredDepth}
            onChange={(e) => setHoleMeasuredDepth(e.target.value)}
            placeholder="Measured Depth (feet)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={holeTVD}
            onChange={(e) => setHoleTVD(e.target.value)}
            placeholder="True Vertical Depth (feet)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
        </div>

        {/* Pump Data */}
        <div>
          <label className="block font-medium">Pump Data</label>
          <div className="flex space-x-4">
          <input
            type="text"
            value={pumpDisplacement1}
            onChange={(e) => setPumpDisplacement1(e.target.value)}
            placeholder="Pump No. 1 Displacement (bbls/stroke)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={pumpDisplacement2}
            onChange={(e) => setPumpDisplacement2(e.target.value)}
            placeholder="Pump No. 2 Displacement (bbls/stroke)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={pumpDisplacement3}
            onChange={(e) => setPumpDisplacement3(e.target.value)}
            placeholder="Pump No. 3 Displacement (bbls/stroke)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
        </div>


        {/* Slow Pump Rate Data */}
        <div>
          <label className="block font-medium">Slow Pump Rate Data</label>
          <div className="flex space-x-4">
          <input
            type="text"
            value={slowPumpRate1}
            onChange={(e) => setSlowPumpRate1(e.target.value)}
            placeholder="SPM1"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss1SPM1}
            onChange={(e) => setDynamicPressureLoss1SPM1(e.target.value)}
            placeholder="PUMP1 @SPM1 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss2SPM1}
            onChange={(e) => setDynamicPressureLoss2SPM1(e.target.value)}
            placeholder="PUMP2 @SPM1(psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss3SPM1}
            onChange={(e) => setDynamicPressureLoss3SPM1(e.target.value)}
            placeholder="PUMP3 @SPM1 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <div className="flex space-x-4">
          <input
            type="text"
            value={slowPumpRate2}
            onChange={(e) => setSlowPumpRate2(e.target.value)}
            placeholder="SPM2"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss1SPM2}
            onChange={(e) => setDynamicPressureLoss1SPM2(e.target.value)}
            placeholder="PUMP1 @SPM2 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss2SPM2}
            onChange={(e) => setDynamicPressureLoss2SPM2(e.target.value)}
            placeholder="PUMP2 @SPM2(psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss3SPM2}
            onChange={(e) => setDynamicPressureLoss3SPM2(e.target.value)}
            placeholder="PUMP3 @SPM2 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <div className="flex space-x-4">
          <input
            type="text"
            value={slowPumpRate3}
            onChange={(e) => setSlowPumpRate3(e.target.value)}
            placeholder="SPM3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss1SPM3}
            onChange={(e) => setDynamicPressureLoss1SPM3(e.target.value)}
            placeholder="PUMP1 @SPM2 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss2SPM3}
            onChange={(e) => setDynamicPressureLoss2SPM3(e.target.value)}
            placeholder="PUMP2 @SPM2(psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={dynamicPressureLoss3SPM3}
            onChange={(e) => setDynamicPressureLoss3SPM3(e.target.value)}
            placeholder="PUMP3 @SPM2 (psi)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
        </div>

        {/* Pre-recorded Data for tubulars*/}
        <div>
        <label className="block font-medium">Pre-recorded Data</label>
      {rows.map((row, index) => (
        <div key={index} className="mb-4">
          <div className="flex space-x-4">
          <select
            value={row.tubular}
            onChange={(e) => handleChange(index, 'tubular', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Tubular</option>
            {Object.keys(tubularData).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
            <option value="user-input">User Input</option>
          </select>

          <input
            type="text"
            value={row.length}
            onChange={(e) => handleChange(index, 'length', e.target.value)}
            placeholder="Length (meters)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            value={row.capacity}
            onChange={(e) => handleChange(index, 'capacity', e.target.value)}
            placeholder="Capacity (bbls/meter)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            readOnly={row.tubular !== 'user-input'}
          />

          <label className="block font-medium mt-2">Volume (bbls)</label>
          <input
            type="text"
            value={row.volume}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Add Row
      </button>
    </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInput;
