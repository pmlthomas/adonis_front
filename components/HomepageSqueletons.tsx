import { Skeleton } from '@mui/material';
import React from 'react';

export default function HomepageSqueletons() {
  // Displaying Squeletons while Data is Loading
  function getSqueletonDisplay() {
    let squeletonDisplay = [];
    for (let i = 0; i < 4; i++) {
      squeletonDisplay.push(
        <div key={i} className="mb-8 -mt-5">
          <Skeleton
            variant="rectangular"
            width={700}
            height={200}
            className="rounded-lg"
          />
        </div>
      );
    }
    return squeletonDisplay;
  }
  return <>{getSqueletonDisplay()}</>;
}
