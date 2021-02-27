import React, { Component } from "react";
import { connect } from "react-redux";
import "../assets/ChatBox.css"
export class Message extends Component {
  render() {
    const { chat, sender, lastSeenTimeStamp } = this.props;
    return (
        <div
          className={'mb-4 '+
            (chat.from === sender
              ? chat.timestamp <= lastSeenTimeStamp[chat.to].lastSeenMessage
                ? "viewItemRight2"
                : " float-right bg-blue-700 text-white"
              : " viewItemLeft2")
          }
        >
          <p className='viewWrapItemLeft'>{chat.content}</p>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lastSeenTimeStamp: state.msgTimestamp.lastTimestamp,
  };
};
export default connect(mapStateToProps, null)(Message);
