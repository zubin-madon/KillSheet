import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const WellboreSchematic = ({ csgData }) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        p.background(255);
      };

      p.draw = () => {
        p.clear();
        p.background(255);
        if (csgData.length > 0) {
          let y = 50;
          csgData.forEach((item) => {
            const size = parseFloat(item.size) * 10;
            p.rect(400 - size / 2, y, size, 50);
            y += 70;
          });
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);
    return () => p5Instance.remove();
  }, [csgData]);

  return <div ref={sketchRef}></div>;
};

export default WellboreSchematic;
