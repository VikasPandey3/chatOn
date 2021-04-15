import React, { Component } from "react";
import { db, auth,serverTime } from "../services/firebase";
import AddContact from "../components/AddContact";
import { connect } from "react-redux";
import Contacts from "../pages/Contacts";
import ShowChat from "./ShowChat";
import Status from "./Status";
import MessageBox from "../components/MessageBox";
import Radium, { StyleRoot } from 'radium'
class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      contacts: [],
      noContact:false
    };
    this.getUid = this.getUid.bind(this);
    this.onChangeContact=this.onChangeContact.bind(this);
    this.handleSignout=this.handleSignout.bind(this)
  }
  getUid(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }
  handleSignout() {
    auth()
      .signOut()
      .then(() => {
        console.log("successful logout");
      })
      .catch((error) => {
        this.setState({ logoutError: error.message });
      });
  }
  onChangeContact(snapshot){
      var contact = [];
      snapshot.forEach((snap) => {
        contact.push(snap.val());
      });
      if(contact.length>0)
        this.setState({ contacts: contact });
      else
      this.setState({ noContact:true });
  }
  componentWillUnmount(){
    db.ref(`users/${this.state.user.uid}/contacts`).off('value',this.onChangeContact)
  }
  componentDidMount() {
    var current=new Date()
    console.log('contact list is fetching',current.toLocaleTimeString())
    db.ref(`users/${this.state.user.uid}/contacts`).on(
      "value",
      this.onChangeContact,
      (error) => {
        console.log(error);
      }
    );
    console.log('fetching end',current.toLocaleTimeString())
    // Since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    var myConnectionsRef = db.ref(`users/${this.state.user.uid}/connections`);

    // stores the timestamp of my last disconnect (the last time I was seen online)
    var lastOnlineRef = db.ref(`users/${this.state.user.uid}/lastOnline`);

    var connectedRef = db.ref('.info/connected');
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        var con = myConnectionsRef.push();

        // When I disconnect, remove this device
        con.onDisconnect().remove();

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        con.set(true);

        // When I disconnect, update the last time I was seen online
        lastOnlineRef.onDisconnect().set(serverTime);
      }
    });
  }
  render() {
    const style = {
      contectBox:{
        flexBasis: "30%",
        transform: "translatez(0)",
        "@media (max-width: 600px)": {
        flexBasis: "100%",
        transform: "translatez(0)",
      }},
      initBox:{
        flexBasis: "70%",
        transform: "translatez(0)",
        "@media (max-width:600px)":{
          display:"none",
      }},
      chatBox:{
        flexBasis: "70%",
        transform: "translatez(0)",
        "@media (max-width:600px)":{
          display:"none",
      }}
    };
    return (
      // container
      <div className=" w-full m-auto">
        {/* chat */}
          <div className='flex flex-col h-screen bg-teal-300'>
          {/* chat header start */}
          <div className='flex cursor-pointer'>
            {/* profile start */}
            <div className=' w-full flex items-center px-3 bg-blue-300 relative' style={{height:'60px'}}>
              {/* left */}
              <div>
                <img src={process.env.PUBLIC_URL+'/img/arrow.png'} className='absolute w-8 inline-block cursor-pointer'style={{top:'15px'}} />
                <img src={process.env.PUBLIC_URL+"/img/pp.png"} className='inline-block rounded-full ml-8 mr-2' style={{width:"50px"}}/>
                <h2 className='inline-block align-bottom font-bold text-white' style={{lineHeight:'50px'}}>Vikas</h2>
                <span className='absolute' style={{top:'38px',left:"103px",fontSize:"14px"}}>online</span>
              </div>
              {/* right */}
              <div></div>
            </div>
            {/* profile end */}
          </div>
          {/* chat header end */}
          {/* chat box start*/}
          <div className='flex-1'>

          </div>
          {/* chat box end */}
          {/* chat footer start */}
          <div className="h-12 bg-blue-700 w-full">

          </div>
          {/* chat footer end */}
        </div>
        {/* chat end */}
      </div>
      // container end
    );
  }
}
const mapStateToProp=(state)=>{
  return{
    visibility:state.getChat.visibility
  }
}
export default connect(mapStateToProp,null)(Radium(main));
