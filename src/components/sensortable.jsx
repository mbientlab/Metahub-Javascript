import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

class SensorTable extends Component {
  onCheckboxChange = (e, index) => {
    const checked = e.target.checked;
    this.props.onCheck(checked, index);
    e.preventDefault();
  }

  render() {
    const { metaSensors, onBlink, onReset, onSleep } = this.props;
    return (
      <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>MAC</TableCell>
              <TableCell>RSSI</TableCell>
              <TableCell>Blink</TableCell>
              <TableCell>Reset</TableCell>
              <TableCell>Sleep</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metaSensors.map((sensor, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={sensor.checked.isTrue}
                    onChange={e=>this.onCheckboxChange(e, index)} 
                    inputProps={{ 'aria-labelledby': index }}
                  />
                </TableCell>
                <TableCell>{sensor.name}</TableCell>
                <TableCell>{sensor.model}</TableCell>
                <TableCell>{sensor.mac}</TableCell>
                <TableCell>{sensor.rssi}</TableCell>
                <TableCell>
                  <Button onClick={() => {onBlink(index)}} variant="contained">
                    Blink
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => {onReset(index)}} variant="contained">
                    Reset
                  </Button>
                </TableCell>
                <TableCell>   
                  <Button onClick={() => {onSleep(index)}} variant="contained">
                    Sleep
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
  }
}

export default SensorTable;
