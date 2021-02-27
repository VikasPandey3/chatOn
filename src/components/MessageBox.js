import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";

export class MessageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
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
  async handleSubmit() {
    this.setState({ writeError: null });
    try {
      var updates={}
      var message = {
        content: this.state.content,
        timestamp: Date.now(),
        from: this.state.user.uid,
        to: this.props.ownerDetail,
      };
      
      db.ref("onetoone").child(`${this.props.path}`).push(message)
      updates[`contacts/${this.props.ownerDetail}/${this.state.user.uid}/lastSentMessage`]=message.timestamp 
      updates[`users/${this.state.user.uid}/usercontacts/${this.props.ownerDetail}/lastSentMessage`]=message.timestamp
        
       await db.ref().update(updates,(error)=>{
         console.log(error)
       })
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }
  render() {
    return (
      <div style={{backgroundColor:'#7ed6df'}} className='flex'>
          <textarea
          style={{borderRadius:'25px'}}
            className="w-11/12 pl-5 py-3 m-3 text-black bg-white border-none resize-none placeholder-black overflow-hidden focus:outline-none"
            onChange={this.handleChange}
            value={this.state.content}
            rows='1'
            placeholder="Write here..."
          ></textarea>
          <button
            className="w-1/12 py-3 px-2 m-3 ml-0 text-white bg-blue-700 rounded-md "
            type="button"
            onClick={this.handleSubmit}
          >
            Send
          </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    path: state.getChat.path,
    ownerDetail: state.getChat.contactDetail.uid,
  };
};

export default connect(mapStateToProps, null)(MessageBox);
