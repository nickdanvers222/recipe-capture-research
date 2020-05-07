import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


const identifyImage = async (imageUrl) => {
  const Clarifai = require('clarifai');
  const app = new Clarifai.App({
      apiKey:
  });
  // {base64: imageData}
  let results = await app.models.predict(Clarifai.GENERAL_MODEL,imageUrl)
  .then((response) => response.outputs[0].data.concepts )
  .catch((err) => console.log(err))
  return results;
};





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text:''
    }
  }
  handleSubmit = async () => {
    console.log(this.state.text)
    let result = await identifyImage(`${this.state.text}`);
    console.log(result)
  };
   


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input style={{width:'30vw'}} type='text' value={this.state.text} onChange={(event) => {this.setState({text:event.target.value})}}/>
          <input type='submit'title='submit' onClick={this.handleSubmit}/>
          {}
          </header>
      </div>
    );
  }
  
}

export default App;
