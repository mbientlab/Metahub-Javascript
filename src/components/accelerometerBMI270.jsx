import React, { Component } from "react";
import Slider from '@mui/material/Slider';

const range = [
  {
    value: 2,
    label: '2',
    hover: '2Gs',
  },
  {
    value: 4,
    label: '4',
    hover: '4Gs',
  },
  {
    value: 8,
    label: '8',
    hover: '8Gs',
  },
  {
    value: 16,
    label: '16',
    hover: '16Gs',
  },
];

const frequency = [
      {
        value: 0,
        label: '0',
        hover: 'OFF',
      },
      {
        value: 12.5,
        label: '12.5',
        hover: '12Hz',
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

class AccelerometerBMI270 extends Component {
  handleFrequencyChange = (event, value) => this.value = value;
  handleFrequencyDragStop = () => this.props.onAccFreq(this.value);
  handleRangeChange = (event, value) => this.value = value;
  handleRangeDragStop = () => this.props.onAccRange(this.value);

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
        Range (Gs)
        <Slider
          aria-label="Restricted values"
          defaultValue={2}
          step={null}
          valueLabelDisplay="auto"
          valueLabelFormat={valueRangeLabelFormat}
          marks={range}
          min={2}
          max={16}
          onChange={this.handleRangeChange} 
          onChangeCommitted={this.handleRangeDragStop}      
          />
      </div>
    );
  }


}

export default AccelerometerBMI270;
