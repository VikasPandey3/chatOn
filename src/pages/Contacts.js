import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentChatPath } from "../redux/action";
import { db } from "../services/firebase";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.passData = this.passData.bind(this);
    this.state = {
      NewMessage:false,
      lastMessageReceivedTimestamp:0,
    };
  }

  componentDidMount() {
    const {path,contactDetail,userUid,currentOppositeUser} = this.props;
    const receiver=contactDetail.uid
    
    db.ref(`onetoone/${path}/lastSentMessageTimestamp`)
      .on("value", (snapshot) => {
        console.log(this.props.currentOppositeUser,"A",receiver)
        if(snapshot.val()&&(contactDetail.lastSeenMessageTimestamp)< snapshot.val()[receiver]){
          if(this.props.currentOppositeUser===receiver){
            this.setState({lastMessageReceivedTimestamp:snapshot.val()[receiver] });
          }
          else{
            this.setState({NewMessage: true,lastMessageReceivedTimestamp:snapshot.val()[receiver] });
          }
        }
      });
  }
  
  passData() {
    const { path, contactDetail,userUid } = this.props;
    this.props.currentChatPath([path,contactDetail])
    
    if((contactDetail.lastSeenMessageTimestamp)< this.state.lastMessageReceivedTimestamp){
      this.setState({NewMessage:false})
      var updates={}
      updates[`users/${userUid}/contacts/${contactDetail.uid}/lastSeenMessageTimestamp`]=Date.now()
      db.ref().update(updates,(error)=>{
        console.log(error)
      })
    }
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
const mapStateToProps = (state) => {
  return {
    currentOppositeUser: state.getChat.receiver.uid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    currentChatPath: (y) => {
      dispatch(setCurrentChatPath(y));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
