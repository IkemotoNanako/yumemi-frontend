import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React , { Component } from 'react';

class App extends Component{
  constructor() {
    super();
    this.state = {
      selected: Array(47).fill(false),
      prefectures: {},
      series: []
    };
  }
  _ChangeSelection(index){
    const selected_copy = this.state.selected.slice();
    selected_copy[index] = !selected_copy[index];
    this.setState({selected:selected_copy})
  }
  componentDidMount() {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': "SvJv1CMqnWejMMPeZTf6HYxJMeJsxRwu9eKUeZO9" }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ prefectures: res.result });
      });
  }
  render(){
    const obj = this.state.prefectures;
    const options = {
      title: {
          text: 'My chart'
      },
      series: [{
          type: 'line',
          data: [1, 2, 3]
      }]
    };
    return (
      <div>
        <div>
          {Object.keys(obj).map((key) => 
            <div key={obj[key].prefCode}>
              <input type="checkbox" onChange={() => this._ChangeSelection(obj[key].prefCode - 1)} checked={this.state.selected[obj[key].prefCode - 1]}/>
              <label>{obj[key].prefName}</label>
            </div>
          )}
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  }
}

export default App;