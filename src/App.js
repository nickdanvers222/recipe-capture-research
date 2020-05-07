import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


const identifyImage = async (imageUrl) => {
  const Clarifai = require('clarifai');
  const app = new Clarifai.App({
      apiKey:
  // {base64: imageData}
  let results = await app.models.predict('bd367be194cf45149e75f01d59f77ba7',imageUrl)
  .then((response) => response.outputs[0].data.concepts )
  .catch((err) => console.log(err))
  return results;
};

let forbiddenDictionary = [
'delicious',
'fast',
'lunch',
'unhealthy',
'nutrition',
'melt',
'no person',  
"fast",
"vegetable",
"relish",
"sweet",
"juice",
"pasture",
"chocolate",
"condiment",
"fruit",
"citrus",
"berry",
"dairy product",
"coffee",
'breakfast',
'food',
'hamburger',
'sandwich',
'pie'
]




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text:'',
      tags:[]
    }
  }

  handleSubmit = async () => {
    console.log(this.state.text)
    let result = await identifyImage(`${this.state.text}`);
    // let filtered = result.filter( x => x.value > 0.80 && x.name !== "no person" && x.name !== "delicious" && x.name !== "fast" && x.name !== "vegetable" && x.name !== "relish" && x.name !== "sweet" && x.name !== "juice" && x.name !== "pasture" && x.name !== "chocolate" && x.name !== "condiment" && x.name !== "fruit" && x.name !== "citrus" && x.name !== "berry"  && x.name !== "dairy product"  && x.name !== "coffee")
    let filtered = result.filter(x => x.value > 0.80 && !forbiddenDictionary.includes(x.name))
    this.setState({tags:filtered})
    console.log(this.state)
    
    
  };
   


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input style={{width:'30vw', height:'10vh'}} type='text' value={this.state.text} onChange={(event) => {this.setState({text:event.target.value})}}/>
          <input style={{width:'10vw', height:'6vh'}} type='submit'title='submit' onClick={this.handleSubmit}/>
          {this.state.tags.map((x) => <div>{x.name}</div>)}
          </header>
      </div>
    );
  }
  
}

export default App;
