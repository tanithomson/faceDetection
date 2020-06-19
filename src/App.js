import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';




const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 400
      }
    },
    color : {
      value: '#0046f0'
    },
    shape: {
      type: 'circle',
      
    },
    size: {
      value: 4,
      anim: {
        speed: 40
       
      }
    },

    line_linked : {
      color: '#25b6a5'
    }

  }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
     user: {
        id: '',
        name: '',
        email: '',
        joined: ''
      }
}

class App extends Component {

constructor() {

  super();
  this.state= initialState;
  }


 loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
     // entries: data.entries,
      joined: data.joined
    }})
  }


calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

}

displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }


onInputChange= (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  fetch('https://frozen-atoll-85569.herokuapp.com/image', {
    method:'post',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input 
    })
  })
  .then(response => response.json())
   .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
   .catch(err => console.log(err));
}

onRouteChange = (route) => {
   if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;