import React, { Component } from "react";
import { db,auth } from "../services/firebase";
import AddContact from "../components/AddContact";
import Contacts from "../pages/Contacts";
import ShowChat from "./ShowChat";
//import Status from "./Status";
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
      contacts:[],
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
      <>
      <div className='fixed top-0 w-full z-10'>
          <Nav user={this.state.user} />
      </div>
      <div className='grid grid-cols-6 mt-16 overflow-hidden' style={{height:'90vh'}}>
        <div className='hidden sm:block sm:col-span-2 bg-yellow-200 overflow-y-auto'>
          <div className='h-20 bg-green-300 border-b-2'>
            <AddContact userUid={this.state.user.uid}/>
          </div>
          {this.state.contacts.length > 0 ? (
          <>
            {this.state.contacts.map((contact, i) => {
              const path = this.getUid(this.state.user.uid, contact.uid);
              return (
                <Contacts
                  key={i}
                  contactDetail={contact}
                  path={path}
                  userUid={this.state.user.uid}
                />
              );
            })}
          </>
        ) : (
          <div className="p-4">No contacts is available please add contacs</div>
        )}
        </div>
        <div className='col-span-6 sm:col-span-4 bg-teal-700 h-full relative'>
          <ShowChat/>
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
