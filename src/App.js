import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
      text: 'My chart'
  },
  series: [{
      type: 'line',
      data: [1, 2, 3]
  }]
};
function App() {
  return (
    <div>
      <p>React App</p>
      <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
    </div>
  );
}

export default App;