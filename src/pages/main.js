import React, { Component } from "react";
import { auth } from "../services/firebase";
import AddContact from "../components/AddContact";
//import ShowChat from "./ShowChat";
//import Status from "./Status";
import Nav from "../components/Nav";
import ContactList from "../components/ContactList";
import MessageBox from "../components/MessageBox";
import "../assets/ChatBox.css";
//import ImageUpload from "../components/ImageUpload";
class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
    };
  }

  render() {
    console.log("main render");
    return (
      <>
      <div className='fixed top-0 w-full z-10'>
          <Nav user={this.state.user} />
      </div>
      <div className='grid grid-cols-6 mt-16 overflow-hidden' style={{height:'90vh'}}>
        <div className='hidden sm:block sm:col-span-2 bg-yellow-200 overflow-y-auto'>
          <div className='h-20 bg-green-300 border-b-2'>
            <AddContact userUid={this.state.user.uid}/>
          </div>
          <ContactList userUid={this.state.user.uid}/>
        </div>
        <div className='col-span-6 sm:col-span-4 bg-teal-700 h-full relative'>
          <div className='absolute bottom-0 w-full'>
          <MessageBox/>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default main;
