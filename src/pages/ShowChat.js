import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";
import Message from "../components/Message";
import "../assets/ChatBox.css";
class ShowChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
    };
    this.updateTimestamp = this.updateTimestamp.bind(this);
  }

  componentDidUpdate() {
    const container = document.getElementById("chat-view");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
    var length = this.props.chats.length;
    var lastMessage = this.props.chats[length - 1];
    if (
      length &&
      lastMessage.to === this.state.user.uid &&
      lastMessage.timestamp > this.props.ownerDetail.lastSeenMessage
    ) {
      this.updateTimestamp(lastMessage.timestamp);
    }
  }
  async updateTimestamp(p) {
    console.log("update time");
    var update = {};
    update[
      `users/${this.state.user.uid}/usercontacts/${this.props.ownerDetail.uid}/lastSeenMessage`
    ] = p;
    update[
      `contacts/${this.props.ownerDetail.uid}/${this.state.user.uid}/lastSeenMessage`
    ] = p;
    await db.ref().update(update, (error) => {
      console.log("u ", error);
    });
  }
  render() {
    return (
        <div
          id="chat-view"
          className="viewListContentChat h-full overflow-auto" 
        >
          {this.props.chats.map((chat, i) => {
            return <Message key={i} chat={chat} sender={this.state.user.uid} />;
          })}
        </div>
      
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chats: state.msgTimestamp.chats,
    ownerDetail: state.getChat.contactDetail,
  };
};

export default connect(mapStateToProps, null)(ShowChat);
