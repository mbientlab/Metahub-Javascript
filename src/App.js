import React, { Component } from "react";
import Button from '@mui/material/Button';
import SensorTable from "./components/sensortable";
import AccelerometerBMI270 from "./components/accelerometerBMI270";
import AccelerometerBMI160 from "./components/accelerometerBMI160";
import Gyroscope from "./components/gyroscope";
import { Line } from 'react-chartjs-2'

export const options = {
  response: true,
  scales: {
    xAxes: [
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.streamer = null;
    this.chartReference = React.createRef();
    this.state = {
      data: {
        labels: [0,1,2,3,4,5,6],
        datasets: [{
          label: 'X',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },{
          label: 'Y',
          data: [45, 67, 23, 78, 34, 36, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 92)',
          tension: 0.1
        },{ label: 'Z',
          data: [62, 48, 45, 67, 56, 34, 40],
          fill: false,
          borderColor: 'rgb(75, 92, 192)',
          tension: 0.1
        }]
      },
      isLogging: false,
      isStreaming: false,
      metaSensors: [
        // {
        //   name: "Metawear",
        //   model: "MMRL",
        //   mac: "F6:D3:45:67:A5",
        //   rssi: -34,
        //   connected: false,
        //   checked: true,
        // },
        // {
        //   name: "Metawear",
        //   model: "MMR",
        //   mac: "A4:D3:45:67:A5",
        //   rssi: -65,
        //   connected: false,
        //   checked: false,
        // },
        // {
        //   name: "Metawear",
        //   model: "MMS",
        //   mac: "E1:D3:45:67:A5",
        //   rssi: -12,
        //   connected: false,
        //   checked: false,
        // },
      ],
      settings: {
        accelerometer: {
          frequency: 0,
          range: 2,
        },
        gyroscope: {
          frequency: 0,
          range: 2,
        },
      },
    };
  }

  handleScan = () => {
    var scanInterval = setInterval(() => {
      const metaSensors = [...this.state.metaSensors];
      metaSensors.push({
        name: "Metawear",
        model: "MMS",
        mac: "E1:D3:45:67:A5",
        rssi: -25,
        connected: false,
        checked: false,
      },);
      console.log("Scan and add new sensors");
      this.setState({ metaSensors });
      clearInterval(scanInterval);
    }, 5000); 
  };

  handleBlink = (index) => {
    const metaSensors = [...this.state.metaSensors];
    console.log("Connect and blink a sensor");
    console.log(index);
    this.setState({ metaSensors });
  };

  handleReset = (index) => {
    const metaSensors = [...this.state.metaSensors];
    console.log("Reset a sensor");
    console.log(index);
    this.setState({ metaSensors });
  };

  handleSleep = (index) => {
    const metaSensors = this.state.metaSensors;
    console.log("Put sensor to sleep");
    console.log(index);
    this.setState({ metaSensors });
  };

  handleCheckbox = (checked, index) => {
    const metaSensors = this.state.metaSensors;
    console.log("Checked");
    if (checked) {
      metaSensors[index].checked = true
    } else {
      metaSensors[index].checked = false
    }
    console.log(checked);
    console.log(index);
    this.setState({ metaSensors });
  };

  handleLog = () => {
    var isLogging = this.state.isLogging;
    console.log("Log");
    isLogging = true;
    console.log(isLogging);
    this.setState({ isLogging });
  };

  handleStream = () => {
    var isStreaming = this.state.isStreaming;
    console.log("Start Stream");
    isStreaming = true;
    console.log(isStreaming);
    this.setState({ isStreaming });
    this.streamer = setInterval(() => {
      const chart = this.chartReference.current.chartInstance;
      chart.data.labels.push(chart.data.labels.length);
      chart.data.datasets[0].data.push(65);
      chart.data.datasets[1].data.push(65);
      chart.data.datasets[2].data.push(65);
      console.log(chart.data.datasets[0].data);
      chart.update();
    }, 2000); 
  };

  stopStream = () => {
    var isStreaming = this.state.isStreaming;
    console.log("Stop Stream");
    isStreaming = false;
    console.log(isStreaming);
    this.setState({ isStreaming });
    clearInterval(this.streamer);
  };

  handleAccFreq = (newFreq) => {
    console.log('New acc freq');
    console.log(newFreq);
    var settings = this.state.settings;
    settings.accelerometer.frequency = newFreq
    this.setState({ settings });
  }

  handleAccRange = (newRange) => {
    console.log('New acc tange');
    console.log(newRange);
    var settings = this.state.settings;
    settings.accelerometer.range = newRange
    this.setState({ settings });
  }

  handleGyroFreq = (newFreq) => {
    console.log(newFreq);
    console.log('New gyro freq');
    var settings = this.state.settings;
    settings.gyroscope.frequency = newFreq
    this.setState({ settings });
  }

  handleGyroRange = (newRange) => {
    console.log(newRange);
    console.log('New gyro range');
    var settings = this.state.settings;
    settings.gyroscope.range = newRange
    this.setState({ settings });
  }

  render() {
    const metaSensors = this.state.metaSensors;
    const bmi170 = false;
    let accelerometer;
    if (bmi170) {
      accelerometer =  <AccelerometerBMI270 onAccRange={this.handleAccRange} onAccFreq={this.handleAccFreq}></AccelerometerBMI270>;
    } else {
      accelerometer = <AccelerometerBMI160 onAccRange={this.handleAccRange} onAccFreq={this.handleAccFreq}></AccelerometerBMI160>;
    }
    let gyroscope = <Gyroscope onGyroRange={this.handleGyroRange} onGyroFreq={this.handleGyroFreq}></Gyroscope>;
    return (
        <main className="container">
          <div className="card__box">
            <div>
            MetaSensors
            <Button 
              onClick={() => {this.handleScan()}}
              variant="contained">
              Scan
            </Button>
            </div>
            <SensorTable
              metaSensors={metaSensors}
              onBlink={this.handleBlink}
              onReset={this.handleReset}
              onSleep={this.handleSleep}
              onCheck={this.handleCheckbox}
            ></SensorTable>
          </div>
          <div className="card__box">
            <div>
            Sensors
            <Button 
              onClick={() => {this.handleLog()}}
              variant="contained">
              Log
            </Button>
            <Button 
              onClick={() => {this.handleStream()}}
              variant="contained">
              Stream
            </Button>
            <Button 
              onClick={() => {this.stopStream()}}
              variant="contained">
              Stop
            </Button>
            </div>
            <div>
              ACCELEROMETER
              {accelerometer}
            </div>
            <div>
              GYROSCOPE
              {gyroscope}
            </div>
          </div>
          <Line ref={this.chartReference} options={options} data={this.state.data} />
        </main>
    );
  }
}

export default App;
