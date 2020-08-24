import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    selectedFile: null,
    Username: "",
    Password: ""
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://localhost:8080/upload", fd, {
        onUploadProgress: ProgressEvent => {
          console.log(
            "Upload Progress:" +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("Transfer Error", error);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <input type="file" onChange={this.fileSelectedHandler} />
            <button onClick={this.fileUploadHandler}>upload</button>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default App;
