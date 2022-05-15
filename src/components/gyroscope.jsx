import React, { Component } from "react";
import Slider from '@mui/material/Slider';

const range = [
  {
    value: 125,
    label: '125',
    hover: '125°/s',
  },
  {
    value: 250,
    label: '250',
    hover: '250°/s',
  },
  {
    value: 500,
    label: '500',
    hover: '500°/s',
  },
  {
    value: 1000,
    label: '1000',
    hover: '1000°/s',
  },
  {
    value: 2000,
    label: '2000',
    hover: '2000°/s',
  },
];

const frequency = [
      {
        value: 0,
        label: '0',
        hover: 'OFF',
      },
      {
        value: 25,
        label: '25',
        hover: '25Hz',
      },
      {
        value: 50,
        label: '50',
        hover: '50Hz',
      },
      {
        value: 100,
        label: '100',
        hover: '100Hz',
      },
      {
        value: 200,
        label: '200',
        hover: '200Hz',
      },
      {
        value: 400,
        label: '400',
        hover: '400Hz',
      },
      {
        value: 800,
        label: '800',
        hover: '800Hz',
      },
];

function valueFreqLabelFormat(value) {
  const index = frequency.findIndex((mark) => mark.value === value);
  return frequency[index].hover;
}

function valueRangeLabelFormat(value) {
  const index = range.findIndex((mark) => mark.value === value);
  return range[index].hover;
}

class Gyroscope extends Component {
  handleFrequencyChange = (event, value) => this.value = value;
  handleFrequencyDragStop = () => this.props.onGyroFreq(this.value);
  handleRangeChange = (event, value) => this.value = value;
  handleRangeDragStop = () => this.props.onGyroRange(this.value);

  render() {
    return (
      <div>
        Frequency (Hz)
        <Slider
          aria-label="Restricted values"
          defaultValue={0}
          step={null}
          valueLabelDisplay="auto"
          valueLabelFormat={valueFreqLabelFormat}
          marks={frequency}
          min={0}
          max={800}
          onChange={this.handleFrequencyChange} 
          onChangeCommitted={this.handleFrequencyDragStop}      
          />
        Range (°/s)
        <Slider
          aria-label="Restricted values"
          defaultValue={125}
          step={null}
          valueLabelDisplay="auto"
          valueLabelFormat={valueRangeLabelFormat}
          marks={range}
          min={125}
          max={2000}
          onChange={this.handleRangeChange} 
          onChangeCommitted={this.handleRangeDragStop}      
          />
      </div>
    );
  }


}

export default Gyroscope;
