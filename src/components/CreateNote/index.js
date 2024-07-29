import { Component } from "react";
import "./index.css";
import Navbar from "../Navbar";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

class NewNote extends Component {
  state = {
    title: "",
    description: "",
    pinned: false,
    bgColor: "white",
  };

  onChangePinStatus = () => {
    this.setState((prevState) => ({ pinned: !prevState.pinned }));
  };

  onSetBgColor = (event) => {
    this.setState({ bgColor: event.target.value });
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmitSuccess = (msg) => {
    toast.success(msg);
    const { history } = this.props;
    history.replace("/");
  };

  closeNote = () => {
    const { history } = this.props;
    history.replace("/");
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { title, description, pinned, bgColor } = this.state;
    const note = {
      title,
      description,
      pinned,
      bgColor,
    };
    const jwtToken = Cookies.get("jwt_token");
    axios
      .post("https://mukund-notes-backnd.onrender.com/note", note, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        this.onSubmitSuccess(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { title, description, pinned, bgColor } = this.state;
    return (
      <>
        <Navbar />
        <div className="note-bg-container new-note">
          <div className={`note-container ${bgColor}`}>
            <form onSubmit={this.onSubmitForm}>
              <div className="note-top-container">
                <div>
                  <button
                    type="button"
                    className="palette yellow"
                    value="yellow"
                    onClick={this.onSetBgColor}
                  ></button>
                  <button
                    type="button"
                    className="palette green"
                    value="green"
                    onClick={this.onSetBgColor}
                  ></button>
                  <button
                    type="button"
                    className="palette blue"
                    value="blue"
                    onClick={this.onSetBgColor}
                  ></button>
                  <button
                    type="button"
                    className="palette orange"
                    value="orange"
                    onClick={this.onSetBgColor}
                  ></button>
                  <button
                    type="button"
                    className="palette white"
                    value="white"
                    onClick={this.onSetBgColor}
                  ></button>
                </div>
                <div className="btn-container">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.onChangePinStatus}
                  >
                    {pinned ? (
                      <MdPushPin className="pin-filled" />
                    ) : (
                      <MdOutlinePushPin className="pin-outline" />
                    )}
                  </button>
                  <button type="submit" className="btn save">
                    <TiTick />
                  </button>
                  <button
                    type="button"
                    className="btn delete"
                    onClick={this.closeNote}
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className="note-text-input"
                  placeholder="Note Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <textarea
                  rows={12}
                  cols={36}
                  placeholder="Note Description"
                  value={description}
                  onChange={this.onChangeDescription}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default NewNote;
