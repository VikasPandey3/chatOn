import React, { Component } from "react";
import { connect } from "react-redux";
import { db, auth } from "../services/firebase";


class Status extends Component {
  constructor(props){
    super(props);
    this.state={
      isOnline:false,
      lastOnline:'',
    }
  }
  componentDidMount() {
    db.ref(`users/${this.props.receiver.uid}/contcacts`).on('value',(snapshot)=>{
      console.log(snapshot.val())
      if(snapshot.val()!==null){
        this.setState({isOnline:true,lastOnline:''})
      }
      else{
        var lastTime=''
        db.ref(`users/${this.props.receiver.uid}/lastOnline`).once('value',(snap)=>{
          var x=snap.val()
          lastTime=new Date(x).toLocaleTimeString()
        })
        this.setState({isOnline:false,lastOnline:lastTime})
      }
    })
  }
  
  render() {
    console.log(this.props.receiver,this.state.isOnline,this.state.lastOnline)
    return (
      <header
      className="flex bg-red-400 border-l-2 flex-baseline w-full content-center justify-between px-4 py-3 relative"
      style={{ height: "59px", 
      zIndex: "1000", 
      flex: "none" }}
    >
      <div>{this.props.receiver===undefined ? null : this.props.receiver.name}</div>
      <div>{this.state.isOnline?<p>Online</p>:this.state.lastOnline}</div>
    </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    receiver: state.getChat.receiver,
  };
};

export default connect(mapStateToProps, null)(Status);
