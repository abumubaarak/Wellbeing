import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import React from 'react';
import {Colors} from '../../theme';

type CirclePieProps = {
  rate: number[];
};
export const CirclePie = ({rate}: CirclePieProps) => {
  const size = 170; // The size of the canvas
  const strokeWidth = 40;
  const COLORS: {color: keyof Colors}[] = [
    {color: 'tomato'},
    {color: 'blue'},
    {color: 'orange'},
  ];
  // Define percentages and colors for the arcs

  // Convert percentages to angles
  const angles = rate.map(data => (data / 100) * 360);

  let startAngle = 70; // Start at the top of the circle

  return (
    <Canvas style={{width: size, height: size}}>
      {angles.map((angle, index) => {
        const endAngle = startAngle + angle;

        // Create a new path for each arc segment
        const path = Skia.Path.Make();
        path.addArc(
          {
            x: strokeWidth / 2,
            y: strokeWidth / 2,
            width: size - strokeWidth,
            height: size - strokeWidth,
          },
          startAngle,
          endAngle - startAngle,
        );

        // Update startAngle for the next segment
        startAngle = endAngle;

        return (
          <Path
            key={index}
            path={path}
            color={COLORS[index].color} // Apply different colors
            style="stroke"
            strokeWidth={strokeWidth}
          />
        );
      })}
    </Canvas>
  );
};
