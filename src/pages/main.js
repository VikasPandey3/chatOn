import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import AddContact from "../components/AddContact";
import { connect } from "react-redux";
import Contacts from "../pages/Contacts";
import ShowChat from "./ShowChat";
import Status from "./Status";
import MessageBox from "../components/MessageBox";
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
    console.log('user authentication start',current.toLocaleTimeString())
    db.ref(`users/${this.state.user.uid}/contacts`).on(
      "value",
      this.onChangeContact,
      (error) => {
        console.log(error);
      }
    );
    console.log('user authentication end',current.toLocaleTimeString())
  }
  render() {
    console.log("main render");
    return (
      <div className="absolute w-full h-full overflow-hidden top-0 left-0 p-0 m-0 bg-yello-400">
        {/* first div covering full screen */}
        <div
          className="h-full w-full relative overflow-hidden overflow-y-auto bg-green-900"
          style={{ zIndex: "100" }}
        >
          {/* second dive can overflow in y direction */}
          <div className="flex relative top-0 left-0 w-full h-full overflow-hidden origin-center bg-white"
              style={{ minHeight: "512px", backgroundPosition: "0 0" }}
            >
            {/* third div with min height */}
            <div 
              className="h-full relative overflow-hidden bg-pink-500 hidden sm:block"
              style={{
                flexBasis: "30%",
                transform: "translatez(0)",
                // zIndex: "100",
              }}
            >
              {/* second div third div */} 
              <div className="flex flex-col h-full">
                <header
                  className="flex bg-red-400  flex-baseline w-full content-center justify-end px-4 py-3 relative"
                  style={{ height: "59px", 
                  // zIndex: "1000",
                    flex: "none" }}
                > 
                  <div className='mx-2'>{this.state.user.email}</div>
                  <div className='mx-2'><button onClick={this.handleSignout}>Logout </button></div>
                </header>
                {/* <span className="flex flex-col" style={{ flex: "none" }}></span> */}
                <div className="bg-green-500" style={{ flex: "none", height: "64px" }}>
                  <AddContact/>
                </div>
                <div className="flex-grow overflow-y-auto relative flex flex-col bg-blue-400">
                  { this.state.noContact?
                    <div className='text-center'>No Contacts are added</div>:
                    this.state.contacts.length>0?
                    this.state.contacts.map((contact,i)=>{
                    const path=this.getUid(this.state.user.uid,contact.uid);
                    return(<Contacts key={i} contactDetail={contact} path={path} userUid={this.state.user.uid}/> )
                    }):
                    <div className='text-center'>Fetching contacts list...</div>
                  }
                </div>
              </div>
            </div>
            <div id='70' className={"h-full relative overflow-hidden origin-top-left bg-white flexBasis "+(this.props.visibility?" block ":" hidden ")}
                style={{flexBasis: "70%",transform: "translatez(0)"}}
              >
                {/* third div inside third div*/} 
                <div className="flex flex-col h-full origin-top-left bg-yellow-600">
                  <div className="w-full h-full absolute top-0 bg-blue-200"></div>
                  <Status/>
                  <ShowChat/>
                  <MessageBox/>
                </div>
              </div>
            <div className={!this.props.visibility?" block ":" hidden "+"h-full relative overflow-hidden origin-top-left bg-white relative"}
                style={{flexBasis: "70%",transform: "translatez(0)"}}
              >
               <div className='absolute text-center' style={{top:'50%', left:'50%',width:'200px',height:'50px',marginTop:'-25px',marginLeft:'-100px'}}> Wellcome to chatOn</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProp=(state)=>{
  return{
    visibility:state.getChat.visibility
  }
}
export default connect(mapStateToProp,null)(main);
