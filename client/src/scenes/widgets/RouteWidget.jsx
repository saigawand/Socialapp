import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const RouteWidget = () => {
  const [legs, setLegs] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [newLeg, setNewLeg] = useState({ startCity: "", endCity: "", cost: 0 });

  const handleAddLeg = () => {
    setLegs([...legs, newLeg]);
    setNewLeg({ startCity: "", endCity: "", cost: 0 });
  };

  const handleDeleteLeg = (index) => {
    const updatedLegs = [...legs];
    updatedLegs.splice(index, 1);
    setLegs(updatedLegs);
  };

  const handleUpdateLeg = (index) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = newLeg;
    setLegs(updatedLegs);
    setNewLeg({ startCity: "", endCity: "", cost: 0 });
  };

  const handleCalculateTotalCost = () => {
    let cost = 0;
    legs.forEach((leg) => {
      cost += Number(leg.cost);
    });
    setTotalCost(cost);
  };

  return (
    <Box maxWidth={400} margin="0 auto">
      <Box
        backgroundColor="#ffffff"
        padding="1rem"
        borderRadius="4px"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h5" gutterBottom>
          <b>Manage Route</b>
        </Typography>

        <Box display="flex" alignItems="center" marginBottom="1rem">
          <TextField
            label="Start City"
            value={newLeg.startCity}
            onChange={(e) => setNewLeg({ ...newLeg, startCity: e.target.value })}
            variant="outlined"
            margin="dense"
            size="small"
          />
          <TextField
            label="End City"
            value={newLeg.endCity}
            onChange={(e) => setNewLeg({ ...newLeg, endCity: e.target.value })}
            variant="outlined"
            margin="dense"
            size="small"
          />
          <TextField
            label="Cost"
            value={newLeg.cost}
            onChange={(e) => setNewLeg({ ...newLeg, cost: e.target.value })}
            variant="outlined"
            margin="dense"
            size="small"
            type="number"
          />
          <Button variant="contained" color="primary" onClick={handleAddLeg}>
            Add Leg
          </Button>
        </Box>

        {legs.map((leg, index) => (
          <Box
            display="flex"
            alignItems="center"
            marginBottom="0.5rem"
            padding="0.5rem"
            borderRadius="4px"
            backgroundColor="#f8f8f8"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
            key={index}
          >
            <Typography>{`${leg.startCity} -> ${leg.endCity}`}</Typography>
            <Typography variant="caption" marginLeft="0.5rem">
              Cost: {leg.cost}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteLeg(index)}
              style={{ marginLeft: "auto", marginRight: "0.5rem" }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleUpdateLeg(index)}
            >
              Update
            </Button>
          </Box>
        ))}

        <Box marginTop="1rem" textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateTotalCost}
            style={{ marginBottom: "1rem" }}
          >
            Calculate Total Cost
          </Button>
          <Typography variant="h6" gutterBottom>
            Total Cost: {totalCost}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteWidget;
