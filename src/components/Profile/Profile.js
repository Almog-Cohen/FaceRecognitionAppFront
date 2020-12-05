import React from "react";
import "./Profile.css";
import { PROFILE_URL } from "../Constans/Fetch";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      phone: this.props.user.phone,
      age: this.props.user.age,
    };
  }

  // Setting profile states
  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-phone":
        this.setState({ phone: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;

      default:
        return;
    }
  };

  // Updating profile data
  onProfileUpdate = (data) => {
    fetch(PROFILE_URL + this.props.user.id, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          this.props.toggleModle();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log);
  };

  render() {
    const { user, toggleModle } = this.props;
    const { name, phone, age } = this.state;

    return (
      <div className="profile-modal">
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">
              Name
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2  ba  w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="user-phone">
              Phone
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2  ba  w-100"
              placeholder={user.phone}
              type="text"
              name="user-phone"
              id="phone"
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2  ba  w-100"
              placeholder={user.age}
              type="text"
              name="user-age"
              id="age"
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() => this.onProfileUpdate({ name, phone, age })}
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModle}
              >
                Cancle
              </button>
            </div>
          </main>
          <div className="modal-close pa3 " onClick={toggleModle}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
