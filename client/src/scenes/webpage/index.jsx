import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
const RouteCostCalculator = () => {
  const [numLegs, setNumLegs] = useState(1);
  const [legs, setLegs] = useState([]);
  const [error, setError] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleNumLegsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumLegs(isNaN(value) ? 0 : value);
  };

  const handleSourceChange = (event, index) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = { ...updatedLegs[index], source: event.target.value };
    setLegs(updatedLegs);
  };

  const handleDestinationChange = (event, index) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = { ...updatedLegs[index], destination: event.target.value };
    setLegs(updatedLegs);
  };

  const handleCostChange = (event, index) => {
    const value = parseFloat(event.target.value);
    const updatedLegs = [...legs];
    updatedLegs[index] = { ...updatedLegs[index], cost: isNaN(value) ? 0 : value };
    setLegs(updatedLegs);
  };

  const handleAddLeg = () => {
    setLegs([...legs, { source: '', destination: '', cost: 0 }]);
  };

  const handleRemoveLeg = (index) => {
    const updatedLegs = [...legs];
    updatedLegs.splice(index, 1);
    setLegs(updatedLegs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (numLegs < 1) {
      setError('Please enter a valid number of legs.');
      return;
    }

    for (let leg of legs) {
      if (!leg.source || !leg.destination || isNaN(leg.cost)) {
        setError('Please enter valid leg details.');
        return;
      }
    }

    const total = legs.reduce((acc, leg) => acc + leg.cost, 0);
    setTotalCost(total);
    setError('');
  };

  return (
    <div>
      <Typography variant="h4">Route Cost Calculator</Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numLegs">Number of Legs:</label>
          <TextField
            id="numLegs"
            type="number"
            value={numLegs}
            onChange={handleNumLegsChange}
            inputProps={{ min: 1 }}
            required
          />
        </div>

        <div>
          {legs.map((leg, index) => (
            <div key={index}>
              <TextField
                label={`Source for Leg ${index + 1}`}
                value={leg.source}
                onChange={(event) => handleSourceChange(event, index)}
                required
              />
              <TextField
                label={`Destination for Leg ${index + 1}`}
                value={leg.destination}
                onChange={(event) => handleDestinationChange(event, index)}
                required
              />
              <TextField
                label={`Cost for Leg ${index + 1}`}
                type="number"
                value={leg.cost}
                onChange={(event) => handleCostChange(event, index)}
                required
              />
              <Button onClick={() => handleRemoveLeg(index)}>Remove</Button>
            </div>
          ))}
        </div>

        <Button onClick={handleAddLeg}>Add Leg</Button>

        <Button type="submit">Calculate Total Cost</Button>
      </form>

      {error && <Typography color="error">{error}</Typography>}
      {totalCost !== 0 && (
        <Typography>Total cost of the trip is: {totalCost}</Typography>
      )}
    </div>
  );
};

export default RouteCostCalculator;
