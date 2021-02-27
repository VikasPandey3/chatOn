import React, { Component } from "react";
import { connect } from "react-redux";
import { db } from "../services/firebase";
import { auth } from "../services/firebase";
class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:auth().currentUser,
      content: "",
      writeError: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("onetoone").child(`${this.props.path}`).push({
        content: this.state.content,
        timestamp: Date.now(),
        from: this.state.user.uid,
        to: this.props.to,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  render() {
    return (
        <div className='bg-white ml-1'>
          <form className="flex m-1" onSubmit={this.handleSubmit}>
            <textarea
              style={{ height: "10x" }}
              className="items-center flex-auto w-11/12 p-2 m-1 text-white bg-blue-800 border-none rounded-md resize-none focus:outline-none"
              onChange={this.handleChange}
              value={this.state.content}
              placeholder="Write here..."
            ></textarea>
            <button
              className="flex-auto w-1/12 p-2 m-1 text-white bg-blue-600 rounded-md "
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    to: state.getChat.to,
    path: state.getChat.path,
  };
};
export default connect(mapStateToProps, null)(Chats);
