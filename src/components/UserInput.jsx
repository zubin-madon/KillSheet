import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

const tubularData = {
  "2-7/8\" DP (CYX)": {
    pipeSize: 2.875,
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
  "2-7/8\" DP (4145)": {
    pipeSize: 2.875,
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
  "4\" DP ": {
    pipeSize: 4,
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
  "4\" HW ": {
    pipeSize: 4,
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
  "4-3/4\" DC ": {
    pipeSize: 4.75,
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
  "5-1/2\" DP (one)": {
    pipeSize: 5.5,
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
  "5-1/2\" DP (two)": {
    pipeSize: 5.5,
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
  "5-7/8\" HW ": {
    pipeSize: 5.875,
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
  "6-3/4\" DC ": {
    pipeSize: 6.75,
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
  "6-5/8\" DP ": {
    pipeSize: 6.625,
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
  "6-5/8\" HW ": {
    pipeSize: 6.625,
    lbFt: 71.58,
    rng: 2,
    grade: null,
    thread: "NC61",
    toolCapBblM: 0.0646,
    dispBblM: 0.0853,
    tensileLbs: 2380000,
    torsFtLbs: 177100,
    muTorqFtLbs: 80000,
    idIn: 3.25,
    driftIn: 3.125,
    jtOdIn: 8.75
  },
  "8-3/4\" DC ": {
    pipeSize: 8.75,
    lbFt: 176.2,
    rng: 2,
    grade: null,
    thread: "NC77",
    toolCapBblM: 0.0336,
    dispBblM: 0.2103,
    tensileLbs: 2000000,
    torsFtLbs: 233000,
    muTorqFtLbs: 160000,
    idIn: 3.25,
    driftIn: 3.125,
    jtOdIn: 8.75
  },
  "11\" DC ": {
    pipeSize: 11,
    lbFt: 299,
    rng: 2,
    grade: null,
    thread: null,
    toolCapBblM: 0.0286,
    dispBblM: 0.357,
    tensileLbs: 3700000,
    torsFtLbs: 233000,
    muTorqFtLbs: 160000,
    idIn: 3,
    driftIn: 2.87,
    jtOdIn: 11,
  }
};



const UserInput = () => {
  //Set AppContext relationship for global sharing of variables with other components:
  const {
    holeMeasuredDepth,
    setHoleMeasuredDepth,
    holeTVD,
    setHoleTVD,
    currentDrillingMudWeight,
    setCurrentDrillingMudWeight,
    dynamicPressureLoss1SPM1,
    setDynamicPressureLoss1SPM1,
    dynamicPressureLoss1SPM2,
    setDynamicPressureLoss1SPM2,
    dynamicPressureLoss1SPM3,
    setDynamicPressureLoss1SPM3,
    dynamicPressureLoss2SPM1,
    setDynamicPressureLoss2SPM1,
    dynamicPressureLoss2SPM2,
    setDynamicPressureLoss2SPM2,
    dynamicPressureLoss2SPM3,
    setDynamicPressureLoss2SPM3,
    dynamicPressureLoss3SPM1,
    setDynamicPressureLoss3SPM1,
    dynamicPressureLoss3SPM2,
    setDynamicPressureLoss3SPM2,
    dynamicPressureLoss3SPM3,
    setDynamicPressureLoss3SPM3,
    slowPumpRate1,
    setSlowPumpRate1,
    slowPumpRate2,
    setSlowPumpRate2,
    slowPumpRate3,
    setSlowPumpRate3,
    stringStrokes,
    setStringStrokes,
    formationStrengthTest,
    setFormationStrengthTest,
    mudWeightAtTest,
    setMudWeightAtTest,
    maxAllowableMudWeight,
    setMaxAllowableMudWeight,
    casingSize,
    setCasingSize,
    casingMeasuredDepth,
    setCasingMeasuredDepth,
    casingTVD,
    setCasingTVD,
    holeSize,
    setHoleSize,
    pumpDisplacement1,
    setPumpDisplacement1,
    pumpDisplacement2,
    setPumpDisplacement2,
    pumpDisplacement3,
    setPumpDisplacement3,
    openHoleLength,
    setOpenHoleLength,
    totalLength,
    setTotalLength,
    length,
    setLength,
    capacity,
    setCapacity,
    volume,
    setVolume,
  } = useAppContext();

  const [tubularRows, setTubularRows] = useState([]); // Tubular rows added by the user
  const [openHoleStrokes, setOpenHoleStrokes] = useState(0);
  const [casingStrokes, setCasingStrokes] = useState(0);
  const [annulusStrokes, setAnnulusStrokes] = useState(0);
  const [maasp, setMaasp] = useState(""); // State variable for MAASP

  //Use Effect Hook to render data from local storage:
  useEffect(() => {
    const savedData = localStorage.getItem("inputData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormationStrengthTest(parsedData.formationStrengthTest || "");
      setMudWeightAtTest(parsedData.mudWeightAtTest || "");
      setMaxAllowableMudWeight(parsedData.maxAllowableMudWeight || "");
      setCurrentDrillingMudWeight(parsedData.currentDrillingMudWeight || "");
      setCasingSize(parsedData.casingData?.size || "");
      setCasingMeasuredDepth(parsedData.casingData?.measuredDepth || "");
      setCasingTVD(parsedData.casingData?.TVD || "");
      setHoleSize(parsedData.holeData?.size || "");
      setHoleMeasuredDepth(parsedData.holeData?.measuredDepth || "");
      setHoleTVD(parsedData.holeData?.TVD || "");
      setPumpDisplacement1(parsedData.pumpData?.displacement1 || "");
      setPumpDisplacement2(parsedData.pumpData?.displacement2 || "");
      setPumpDisplacement3(parsedData.pumpData?.displacement3 || "");
      setSlowPumpRate1(parsedData.slowPumpRateData?.SPM1 || "");
      setDynamicPressureLoss1SPM1(parsedData.slowPumpRateData?.Pump1SPM1 || "");
      setDynamicPressureLoss2SPM1(parsedData.slowPumpRateData?.Pump2SPM1 || "");
      setDynamicPressureLoss3SPM1(parsedData.slowPumpRateData?.Pump3SPM1 || "");
      setSlowPumpRate2(parsedData.slowPumpRateData?.SPM2 || "");
      setDynamicPressureLoss1SPM2(parsedData.slowPumpRateData?.Pump1SPM2 || "");
      setDynamicPressureLoss2SPM2(parsedData.slowPumpRateData?.Pump2SPM2 || "");
      setDynamicPressureLoss3SPM2(parsedData.slowPumpRateData?.Pump3SPM2 || "");
      setSlowPumpRate3(parsedData.slowPumpRateData?.SPM3 || "");
      setDynamicPressureLoss1SPM3(parsedData.slowPumpRateData?.Pump1SPM3 || "");
      setDynamicPressureLoss2SPM3(parsedData.slowPumpRateData?.Pump2SPM3 || "");
      setDynamicPressureLoss3SPM3(parsedData.slowPumpRateData?.Pump3SPM3 || "");
      setLength(parsedData.preRecordedData?.length || {});
      setCapacity(parsedData.preRecordedData?.capacity || {});
      setVolume(parsedData.preRecordedData?.volume || {});
    }
  }, []);

  useEffect(() => {
    const calculateMaxAllowableMudWeight = () => {
      if (
        formationStrengthTest &&
        mudWeightAtTest &&
        casingTVD &&
        !isNaN(formationStrengthTest) &&
        !isNaN(mudWeightAtTest) &&
        !isNaN(casingTVD)
      ) {
        const maxWeight =
          parseFloat(mudWeightAtTest) +
          parseFloat(formationStrengthTest) / (0.052 * parseFloat(casingTVD));
        setMaxAllowableMudWeight(maxWeight.toFixed(2));

        // Save updated max allowable mud weight to local storage
        const inputData = {
          formationStrengthTest,
          mudWeightAtTest,
          maxAllowableMudWeight: maxWeight.toFixed(2),
          casingData: { TVD: casingTVD },
          // Include other data as needed
        };
        localStorage.setItem("inputData", JSON.stringify(inputData));
      }
    };

    calculateMaxAllowableMudWeight();
  }, [formationStrengthTest, mudWeightAtTest, casingTVD]);

  //UseEffect Hook to monitor total string length vs hole measured depth:
  useEffect(() => {
    if (totalLength > parseFloat(holeMeasuredDepth || 0)) {
      alert(
        "You messed up! Your string is longer than hole measured depth. Check your lengths."
      );
    }
  }, [totalLength, holeMeasuredDepth]);

  //UseEffect Hook to update open hole length
  useEffect(() => {
    // Convert values to numbers for calculation, default to 0 if not valid
    const holeDepth = parseFloat(holeMeasuredDepth) || 0;
    const casingDepth = parseFloat(casingMeasuredDepth) || 0;
    // Calculate openHoleLength
    setOpenHoleLength(holeDepth - casingDepth);
  }, [holeMeasuredDepth, casingMeasuredDepth]);

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
        SPM2: slowPumpRate2,
        Pump1SPM2: dynamicPressureLoss1SPM2,
        Pump2SPM2: dynamicPressureLoss2SPM2,
        Pump3SPM2: dynamicPressureLoss3SPM2,
        SPM3: slowPumpRate3,
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
    localStorage.setItem("inputData", JSON.stringify(inputData));
    
    // Store inputData in localStorage or state as needed
  };

  //LOGIC FOR MAX ALLOWABLE MUD WT
  const calculateMaxAllowableMudWeight = () => {
    if (
      formationStrengthTest &&
      mudWeightAtTest &&
      casingTVD &&
      !isNaN(formationStrengthTest) &&
      !isNaN(mudWeightAtTest) &&
      !isNaN(casingTVD)
    ) {
      const maxWeight =
        parseFloat(mudWeightAtTest) +
        parseFloat(formationStrengthTest) / (0.052 * parseFloat(casingTVD));
      setMaxAllowableMudWeight(maxWeight.toFixed(2));
    }
  };

  //MAASP CALCULATION
  useEffect(() => {
    // Parse the inputs to ensure numeric calculations
    const maxWeight = parseFloat(maxAllowableMudWeight);
    const currentWeight = parseFloat(currentDrillingMudWeight);
    const tvd = parseFloat(casingTVD);

    // Check that all inputs are valid numbers before calculating
    if (!isNaN(maxWeight) && !isNaN(currentWeight) && !isNaN(tvd)) {
      // MAASP calculation
      const calculatedMaasp = (maxWeight - currentWeight) * 0.052 * tvd * 3.281;
      setMaasp(calculatedMaasp.toFixed(2)); // Set the calculated MAASP, rounding to 2 decimal places
    } else {
      setMaasp(""); // Reset MAASP if inputs are invalid
    }
  }, [maxAllowableMudWeight, currentDrillingMudWeight, casingTVD]);

  //LOGIC FOR TUBULAR SELECTION
  const [rows, setRows] = useState([
    { tubular: "", length: "", capacity: "", volume: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    if (field === "tubular") {
      const selectedTubular = tubularData[value];
      if (selectedTubular) {
        newRows[index] = {
          ...newRows[index],
          tubular: value,
          capacity: selectedTubular.toolCapBblM,
          length: "",
          volume: "",
        };
      } else {
        newRows[index] = {
          ...newRows[index],
          tubular: value,
          capacity: "",
          length: "",
          volume: "",
        };
      }
    } else if (field === "length") {
      newRows[index] = {
        ...newRows[index],
        length: value,
        volume: value * newRows[index].capacity,
      };

      const tubularType = newRows[index].tubular; // This is the dynamic key

      // Update the length dynamically based on the tubular type
      const updatedLength = { ...length, [tubularType]: value };
      setLength(updatedLength);
      // Update volume and capacity dynamically based on tubular type
      const updatedVolume = { ...volume, [tubularType]: newRows[index].volume };
      setVolume(updatedVolume);

      const updatedCapacity = {
        ...capacity,
        [tubularType]: newRows[index].capacity,
      };
      setCapacity(updatedCapacity);

      
   
    } else {
      newRows[index][field] = value;
    }
    setRows(newRows);
    setTubularRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { tubular: "", length: "", capacity: "", volume: "" }]);
    console.log("userinput len: ", length);
  };
  //END LOGIC FOR TUBULAR SELECTION

  //ANNULAR VOLUME CALCULATIONS
  const getValidPumpDisplacement = () => {
    const displacement =
      parseFloat(pumpDisplacement1) ||
      parseFloat(pumpDisplacement2) ||
      parseFloat(pumpDisplacement3);
    return displacement > 0 ? displacement : 1; // Default to 1 to avoid division by zero if all are zero
  };

  const [totalStringVolume, setTotalStringVolume] = useState(0);
  const [totalOpenHoleVolume, setTotalOpenHoleVolume] = useState(0);
  const [totalCasingVolume, setTotalCasingVolume] = useState(0);
  const [totalAnnulusVolume, setTotalAnnulusVolume] = useState(0);
  // State variables for annular volumes
  const [annularRows, setAnnularRows] = useState([]);
  // Casing length is derived from casingMeasuredDepth
  const casingLength = parseFloat(casingMeasuredDepth) || 0; // Ensure it's a number, default to 0 if not set

  useEffect(() => {
    // Calculate total string volume from rows
    const stringVolume = rows.reduce(
      (total, row) => total + (parseFloat(row.volume) || 0),
      0
    );
    setTotalStringVolume(stringVolume.toFixed(4));
    console.log("striiiiiing voluuuummeeee", totalStringVolume)
  }, [rows, volume, length, totalLength]); // Dependencies include rows to recalculate when rows change

  useEffect(() => {
    // Calculate total length of tubulars
    const totalLen = rows.reduce(
      (total, row) => total + (parseFloat(row.length) || 0),
      0
    );
    setTotalLength(totalLen);
  }, [rows, length]);





  // Effect to calculate strokes whenever total volumes or pump displacements change
  useEffect(() => {
    const pumpDisplacement = getValidPumpDisplacement();

    // Calculating strokes
    setStringStrokes(totalStringVolume / pumpDisplacement || 0);
    setOpenHoleStrokes(totalOpenHoleVolume / pumpDisplacement || 0);
    setCasingStrokes(totalCasingVolume / pumpDisplacement || 0);
    setAnnulusStrokes(totalAnnulusVolume / pumpDisplacement || 0);
  }, [
    totalStringVolume,
    totalOpenHoleVolume,
    totalCasingVolume,
    totalAnnulusVolume,
    pumpDisplacement1,
    pumpDisplacement2,
    pumpDisplacement3,
    length,
  ]);

  // Function to calculate annular volumes for each tubular row
  const calculateAnnularVolumes = () => {
    const holeID = parseFloat(holeSize) || 0;
    const casingID = parseFloat(casingSize) || 0;

    let openHoleRemaining = openHoleLength;
    let casingRemaining = casingLength;

    // Updated rows to store individual string volume calculations
    const updatedAnnularRows = tubularRows.map((row, index) => {
      const tubular = row.tubular || "";
      const tubularLength = parseFloat(row.length) || 0;

      // Determine OD for the current tubular
      const getOD = (type) => tubularData[type]?.pipeSize || 0;
      const od = getOD(tubular);

      // Define initial values for open hole and casing lengths for this row
      let openHoleLengthUsed = 0;
      let casingLengthUsed = 0;
      let openHoleVolume = 0;
      let casingVolume = 0;

      // Determine where the string is positioned and calculate volumes accordingly
      if (openHoleRemaining > 0) {
        openHoleLengthUsed = Math.min(tubularLength, openHoleRemaining);
        openHoleRemaining -= openHoleLengthUsed;
        openHoleVolume = calculateVolume(holeID, od, openHoleLengthUsed);
      }

      if (casingRemaining > 0) {
        casingLengthUsed = tubularLength - openHoleLengthUsed;
        casingRemaining -= casingLengthUsed;
        casingVolume = calculateVolume(casingID, od, casingLengthUsed);
      }

      // Return the calculated values for this tubular row
      return {
        ...row,
        openHoleLengthUsed,
        casingLengthUsed,
        openHoleVolume,
        casingVolume,
      };
    });

    // Set the updated rows with calculated volumes
    setAnnularRows(updatedAnnularRows);

    // Calculate total open hole and casing volumes
    const totalOpenHoleVol = updatedAnnularRows.reduce(
      (total, row) => total + row.openHoleVolume,
      0
    );
    const totalCasingVol = updatedAnnularRows.reduce(
      (total, row) => total + row.casingVolume,
      0
    );

    // Update state with the total values
    setTotalOpenHoleVolume(totalOpenHoleVol.toFixed(2));
    setTotalCasingVolume(totalCasingVol.toFixed(2));
    setTotalAnnulusVolume((totalOpenHoleVol + totalCasingVol).toFixed(2));
  };

  // Volume calculation function
  const calculateVolume = (ID, OD, length) => {
    if (ID <= 0 || OD <= 0) return 0; // Avoid division by zero or negative values
    return ((ID ** 2 - OD ** 2) / 1029.4) * 3.281 * length;
  };

  //UseEffect to trigger annular volume calculations
  useEffect(() => {
    calculateAnnularVolumes();
  }, [tubularRows.length, holeSize, casingSize, openHoleLength, length, rows]);
  //MODIFY ANNULUS VOLUME LOGIC**********************

  return (
    <div className="border-gray-400 border-4 p-3 ">
      <div style={{ border: "2px solid black", padding: "4px" }}>
        {/* Header with Title and Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2px",
          }}
        >
          <h1
            className="text-4xl text-gray-700 font-bold "
            style={{ margin: 0 }}
          >
            RIG 702
          </h1>
          <p className="font-bold text-gray-700" style={{ margin: 0 }}>
            Date: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2px",
          }}
        >
          <h2 className="font-bold text-xl text-gray-700">
            SURFACE BOP - KILL SHEET
          </h2>
          <h2
            className="font-bold text-gray-700 text-right justify-end text-xl"
            style={{ margin: 0 }}
          >
            Well: F1
          </h2>
        </div>
        <p className="text-xs text-left font-semibold">
          Source code availabe at{" "}
          <a className="text-blue-600" href="https://github.com/zubin-madon/killsheet">
            github.com/zubin-madon/KillSheet
          </a>
          . Licensed under the MIT License - see{" "}
          <a className="text-blue-600" href="https://github.com/zubin-madon/KillSheet/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer">
            LICENSE file
          </a>{" "}
          for details.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Formation Strength Data */}
        <div className='print-full-page'>
          <label className="block font-medium mb-2 text-lg mt-3">
            Formation Strength Data
          </label>
          <div className="grid lg:grid-cols-4 md:grid-cols-2">
            {/* Formation Strength Test Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-1">
                Leak-off (psi)
              </label>
              <input
                type="text"
                value={formationStrengthTest}
                onChange={(e) => setFormationStrengthTest(e.target.value)}
                placeholder="Surface Leak-off Pressure (psi)"
                className="p-2 text-lg block border border-gray-300 rounded-md"
              />
            </div>

            {/* Mud Weight at Test Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-1">
                Mud Wt. at Test
              </label>
              <input
                type="text"
                value={mudWeightAtTest}
                onChange={(e) => setMudWeightAtTest(e.target.value)}
                placeholder="Mud Weight at Test (ppg)"
                className="p-2 border border-gray-300 rounded-md text-lg "
              />
            </div>

            {/* Current Drilling Mud Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-1">
                Current Mud Wt.
              </label>
              <input
                type="text"
                value={currentDrillingMudWeight}
                onChange={(e) => setCurrentDrillingMudWeight(e.target.value)}
                placeholder="Current Weight (ppg)"
                className="p-2 border border-gray-300 rounded-md text-lg "
              />
            </div>

            {/* Max Allowable Mud Weight Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-1">
                Max Allowable M.Wt.
              </label>
              <input
                type="text"
                value={maxAllowableMudWeight}
                onChange={(e) => setMaxAllowableMudWeight(e.target.value)}
                placeholder="Max Allowable Mud Wt. (ppg)"
                className="p-2 border border-gray-300 rounded-md bg-gray-200 text-lg "
              />
            </div>
          </div>
        </div>

        {/* Casing Shoe Data */}
        <div className='grid'>
          <label className="block font-medium mb-2 text-lg">
            Casing Shoe Data
          </label>
          <div className="flex flex-wrap -mx-2">
            {/* Casing Size Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium">
                Casing ID (inch)
              </label>
              <input
                type="text"
                value={casingSize}
                onChange={(e) => setCasingSize(e.target.value)}
                placeholder="Casing ID (inch)"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
              />
            </div>

            {/* Measured Depth Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium">
                Measured Depth (m)
              </label>
              <input
                type="text"
                value={casingMeasuredDepth}
                onChange={(e) => setCasingMeasuredDepth(e.target.value)}
                placeholder="Measured Depth (m)"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
              />
            </div>

            {/* True Vertical Depth Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium">TVD (m)</label>
              <input
                type="text"
                value={casingTVD}
                onChange={(e) => setCasingTVD(e.target.value)}
                placeholder="True Vertical Depth (m)"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
              />
            </div>

            {/* MAASP Input */}
            <div className="flex flex-col px-2 flex-1 min-w-[150px]">
              <label className="block text-sm font-medium">MAASP (psi)</label>
              <input
                type="text"
                value={maasp}
                readOnly
                placeholder="MAASP (psi)"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200 text-lg "
              />
            </div>
          </div>
        </div>

        {/* Hole Data */}
        <div>
          <label className="block font-medium text-lg">Hole Data</label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={holeSize}
              onChange={(e) => setHoleSize(e.target.value)}
              placeholder="Hole Size (inch)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={holeMeasuredDepth}
              onChange={(e) => setHoleMeasuredDepth(e.target.value)}
              placeholder="Measured Depth (m)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={holeTVD}
              onChange={(e) => setHoleTVD(e.target.value)}
              placeholder="True Vertical Depth (m)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
          </div>
        </div>

        {/* Pump Data */}
        <div>
          <label className="block font-medium text-lg">Pump Data</label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={pumpDisplacement1}
              onChange={(e) => setPumpDisplacement1(e.target.value)}
              placeholder="Pump No. 1 Displacement (bbls/stroke)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={pumpDisplacement2}
              onChange={(e) => setPumpDisplacement2(e.target.value)}
              placeholder="Pump No. 2 Displacement (bbls/stroke)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={pumpDisplacement3}
              onChange={(e) => setPumpDisplacement3(e.target.value)}
              placeholder="Pump No. 3 Displacement (bbls/stroke)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss1SPM1}
              onChange={(e) => setDynamicPressureLoss1SPM1(e.target.value)}
              placeholder="PUMP1 @SPM1 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss2SPM1}
              onChange={(e) => setDynamicPressureLoss2SPM1(e.target.value)}
              placeholder="PUMP2 @SPM1(psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss3SPM1}
              onChange={(e) => setDynamicPressureLoss3SPM1(e.target.value)}
              placeholder="PUMP3 @SPM1 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={slowPumpRate2}
              onChange={(e) => setSlowPumpRate2(e.target.value)}
              placeholder="SPM2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss1SPM2}
              onChange={(e) => setDynamicPressureLoss1SPM2(e.target.value)}
              placeholder="PUMP1 @SPM2 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss2SPM2}
              onChange={(e) => setDynamicPressureLoss2SPM2(e.target.value)}
              placeholder="PUMP2 @SPM2(psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss3SPM2}
              onChange={(e) => setDynamicPressureLoss3SPM2(e.target.value)}
              placeholder="PUMP3 @SPM2 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={slowPumpRate3}
              onChange={(e) => setSlowPumpRate3(e.target.value)}
              placeholder="SPM3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss1SPM3}
              onChange={(e) => setDynamicPressureLoss1SPM3(e.target.value)}
              placeholder="PUMP1 @SPM2 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss2SPM3}
              onChange={(e) => setDynamicPressureLoss2SPM3(e.target.value)}
              placeholder="PUMP2 @SPM2(psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
            <input
              type="text"
              value={dynamicPressureLoss3SPM3}
              onChange={(e) => setDynamicPressureLoss3SPM3(e.target.value)}
              placeholder="PUMP3 @SPM2 (psi)"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-lg "
            />
          </div>
        </div>

        {/* Pre-recorded Data for tubulars*/}
        <div className="flex flex-col">
          <label className="block font-medium">Pre-recorded Data</label>
          {rows.map((row, index) => (
            <div key={index} className="mb-4">
              <div className="flex space-x-4">
                <select
                  value={row.tubular}
                  onChange={(e) =>
                    handleChange(index, "tubular", e.target.value)
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Tubular</option>
                  {Object.keys(tubularData).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                  <option value="user-input">User Input</option>
                </select>

                <input
                  type="text"
                  value={row.length}
                  onChange={(e) =>
                    handleChange(index, "length", e.target.value)
                  }
                  placeholder="Length (meters)"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />

                <input
                  type="text"
                  value={row.capacity}
                  onChange={(e) =>
                    handleChange(index, "capacity", e.target.value)
                  }
                  placeholder="Capacity (bbls/meter)"
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${
                    row.tubular === "user-input" ? "bg-white" : "bg-gray-100"
                  }`}
                  readOnly={row.tubular !== "user-input"}
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
          <div className="flex flex-wrap items-center justify-between mt-4">
            {/* Buttons Section */}
            <div className="flex flex-wrap space-x-2 mb-2">
              <button
                type="button"
                onClick={addRow}
                className="p-2 bg-gray-500 text-white border border-black rounded-md"
              >
                Add Row
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="p-2 bg-gray-500 text-white border border-black rounded-md"
              >
                Save Data
              </button>
            </div>

            {/* String Volume and Strokes Section */}
            <div className="flex flex-col items-end space-y-1 w-full sm:w-auto">
              <label className="block font-medium text-right">
                String Volume (bbls)
              </label>
              <input
                type="text"
                value={rows.reduce(
                  (total, row) => total + (parseFloat(row.volume) || 0),
                  0
                )}
                readOnly
                className="p-2 border border-gray-300 rounded-md bg-gray-100 w-full sm:w-auto text-lg "
              />
              <label className="font-extrabold text-right">
                <i>{stringStrokes.toFixed(0)} Strokes</i>
              </label>
            </div>
          </div>
        </div>
        <hr />
        {/* Annulus volumes UI */}
<div>
  <div className="flex flex-wrap items-center justify-between mb-2">
    {/* Title on the left */}
    <h3 className="text-lg font-semibold">Annular Volumes</h3>

    {/* Labels on the right */}
    <div className="flex items-center space-x-4 text-right">
      <div className="flex items-center space-x-2">
        <label className="block font-medium">Open Hole Len. (m):</label>
        {openHoleLength > 0 && (
          <label className="block font-medium">{openHoleLength.toFixed(2)}</label>
        )}
      </div>
    </div>
  </div>

  {/* Responsive Table Container */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-black px-2 py-1 whitespace-nowrap">
            Tubular
          </th>
          <th className="border border-black px-2 py-1 whitespace-nowrap">
            Length in Open Hole
          </th>
          <th className="border border-black px-2 py-1 whitespace-nowrap">
            Open Hole Volume (bbls)
          </th>
          <th className="border border-black px-2 py-1 whitespace-nowrap">
            Length in Casing
          </th>
          <th className="border border-black px-2 py-1 whitespace-nowrap">
            Casing Volume (bbls)
          </th>
        </tr>
      </thead>
      <tbody>
        {annularRows.map((row, index) => (
          <tr key={index} className="text-center">
            <td className="border border-black px-1 py-1">{row.tubular}</td>
            <td className="border border-black px-1 py-1">
              <input
                type="text"
                value={row.openHoleLengthUsed.toFixed(2)}
                readOnly
                className="w-full max-w-[80px] text-center bg-gray-300 border-none text-lg"
              />
            </td>
            <td className="border border-black px-1 py-1">
              <input
                type="text"
                value={row.openHoleVolume.toFixed(2)}
                readOnly
                className="w-full max-w-[80px] text-center bg-gray-300 border-none text-lg"
              />
            </td>
            <td className="border border-black px-1 py-1">
              <input
                type="text"
                value={row.casingLengthUsed.toFixed(2)}
                readOnly
                className="w-full max-w-[80px] text-center bg-gray-300 border-none text-lg"
              />
            </td>
            <td className="border border-black px-1 py-1">
              <input
                type="text"
                value={row.casingVolume.toFixed(2)}
                readOnly
                className="w-full max-w-[80px] text-center bg-gray-300 border-none text-lg"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* total volumes and corresponding strokes */}
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="flex flex-col items-end">
              <label className="block font-medium text-right">
                Open Hole Volume(bbls):
              </label>
              <input
                type="text"
                value={totalOpenHoleVolume}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-200 w-full sm:w-32 text-right text-lg"
              />
              <label className="mt-1 font-extrabold text-right">
                <i>{openHoleStrokes.toFixed(0)} Strokes</i>
              </label>
            </div>
            {/* Row 2 */}
            <div className="flex flex-col items-end">
              <label className="block font-medium text-right">
                Casing Volume(bbls):
              </label>
              <input
                type="text"
                value={totalCasingVolume}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-200 w-full sm:w-32 text-right text-lg"
              />
              <label className="mt-1 font-extrabold text-right">
                <i>{casingStrokes.toFixed(0)} Strokes</i>
              </label>
            </div>
            {/* Row 3 */}
            <div className="flex flex-col items-end">
              <label className="block font-medium text-right">
                Total Annulus Vol.(bbls):
              </label>
              <input
                type="text"
                value={totalAnnulusVolume}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-200 w-full sm:w-32 text-right text-lg"
              />
              <label className="mt-1 font-extrabold text-right">
                <i>{annulusStrokes.toFixed(0)} Strokes</i>
              </label>
            </div>
            <div className="flex flex-col items-end">
              <label className="block font-medium text-right">
                Total Well Vol.(bbls):
              </label>
              <input
                type="text"
                value={(Number(totalAnnulusVolume) || 0) + (Number(totalStringVolume) || 0)}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-200 w-full sm:w-32 text-right text-lg"
              />
              <label className="mt-1 font-extrabold text-right">
                <i>{(annulusStrokes + stringStrokes).toFixed(0)} Strokes</i>
              </label>
            </div>
          </div>
        </div>

        {/* End annulus vol logic*/}
      </form>
    </div>
  );
};

export default UserInput;
