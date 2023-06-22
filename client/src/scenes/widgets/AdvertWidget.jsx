import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';

const RouteCostScene = () => {
  const [numLegs, setNumLegs] = useState(1);
  const [legs, setLegs] = useState([{ source: '', destination: '', cost: 0 }]);
  const [totalCost, setTotalCost] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNumLegsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumLegs(value);
    setLegs(Array(value).fill({ source: '', destination: '', cost: 0 }));
    setTotalCost(0);
    setShowResult(false);
  };

  const handleLegChange = (index, field, value) => {
    const updatedLegs = [...legs];
    updatedLegs[index][field] = value;
    setLegs(updatedLegs);
  };

  const handleCalculateTotalCost = () => {
    let cost = 0;
    for (let leg of legs) {
      cost += parseFloat(leg.cost);
    }
    setTotalCost(cost);
    setShowResult(true);
  };

  return (
    <div>
      <Typography variant="h3">Calculate Total Trip Cost</Typography>

      <div>
        <label htmlFor="numLegs">Number of Legs:</label>
        <input
          type="number"
          id="numLegs"
          min="1"
          value={numLegs}
          onChange={handleNumLegsChange}
        />
      </div>

      {legs.map((leg, index) => (
        <div key={index}>
          <Typography variant="subtitle1">Leg {index + 1}</Typography>
          <div>
            <label htmlFor={`source-${index}`}>Source City:</label>
            <input
              type="text"
              id={`source-${index}`}
              value={leg.source}
              onChange={(e) => handleLegChange(index, 'source', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`destination-${index}`}>Destination City:</label>
            <input
              type="text"
              id={`destination-${index}`}
              value={leg.destination}
              onChange={(e) =>
                handleLegChange(index, 'destination', e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor={`cost-${index}`}>Cost:</label>
            <input
              type="number"
              id={`cost-${index}`}
              min="0"
              step="0.01"
              value={leg.cost}
              onChange={(e) =>
                handleLegChange(index, 'cost', e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <Button variant="contained" onClick={handleCalculateTotalCost}>
        Calculate Total Cost
      </Button>

      {showResult && (
        <Typography variant="h5">
          The total cost of the trip is: {totalCost}
        </Typography>
      )}
    </div>
  );
};

export default RouteCostScene;
