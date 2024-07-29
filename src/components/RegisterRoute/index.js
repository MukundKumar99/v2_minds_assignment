import axios from "axios";
import { Component } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class RegisterRoute extends Component {
  state = {
    username: "",
    password: "",
    inputType: "password",
    showErrMsg: false,
    errorMsg: "",
  };

  onsubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/login");
    toast.success("Registered Successfully!!!");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg, showErrMsg: true });
    toast.error(errorMsg);
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userData = { email: username, password };
    if (username === "") {
      return this.setState({ showErrMsg: true, errorMsg: "Enter valid Email" });
    }
    if (password === "") {
      return this.setState({
        showErrMsg: true,
        errorMsg: "Enter valid Password",
      });
    }
    axios
      .post("https://mukund-notes-backnd.onrender.com/register", userData)
      .then((res) => {
        this.onsubmitSuccess();
      })
      .catch((error) => {
        this.onSubmitFailure(error.response.data);
      });
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value, showErrMsg: false });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value, showErrMsg: false });
  };

  onChangeCheckbox = (event) => {
    if (event.target.checked) {
      this.setState({ inputType: "text" });
    } else {
      this.setState({ inputType: "password" });
    }
  };

  render() {
    const { username, password, inputType, showErrMsg, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-bg-container">
        <div className="login-form-bg-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1721759102/Assignment/mobile-login-concept-illustration_ly2hcg.png"
            alt="login"
            className="login-image"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="login-title">Sign Up</h1>
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Email"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={inputType}
              className="form-input"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <div>
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="checkbox" className="input-label">
                Show Password
              </label>
            </div>
            {showErrMsg ? <p className="error-msg">{errorMsg}</p> : ""}
            <button type="submit" className="login-btn">
              Sign Up
            </button>
            <p className="sign-up-text">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterRoute;
