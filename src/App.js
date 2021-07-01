import React, { Component } from 'react'
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

import Particles from 'react-particles-js';


const particlesOption = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
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
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }



  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(data)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }



  displayFaceBox = (box) => {
    this.setState({ box: box })
  }



  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }



  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  }



  handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      this.onImageSubmit();
    }
  };



  onRouteChange = (route) => {
    this.setState({ route: route })
  }



  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  }



  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;

    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOption} />
        <div />


        {route === 'home'

          ? <div>
            <Navigation
              isSignedIn={isSignedIn}
              onRouteChange={this.onRouteChange} />

            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
              handleKeypress={this.handleKeypress}
            />

            <FaceRecognition
              imageUrl={imageUrl}
              box={box} />
          </div>

          : (
            route === 'signin'

              ? <Signin
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser} />

              :
              <Register
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser} />
          )}

      </div>);
  }
}


export default App;
