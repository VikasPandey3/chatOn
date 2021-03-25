import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, db } from "../services/firebase";

export class MessageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      writeError: null,
      visibility:'visible',
    };
    this.changeVisibility = this.changeVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeVisibility(){
    var message=document.getElementById('input_message').textContent;
    if((message.length)===0){
      this.setState({visibility:'visible'})
    }
    else if(this.state.visibility==='visible'){
      this.setState({visibility:'hidden'})
    }
  }
  async handleSubmit() {
    this.setState({ writeError: null });
    try {
      var updates={}
      var message = {
        content: document.getElementById('input_message').textContent,
        timestamp: Date.now(),
        from: this.state.user.uid,
        to: this.props.receiver.uid,
        };
      
      db.ref(`onetoone/${this.props.path}`).child('chats').push(message)
      updates[`onetoone/${this.props.path}/lastSentMessageTimestamp/${this.state.user.uid}`]=message.timestamp 
        
       await db.ref().update(updates,(error)=>{
         console.log(error)
       })
      // this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }
  render() {
    return (
      <>
      <footer className="bg-teal-500 relative order-3 w-full block" style={{flex: "none", minHeight: "62px" }}>
        <div className='flex flex-row border-l-2 visible relative max-w-full' style={{minHeight: "62px",padding:'5px 10px' }}>
          <div className='flex' style={{flex:'none',padding:'5px 10px', minHeight:'52px',marginRight:'-10px'}}></div>
          <div className=' bg-gray-400 min-w-0' style={{borderRadius:'21px',flex:'auto',padding:'9px 12px 11px',margin:'5px 10px', minHeight:'20px'}}>
            <div className='flex relative overflow-hidden pr-0 flex-grow flex-shrink' >
              <div className='absolute top-0' style={{left:'2px',visibility:this.state.visibility}}>
              Type message here</div>
              <div onInput={this.changeVisibility} id='input_message' className='relative overflow-hidden overflow-y-auto w-full' contentEditable='true' style={{minHeight:'20px',maxHeight:'100px',wordWrap:'break-word'}}></div>
            </div>
          </div>
          <div onClick={this.handleSubmit} style={{flex:'none',padding:'5px 10px', minHeight:'52px'}}>Send</div>
        </div>
      </footer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    path: state.getChat.path,
    receiver: state.getChat.receiver,
  };
};

export default connect(mapStateToProps, null)(MessageBox);
