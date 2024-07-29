import { Component } from "react";
import axios from "axios";
import "./index.css";
import Cookies from "js-cookie";
import NoteItem from "../NoteItem";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "../Navbar";
import { Vortex } from "react-loader-spinner";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class AllNotes extends Component {
  state = { allNotes: [], apiStatus: apiStatusConstants.initial };

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    axios
      .get("https://mukund-notes-backnd.onrender.com/note", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        this.setState({
          allNotes: res.data,
          apiStatus: apiStatusConstants.success,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ apiStatus: apiStatusConstants.failure });
      });
  };

  renderLoadingView = () => (
    <div className="flex-container">
      <Vortex
        height="150"
        width="150"
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );

  renderFailureView = () => (
    <div className="flex-container">
      <h1 className="failure-view-title">Failed to Load</h1>
      <button type="button" className="failure-btn" onClick={this.getAllNotes}>
        Retry
      </button>
    </div>
  );

  renderSuccessView = () => {
    const { allNotes } = this.state;
    const pinnedNotes = allNotes.filter((eachNote) => eachNote.pinned === true);
    const unPinnedNotes = allNotes.filter(
      (eachNote) => eachNote.pinned === false
    );
    const notesList = [...pinnedNotes, ...unPinnedNotes];
    return (
      <div className="all-notes-bg-container">
        <ul className="all-notes-container">
          {notesList.map((eachNote) => (
            <NoteItem
              noteData={eachNote}
              key={eachNote._id}
              getAllNotes={this.getAllNotes}
            />
          ))}
        </ul>
        <Link to="/createNote">
          <button type="button" className="add-new-btn">
            +
          </button>
        </Link>
      </div>
    );
  };

  renderOutputView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();

      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Navbar />
        {this.renderOutputView()}
      </>
    );
  }
}

export default AllNotes;
