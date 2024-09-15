// AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use context

// Context provider component
export const AppProvider = ({ children }) => {
  const [holeMeasuredDepth, setHoleMeasuredDepth] = useState('');
  const [holeTVD, setHoleTVD] = useState('');
  const [currentDrillingMudWeight, setCurrentDrillingMudWeight] = useState(0);
  const [dynamicPressureLoss1SPM1, setDynamicPressureLoss1SPM1] = useState('');
  const [dynamicPressureLoss1SPM2, setDynamicPressureLoss1SPM2] = useState('');
  const [dynamicPressureLoss1SPM3, setDynamicPressureLoss1SPM3] = useState('');
  const [dynamicPressureLoss2SPM1, setDynamicPressureLoss2SPM1] = useState('');
  const [dynamicPressureLoss2SPM2, setDynamicPressureLoss2SPM2] = useState('');
  const [dynamicPressureLoss2SPM3, setDynamicPressureLoss2SPM3] = useState('');
  const [dynamicPressureLoss3SPM1, setDynamicPressureLoss3SPM1] = useState('');
  const [dynamicPressureLoss3SPM2, setDynamicPressureLoss3SPM2] = useState('');
  const [dynamicPressureLoss3SPM3, setDynamicPressureLoss3SPM3] = useState('');
  const [slowPumpRate1, setSlowPumpRate1] = useState('');
  const [slowPumpRate2, setSlowPumpRate2] = useState('');
  const [slowPumpRate3, setSlowPumpRate3] = useState('');
  const [stringStrokes, setStringStrokes] = useState(0);
  const [casingSize, setCasingSize] = useState('');
  const [casingMeasuredDepth, setCasingMeasuredDepth] = useState('');
  const [casingTVD, setCasingTVD] = useState('');
  const [holeSize, setHoleSize] = useState('');
  const [formationStrengthTest, setFormationStrengthTest] = useState('');
  const [mudWeightAtTest, setMudWeightAtTest] = useState('');
  const [maxAllowableMudWeight, setMaxAllowableMudWeight] = useState('');
  const [openHoleLength, setOpenHoleLength] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [pumpDisplacement1, setPumpDisplacement1] = useState('');
  const [pumpDisplacement2, setPumpDisplacement2] = useState('');
  const [pumpDisplacement3, setPumpDisplacement3] = useState('');
  const [length, setLength] = useState({});
  const [capacity, setCapacity] = useState({});
  const [volume, setVolume] = useState({});

  // The value passed to context will include all state variables
  return (
    <AppContext.Provider
      value={{
        length, setLength,
        capacity, setCapacity,
        volume, setVolume,
        pumpDisplacement1, setPumpDisplacement1,
        pumpDisplacement2, setPumpDisplacement2,
        pumpDisplacement3, setPumpDisplacement3,
        openHoleLength, setOpenHoleLength,
        totalLength, setTotalLength,
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
        slowPumpRate1, setSlowPumpRate1,
        slowPumpRate2, setSlowPumpRate2,
        slowPumpRate3, setSlowPumpRate3,
        stringStrokes,
        setStringStrokes,
        formationStrengthTest, setFormationStrengthTest,
        mudWeightAtTest, setMudWeightAtTest,
        maxAllowableMudWeight, setMaxAllowableMudWeight,
        casingSize, setCasingSize,
        casingMeasuredDepth, setCasingMeasuredDepth,
        casingTVD, setCasingTVD,
        holeSize, setHoleSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);