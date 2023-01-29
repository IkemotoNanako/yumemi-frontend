import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React , { Component } from 'react';
import './App.css';

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
    this.setState({selected:selected_copy});
    if(this.state.selected[index] === false){
      fetch(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(index+1),
        {
          headers: { 'X-API-KEY': "SvJv1CMqnWejMMPeZTf6HYxJMeJsxRwu9eKUeZO9" }
        }
      ).then(response => response.json())
      .then((results) => {
        var prefPopulation = this.state.series;
        var tmpPref = [];
        Object.keys(results.result.data[0].data).map((key) =>
         tmpPref.push(results.result.data[0].data[key].value)
        ); 
        prefPopulation.push({
          name: this.state.prefectures[index].prefName,
          data: tmpPref,
        });
        this.setState({series:prefPopulation})
        }
      );
    }else{
      const series_copy = this.state.series.slice();
      for (let i = 0; i < series_copy.length; i++) {
        if (series_copy[i].name == this.state.prefectures[index].prefName) {
          series_copy.splice(i, 1);
        }
      }
      this.setState({series: series_copy});
    }
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
          text: '総人口推移'
      },
      series: this.state.series,
      xAxis: {
        title: {
          text: "年度",
        },
      },
      yAxis: {
        title: {
          text: "人口数",
        },
      },  
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointInterval: 5,
          pointStart: 1960
        }
      },
    };
    return (
      <div>
        <h2>日本の人口推移</h2>
        <div>
          <h3>都道府県</h3>
          {Object.keys(obj).map((key) => 
            <div key={obj[key].prefCode} className="flexbox">
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