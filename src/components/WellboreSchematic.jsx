import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { useAppContext } from './AppContext';

const WellboreSchematic = () => {
  const sketchRef = useRef(null);
  const {
    holeMeasuredDepth,
    casingMeasuredDepth,
    holeSize,
    casingSize,
    length,
  } = useAppContext();

  // Function to dynamically set the canvas height based on the parent container's size
  const setCanvasSize = () => {
    const containerWidth = sketchRef.current ? sketchRef.current.offsetWidth : 800;
    const canvasHeight = 1200; // or adjust this if needed
    return { width: containerWidth, height: canvasHeight };
  };

  useEffect(() => {
    const { width, height } = setCanvasSize(); // Get the canvas dimensions based on container size

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(width, height); // Use dynamic width and height
        p.background(255);
        p.noLoop(); // Draw only once
      };

      p.draw = () => {
        p.clear();
        p.background(255);
        p.translate(p.width / 2, 50); // Center drawing horizontally and provide top margin

        // Convert input values to float for calculations
        const casingWidth = parseFloat(casingSize) * 8; // Scale casing size for visualization
        const casingDepth = parseFloat(casingMeasuredDepth);
        const holeWidth = parseFloat(holeSize) * 8;
        const holeDepth = parseFloat(holeMeasuredDepth);
        const openHoleLength = holeDepth - casingDepth;

        // Draw the RKB line
          const rkbLineWidth = casingWidth * 1.4; // 40% wider than casing
          p.stroke(0);
          p.line(-rkbLineWidth / 2, 0, rkbLineWidth / 2, 0); // Draw the horizontal line at x=0

          // Label the RKB line
          p.noStroke();
          p.fill(0);
          p.textAlign(p.LEFT, p.BOTTOM);
          p.text('RKB', rkbLineWidth / 2 + 5, 0); // Place the label 'RKB' to the right of the line


        // Find the maximum depth to set dynamic scaling
        const maxDepth = Math.max(casingDepth, holeDepth, ...Object.values(length).map((val) => parseFloat(val) || 0));

        // Dynamic scale factor to fit the drawing within about 1000px
        const scaleFactor = (height - 200) / maxDepth;

        // Scaled lengths for visualization
        const scaledCasingDepth = casingDepth * scaleFactor;
        const scaledHoleDepth = holeDepth * scaleFactor;
        const scaledOpenHoleLength = openHoleLength * scaleFactor;

        // Draw casing
        p.stroke(0);
        p.line(-casingWidth / 2, 0, -casingWidth / 2, scaledCasingDepth);
        p.line(casingWidth / 2, 0, casingWidth / 2, scaledCasingDepth);

        // Draw shoe at the bottom of the casing
        p.stroke(0);
        p.fill(0);
        p.triangle(
          -casingWidth / 2,
          scaledCasingDepth,
          -casingWidth / 2 - 20,
          scaledCasingDepth + 20,
          -casingWidth / 2,
          scaledCasingDepth + 20
        );
        p.triangle(
          casingWidth / 2,
          scaledCasingDepth,
          casingWidth / 2 + 20,
          scaledCasingDepth + 20,
          casingWidth / 2,
          scaledCasingDepth + 20
        );

        // Draw open hole starting from the casing shoe
        if (openHoleLength > 0) {
          p.stroke(0);
          p.line(
            -holeWidth / 2,
            scaledCasingDepth + 20,
            -holeWidth / 2,
            scaledCasingDepth + 20 + scaledOpenHoleLength
          );
          p.line(
            holeWidth / 2,
            scaledCasingDepth + 20,
            holeWidth / 2,
            scaledCasingDepth + 20 + scaledOpenHoleLength
          );
          p.fill(200);
          p.stroke(256);
          p.rect(-holeWidth / 2, scaledCasingDepth + 20, holeWidth, scaledOpenHoleLength);
        }

        // Draw the casing depth label on the right side
        p.drawLabel(casingWidth / 2 + 30, scaledCasingDepth / 2, casingDepth, 'Casing Depth');

        // Draw the open hole length label on the right side
        p.drawLabel(holeWidth / 2 + 30, scaledCasingDepth + 20 + scaledOpenHoleLength / 2, openHoleLength, 'Open Hole Length');

        let y = 0; // Start from the top of the casing
        const standardWidths = { DP: 8, HW: 10, DC: 15 };

        // Define the manual sort values to ensure the correct order
        const sortValues = {
          DP: 1,
          HW: 2,
          DC: 3,
        };

        // Convert lengths from the context to numeric values and sort by manual sort values
        const stringComponents = Object.keys(length)
          .filter((key) => Object.keys(sortValues).some((type) => key.includes(type)))
          .map((key) => {
            const type = Object.keys(sortValues).find((tubularType) => key.includes(tubularType));
            const componentLength = parseFloat(length[key]) || 0;
            return { type, length: componentLength };
          })
          .sort((a, b) => sortValues[a.type] - sortValues[b.type]);

        // Iterate through the components and draw them
        stringComponents.forEach((component) => {
          const componentLength = component.length * scaleFactor;
          const componentWidth = standardWidths[component.type];

          if (component.length > 0) {
            p.stroke(0);
            p.line(-componentWidth / 2, y, -componentWidth / 2, y + componentLength);
            p.line(componentWidth / 2, y, componentWidth / 2, y + componentLength);

            // Draw label for the component next to the tubular on the left side
            p.drawLabel(-componentWidth / 2 - 60, y + componentLength / 2, component.length, `${component.type} Length`, -1);

            y += componentLength;
          }
        });

        // Draw TCR bit at the bottom of the string
        p.drawTCRBit(y);
      };

      // Draw TCR bit function
      p.drawTCRBit = function (y) {
        p.push();
        p.translate(0, y);
        p.fill(180);
        p.beginShape();
        p.vertex(-10, 0);
        p.vertex(10, 0);
        p.vertex(8, 25);
        p.vertex(-8, 25);
        p.endShape(p.CLOSE);

        p.drawCone(-6, 25, 10, 5);
        p.drawCone(6, 25, 10, 5);
        p.drawCone(0, 30, 10, 5);
        p.pop();
      };

      p.drawCone = function (x, y, radius, numTeeth) {
        p.fill(180);
        p.ellipse(x, y, radius, radius);

        for (let i = 0; i < numTeeth; i++) {
          const angle = (p.TWO_PI / numTeeth) * i;
          const toothX = x + p.cos(angle) * (radius / 2);
          const toothY = y + p.sin(angle) * (radius / 2);
          p.drawTooth(toothX, toothY, angle);
        }
      };

      p.drawTooth = function (x, y, angle) {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.fill(100);
        p.triangle(-2, 0, 2, 0, 0, -5);
        p.pop();
      };

      p.drawLabel = function (x, y, length, label, align = 1) {
        p.push();
        p.stroke(0);
        p.noStroke();
        p.fill(0);
        p.textAlign(align > 0 ? p.LEFT : p.RIGHT, p.CENTER);
        p.text(`${label}: ${length.toFixed(1)} m`, x, y);
        p.pop();
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);
    return () => p5Instance.remove();
  }, [casingSize, casingMeasuredDepth, holeSize, holeMeasuredDepth, length]);

  return (
    <div className="w-full max-w-screen-lg mx-auto border-gray-400 border-4 p-3" style={{ minHeight: '400px' }}>
      {/* Header Section */}
      <div className="border-2 border-black p-2 mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
          <h1 className="text-4xl text-gray-700 font-bold" style={{ margin: 0 }}>RIG 143</h1>
          <p className="font-bold text-gray-700" style={{ margin: 0 }}>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
          <h2 className="font-bold text-xl text-gray-700">WELL SCHEMATIC</h2>
          <h2 className="font-bold text-gray-700 text-right text-xl" style={{ margin: 0 }}>Well: F1</h2>
        </div>
        <p className="text-xs text-left font-semibold">
          Source code available at{' '}
          <a className="text-blue-600" href="https://github.com/zubin-madon/killsheet">
            github.com/zubin-madon/KillSheet
          </a>
          . Licensed under the MIT License - see{' '}
          <a className="text-blue-600" href="https://github.com/zubin-madon/KillSheet/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer">
            LICENSE file
          </a>{' '}
          for details.
        </p>
      </div>
  
      {/* Main Content Section: Diagram and Inputs */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Column: Diagram */}
        <div
          className="flex-2 w-full lg:w-2/3"
          ref={sketchRef}
          style={{ minHeight: '400px', borderRight: '2px solid #ddd' }}
        >
          {/* Diagram content goes here */}
        </div>
  
        {/* Right Column: Input Fields */}
        <div className="flex-1 flex flex-col gap-4 w-full lg:w-1/3">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            <label className="font-semibold">KOP MD (m)</label>
            <input
              type="text"
              placeholder="Enter KOP MD"
              className="border rounded px-2 py-1 w-full"
            />
            <label className="font-semibold">KOP TVD (m)</label>
            <input
              type="text"
              placeholder="Enter KOP TVD"
              className="border rounded px-2 py-1 w-full"
            />
            <label className="font-semibold">EOB MD (m)</label>
            <input
              type="text"
              placeholder="Enter EOB MD"
              className="border rounded px-2 py-1 w-full"
            />
            <label className="font-semibold">EOB TVD (m)</label>
            <input
              type="text"
              placeholder="Enter EOB TVD"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default WellboreSchematic;
