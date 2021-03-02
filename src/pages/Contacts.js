import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentChatPath } from "../redux/action";
import { db } from "../services/firebase";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.passData = this.passData.bind(this);
    this.state = {
      //isOnline: null,
      //presense: null,
      NewMessage:false
    };
  }

  componentDidMount() {
    const {path,contactDetail,userUid} = this.props;
    const receiver=contactDetail.uid
    db.ref(`onetoone/${path}/lastSentMessageTimestamp`)
      .on("value", (snapshot) => {
        if (snapshot.val()&&snapshot.val()[userUid]<snapshot.val()[receiver]){
          // New Message, update UI.
          this.setState({NewMessage: true });
        }
      });
  }
  /*componentWillUnmount() {
    const { contactDetail } = this.props;
    db.ref(`userPresence/${contactDetail.uid}`).off(
      "value",
      this.state.presense
    );
  }*/
  passData() {
    const { path, contactDetail } = this.props;
    this.props.currentChatPath([path,contactDetail.uid])
    this.setState({NewMessage:false})
  }
  render() {
    //const { contactDetail, RecMsgTstamp, currentOwner } = this.props;
    const { email,name, uid } = this.props.contactDetail;
    console.log("contacts");
    return (
      <div className='h-20 bg-green-300 border-b-2' onClick={this.passData}>
        {name}
        {this.state.NewMessage?<p>NewMessage</p>:<p></p>}
      </div>
    );
  }
}
/*const mapStateToProps = (state) => {
  console.log("consta ", state.msgTimestamp.lastTimestamp);
  return {
    currentOwner: state.getChat.contactDetail.uid,
    RecMsgTstamp: state.msgTimestamp.lastTimestamp,
  };
};*/
const mapDispatchToProps = (dispatch) => {
  return {
    currentChatPath: (y) => {
      dispatch(setCurrentChatPath(y));
    },
  };
};
export default connect(null, mapDispatchToProps)(Contacts);
