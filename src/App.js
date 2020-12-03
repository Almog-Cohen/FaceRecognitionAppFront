import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import UserRank from "./components/UserRank/UserRank";
import RankList from "./components/RankList/RankList";
import Particles from "react-particles-js";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import "./App.css";



const particlesDesign = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 700,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  isRankOpen: false,

  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    phone: "",
    age: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if(token){
      fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(data =>{
        if(data && data.id){
          fetch(`http://localhost:3001/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(res => res.json())
          .then(user => {
            if(user && user.email){
              console.log(user);
              this.loadUser(user)
              this.onRouteChange('home')
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  //Loading user data
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        phone: data.phone,
        age: data.age
      },
    });
  };

  //Calculating the face location
  calculateFacesLocation = (data) => {
    if(data && data.outputs) {
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  }
  return
}



  //Setting boxes state
  displayFaceBox = (boxes) => {
    if(boxes){
    this.setState({ boxes: boxes });
    }
  };

  //Set state for input url text
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };


  //Fetching clarifai results from the server
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': window.sessionStorage.getItem('token')
     },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: {
               "Content-Type": "application/json",
               'Authorization': window.sessionStorage.getItem('token')
               },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((countEntries) => {
              this.setState(
                Object.assign(this.state.user, { entries: countEntries })
              );
            })
            .catch(console.log);
        }

        this.displayFaceBox(this.calculateFacesLocation(response));
      })
      .catch((err) => console.log(err));
  };

  // Changing routes bettween signin, register and home page
  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModleRankList = () => {
    this.setState((prevState) => ({
      ...prevState,
      isRankOpen: !this.state.isRankOpen,
    }));
  };

  // Show/dismiss user profile modle
  toggleModle = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !this.state.isProfileOpen,
    }));
  };

  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      boxes,
      isProfileOpen,
      isRankOpen,
      user,
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesDesign} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModle={this.toggleModle}
          toggleModleRankList={this.toggleModleRankList}
          user={user}
        />

        {isProfileOpen && (
          <Modal>
            <Profile
              // isProfileOpen={isProfileOpen}
              toggleModle={this.toggleModle}
              user={user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}

          {isRankOpen && (
          <Modal>
            <RankList
              // isProfileOpen={isRankOpen}
              toggleModleRankList={this.toggleModleRankList}
              user={user}
              
            />
          </Modal>
        )}

        {route === "home" ? (
          <div>
            <Logo />
            {/* <RankList/> */}
            <UserRank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            {/* <RankList/> */}
            {/* <TopRank /> */}
          </div>
        ) : route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}

      </div>
    );
  }
}

export default App;
