import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


const identifyImage = async (imageData) => {
  const Clarifai = require('clarifai');
  const app = new Clarifai.App({
      apiKey: 
  });

  let results = await app.models.predict('bd367be194cf45149e75f01d59f77ba7', {base64: imageData})
  .then((response) => response.outputs[0].data.concepts )
  .catch((err) => console.log(err))
  return results;
};





class App extends React.Component {
  
  constructor(props) {
    super(props); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  
  


  encodeImageFileAsURL(element) {
    console.log('test');
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('1' , this.fileInput.current.files)
    var file = this.fileInput.current.files[0]
    console.log('2', file);
    var reader = new FileReader();
      reader.onloadend = async function() {
        let obj = {photo:reader.result}
        let example = await identifyImage(obj)
        console.log(example)
      }
      reader.readAsDataURL(file);
    
    
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="file" onChange={this.handleSubmit}ref={this.fileInput} />
          {}
          </header>
      </div>
    );
  }
  
}

export default App;
