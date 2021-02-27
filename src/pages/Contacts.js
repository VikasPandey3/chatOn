import React, { Component } from "react";
import { connect } from "react-redux";
import { contactMessages } from "../redux/action";
import { db } from "../services/firebase";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.passData = this.passData.bind(this);
    this.state = {
      isOnline: null,
      presense: null,
    };
  }

  componentDidMount() {
    const { contactDetail } = this.props;
    var online = db
      .ref(`userPresence/${contactDetail.uid}`)
      .on("value", (snapshot) => {
        if (snapshot.val() === true) {
          // User is online, update UI.
          this.setState({ isOnline: true });
        } else {
          var s = new Date(parseInt(snapshot.val())).toUTCString();

          // User logged off at snapshot.val() - seconds since epoch.
          this.setState({ isOnline: s });
        }
      });
    this.setState({ presense: online });
  }
  componentWillUnmount() {
    const { contactDetail } = this.props;
    db.ref(`userPresence/${contactDetail.uid}`).off(
      "value",
      this.state.presense
    );
  }
  passData() {
    const { path, details, contactDetail, state } = this.props;
    details({
      path: path,
      contactDetail: contactDetail,
      state: state,
    });
  }
  render() {
    const { contactDetail, RecMsgTstamp, currentOwner } = this.props;
    const { name, uid, lastSeenMessage } = contactDetail;
    console.log("contacts");
    return (
      <div
        onClick={this.passData}
        className="p-4 m-1 font-normal col-span-2 hover:bg-gray-400 border-b-2"
      >
        <p className="font-sans">{name}</p>
        {RecMsgTstamp[uid] === undefined ? null : currentOwner ===
          uid ? null : lastSeenMessage < RecMsgTstamp[uid].lastSentMessage ? (
          <p className="text-blue-400 text-xs">NewMessage!</p>
        ) : null}
        {this.state.isOnline === true ? (
          <p className="text-black">Online</p>
        ) : (
          <p className="text-black">LastSeen at {this.state.isOnline}</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("consta ", state.msgTimestamp.lastTimestamp);
  return {
    currentOwner: state.getChat.contactDetail.uid,
    RecMsgTstamp: state.msgTimestamp.lastTimestamp,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    details: (y) => {
      dispatch(contactMessages(y));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
