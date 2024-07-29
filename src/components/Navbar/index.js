import "./index.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  state = { showMenu: false };

  changeMenuView = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  OnLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  render() {
    const { showMenu } = this.state;
    return (
      <nav className="nav-bg-container">
        <div className="nav-links-container">
          <Link className="link" to="/">
            <div className="logo-container">M</div>
          </Link>
          <button
            type="button"
            className="menu-btn"
            onClick={this.changeMenuView}
          >
            {showMenu ? <IoMdClose /> : <IoMenu />}
          </button>
          {showMenu ? (
            <ul className="sm-links-container" onClick={this.changeMenuView}>
              <Link className="link" to="/">
                <li className="nav-link sm-link">All Notes</li>
              </Link>
              <Link className="link" to="/createNote">
                <li className="nav-link sm-link">Create Note</li>
              </Link>
              <button
                type="button"
                className="nav-link logout-btn"
                onClick={this.OnLogout}
              >
                Logout
              </button>
            </ul>
          ) : null}

          <ul className="lg-links-container">
            <Link className="link" to="/">
              <li className="nav-link">All Notes</li>
            </Link>
            <Link className="link" to="/createNote">
              <li className="nav-link">Create Note</li>
            </Link>
            <button
              type="button"
              className="nav-link logout-btn"
              onClick={this.OnLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
