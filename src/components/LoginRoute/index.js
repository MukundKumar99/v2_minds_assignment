import { Component } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    inputType: "password",
    showErrMsg: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    toast.success("Login successfull !!!");
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (error) => {
    toast.error(error);
    this.setState({ errorMsg: error, showErrMsg: true });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userData = { email: username, password };
    if (username === "") {
      toast.error("Enter valid Username");
      return this.setState({ showErrMsg: true, errorMsg: "Enter Username" });
    }
    if (password === "") {
      toast.error("Enter password");
      return this.setState({ showErrMsg: true, errorMsg: "Enter Password" });
    }
    axios
      .post("https://mukund-notes-backnd.onrender.com/login", userData)
      .then((res) => {
        this.onSubmitSuccess(res.data.jwtToken);
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
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1721759092/Assignment/access-control-system-abstract-concept_wgh8ff.png"
            alt="login"
            className="login-image"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="login-title">Login</h1>
            <label htmlFor="username" className="form-label">
              Username / Email
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Username / Email"
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
              Login
            </button>
            <p className="sign-up-text">
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
