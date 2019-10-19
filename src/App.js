import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    process: '-1',
    selProcess:'-1',
    processList: null,
    key: '',
    value: '',
  }

  getEnvironmentVariables = (process) => {
    if (process === '-1') {
      return false;
    }
    fetch(`/getEnvironment/${process}`)
      .then((data) => data.json())
      .then((result) => this.setState({ processList: result })).catch((error)=>{
        console.log("error in get environment",error)
      });
  };

  updateEnvironmentVariables = (process, key, value) => {
    if (process === -1) {
      return false;
    }
    fetch(`/setEnvironment/${process}/${key}/${value}`,{
      method: "POST",
    }).then((data) => data.json())
      .then((result) => this.setState({ processList: result })).catch((error)=>{
        console.log("Error in set environment",error)
      });
  };

  render() {
    let { processList,selProcess,process, key, value } = this.state;

    return (
      <div>
        <h3 className='text-center py-5'>Environment Variables Management</h3>
        <div className="block">
          <select  className="btn-select mr-2" value={selProcess} onChange={(event) => this.setState({ selProcess: event.target.value })}>
            <option value="-1">Please Select Process</option>
            <option value="P1">Process 1</option>
            <option value="P2">Process 2</option>
          </select>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => this.getEnvironmentVariables(selProcess)}>SUBMIT</button>
        </div>
        <div className="d-flex justify-content-center">
        <ul>
          {processList && Object.keys(processList).map((process) => (
                <li className="p-10 liTypeNone" key={process}>
                  <span className='gray'> Key: </span> {process} <br />
                  <span className='gray'> Value: </span>
                  {(processList)[process]}
                </li>
              ))}
        </ul>
        </div>
        <div className="block">
          <select className="btn-select mr-2" value={process} onChange={(event) => this.setState({ process: event.target.value })}>
            <option value="-1">Select Process</option>
            <option value="P1">Process 1</option>
            <option value="P2">Process 2</option>
          </select>
          <input
            type="text"
            value={key}
            className='w-200 mr-2 pl-2'
            onChange={(e) => this.setState({ key: e.target.value })}
            placeholder="New Key"
          />
          <input
            type="text"
            value={value}
            className='w-200 mr-2 pl-2'
            onChange={(e) => this.setState({ value: e.target.value })}
            placeholder="New Value"
          />
          <button
            type="button" class="btn btn-primary btn-sm"
            onClick={() =>
              this.updateEnvironmentVariables(process, key, value)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;