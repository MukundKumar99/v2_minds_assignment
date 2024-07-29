import { Component } from "react";
import "./index.css";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import Popup from "reactjs-popup";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { format } from "date-fns";

class NoteItem extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    pinned: "",
    bgColor: "",
    createdAt: "",
  };

  componentDidMount() {
    const { noteData } = this.props;
    const { _id, title, description, pinned, bgColor, createdAt } = noteData;
    this.setState({ id: _id, title, description, pinned, bgColor, createdAt });
  }

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

  refreshPage = () => {
    const { getAllNotes } = this.props;
    getAllNotes();
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { id, title, description, pinned, bgColor } = this.state;
    const note = {
      title,
      description,
      pinned,
      bgColor,
    };
    const jwtToken = Cookies.get("jwt_token");
    axios
      .put(`https://mukund-notes-backnd.onrender.com/note/${id}`, note, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
        this.refreshPage();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  };

  onDeleteNote = () => {
    const deletePrompt = window.confirm("Are you sure want to delete note?");
    if (deletePrompt) {
      const jwtToken = Cookies.get("jwt_token");
      const { id } = this.state;
      axios
        .delete(`https://mukund-notes-backnd.onrender.com/note/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          toast.success(res.data);
          this.refreshPage();
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error);
        });
    }
  };

  unChangeNote = () => {
    console.log("Unchanged");
  };

  render() {
    const { title, description, pinned, bgColor, createdAt } = this.state;

    const formattedDate = createdAt
      ? format(new Date(createdAt), "dd MMM yyyy")
      : "";
    return (
      <Popup
        modal
        trigger={
          <li className={`notes-container ${bgColor}`}>
            <h1 className="note-title">{title}</h1>
            <hr />
            <p className="note-description">{description}</p>
            <p className="created-at">{formattedDate}</p>
            {pinned && <MdPushPin className="pinned-post" />}
          </li>
        }
      >
        {(close) => (
          <div className="modal-container">
            <div className="note-bg-container">
              <div className={`note-container ${bgColor}`}>
                <form onSubmit={this.onSubmitForm}>
                  <div className="note-top-container">
                    <div className="color-bg-container">
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
                        onClick={this.onDeleteNote}
                      >
                        <MdDeleteForever />
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
              <button
                type="button"
                className="close-popup-btn"
                onClick={() => close()}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default NoteItem;
