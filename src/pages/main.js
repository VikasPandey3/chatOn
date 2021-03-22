import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import AddContact from "../components/AddContact";
import { connect } from "react-redux";
import Contacts from "../pages/Contacts";
import ShowChat from "./ShowChat";
import Status from "./Status";
import Nav from "../components/Nav";
//import ContactList from "../components/ContactList";
import MessageBox from "../components/MessageBox";
import "../assets/ChatBox.css";
//import ImageUpload from "../components/ImageUpload";
class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      contacts: [],
    };
    this.getUid = this.getUid.bind(this);
  }
  getUid(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }
  componentDidMount() {
    db.ref(`users/${this.state.user.uid}/contacts`).on(
      "value",
      (snapshot) => {
        var contact = [];
        snapshot.forEach((snap) => {
          contact.push(snap.val());
        });
        this.setState({ contacts: contact });
      },
      (error) => {
        console.log(error);
      }
    );
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
              className="h-full relative overflow-hidden bg-pink-500"
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
                  <div>{this.state.user.email}</div>
                </header>
                {/* <span className="flex flex-col" style={{ flex: "none" }}></span> */}
                <div className="bg-green-500" style={{ flex: "none", height: "64px" }}>
                  <AddContact/>
                </div>
                <div className="flex-grow overflow-y-auto relative flex flex-col bg-blue-400">
                  {this.state.contacts.map((contact,i)=>{
                    const path=this.getUid(this.state.user.uid,contact.uid);
                    return(<Contacts key={i} contactDetail={contact} path={path}/> )
                    })
                  }
                </div>
              </div>
            </div>
            <div
                className={this.props.visibility?" block ":" hidden "+"h-full relative overflow-hidden origin-top-left bg-white"}
                style={{
                  flexBasis: "70%",
                  transform: "translatez(0)",
                  // display:this.props.visibility?'block':'hidden',
                }}
              >
                {/* third div inside third div*/} 
                <div className="flex flex-col h-full origin-top-left bg-yellow-600">
                  <div className="w-full h-full absolute top-0 bg-blue-900"></div>
                  <Status/>
                  <ShowChat/>
                  <MessageBox/>
                </div>
              </div>
            <div className={!this.props.visibility?" block ":" hidden "+"h-full relative overflow-hidden origin-top-left bg-white relative"}
                style={{
                  flexBasis: "70%",
                  transform: "translatez(0)",
                  // display:!this.props.visibility?'block':'hidden'
                
                
                }}>
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
