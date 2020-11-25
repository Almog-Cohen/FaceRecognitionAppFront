import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import UserRank from './components/UserRank/UserRank';
import Particles from 'react-particles-js';
import './App.css';







const particlesDesign = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

const initialState = { 
  input: '',
  imageUrl: '',
  boxes: [],
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


  //Loading user data
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  //Calculating the face location
  calculateFacesLocation = (data) => {
    return  data.outputs[0].data.regions.map( face =>{

      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })

  }


  //Setting box around they image
  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  //Listener for input url text
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  // .predict(Clarifai.FACE_DETECT_MODEL,
  //   this.state.input)

  // {id:'a403429f2ddf4b49b307e318f00e528b', version:'34ce21a40cc24b6b96ffee54aabff139'}


  //Listener for picture submit
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://glacial-beach-93669.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://glacial-beach-93669.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(countEntries => {
              this.setState(Object.assign(this.state.user, { entries: countEntries }))
            })
            .catch(console.log)
          }
          
              this.displayFaceBox(this.calculateFacesLocation(response))
            })
            .catch(err => console.log(err));
        }


        // Changing routes bettween signin, register and home page
        onRouteChange = (route) => {
          if (route === 'signout') {
            this.setState(initialState)
          } else if (route === 'home') {
            this.setState({ isSignedIn: true })
          }
          this.setState({ route: route });
        }

        render() {

          const { isSignedIn, imageUrl, route, boxes } = this.state;
          return (
            <div className="App">
              <Particles className='particles'
                params={particlesDesign}
              />
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

              {/* If statment */}
              {route === 'home'
                ? <div>
                  <Logo />
                  <UserRank
                   name={this.state.user.name}
                   entries={this.state.user.entries} />
                  <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onPictureSubmit={this.onPictureSubmit}
                  />
                  <FaceRecognition
                    boxes={boxes}
                    imageUrl={imageUrl}
                  />
                  {/* <TopRank /> */}
                </div>
                : (
                  route === 'register'
                    ? <Register
                      loadUser={this.loadUser}
                      onRouteChange={this.onRouteChange}
                      />
                    : <SignIn
                      loadUser={this.loadUser}
                      onRouteChange={this.onRouteChange}
                       />
                )

              }
            </div>
          );
        }
      }

export default App;