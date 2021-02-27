import React, { Component } from "react";
import { db, serverTime } from "../services/firebase";
import { connect } from "react-redux";
import Contacts from "../pages/Contacts";
import { recivedMsgTime } from "../redux/action";
import AddContact from "./AddContact";
export class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      isConnected: false,
      userContacts: null,
      timestamp: null,
      connectedRef: null,
    };
    this.getUid = this.getUid.bind(this);
  }
  componentDidMount() {
    var mesgTimestamp = {};
    var userContacts = db.ref(`users/${this.props.userUID}/usercontacts`).on(
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

    var timestamp = db.ref(`contacts/${this.props.userUID}`).on(
      "value",
      (snapshots) => {
        snapshots.forEach((snap) => {
          mesgTimestamp[snap.key] = snap.val();
        });
        this.props.updatedTimestamp(mesgTimestamp);
      },
      (error) => {
        console.log(error);
      }
    );

    var userRef = db.ref("userPresence/" + this.props.userUID);
    var connectedRef = db.ref(".info/connected").on("value", (snap) => {
      if (snap.val()) {
        userRef.onDisconnect().set(serverTime);
        userRef.set(true);
        this.setState({ isConnected: true });
      } else {
        this.setState({ isConnected: false });
      }
    });
    this.setState({
      connectedRef: connectedRef,
      userContacts: userContacts,
      timestamp: timestamp,
    });
  }

  componentWillUnmount() {
    const { userContacts, connectedRef, timestamp } = this.state;
    db.ref(`users/${this.props.userUID}/usercontacts`).off(
      "value",
      userContacts
    );
    db.ref(`contacts/${this.props.userUID}`).off("value", timestamp);
    db.ref(".info/connected").off("value", connectedRef);
  }
  getUid(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }
  render() {
    const { userUID } = this.props;
    console.log("contlist");
    return (
      <div>
        <AddContact userUid={userUID} />
        {this.state.isConnected ? null : <p>You are not connected</p>}
        {this.state.contacts.length > 0 ? (
          <div>
            {this.state.contacts.map((contact, i) => {
              const path = this.getUid(userUID, contact.uid);
              return (
                <Contacts
                  key={i}
                  contactDetail={contact}
                  path={path}
                  state={this.state.isConnected}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-4">No contacts is available please add contacs</div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatedTimestamp: (x) => dispatch(recivedMsgTime(x)),
  };
};
export default connect(null, mapDispatchToProps)(ContactList);
