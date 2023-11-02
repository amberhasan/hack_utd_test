import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios
      .get("/api/data")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>React App</h1>
      </div>
    );
  }
}

export default App;
