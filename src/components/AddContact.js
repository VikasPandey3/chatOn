import React, { Component } from "react";
import { db } from "../services/firebase";

export class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchEmail: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.addContacts = this.addContacts.bind(this);
  }
  handleChange(event) {
    this.setState({
      searchEmail: event.target.value,
    });
  }
  async addContacts(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await db
        .ref("users")
        .orderByChild("email")
        .equalTo(`${this.state.searchEmail}`)
        .once("value", (snapshot) => {
          console.log("search ", snapshot.val());
          if (snapshot.val()) {
            snapshot.forEach((snap) => {
              var Info = snap.val();
              var contact = {
                email: Info.email,
                name: Info.name,
                uid: Info.uid
              };
              db.ref(`users/${this.props.userUid}/contacts`)
                .child(Info.uid)
                .set(contact)
                .catch((msg)=>{console.log(msg)})
            });
          } else {
            this.setState({ error: "Contact not found" });
          }
        });
    } catch (error) {
      this.setState({ error: this.state.error });
      console.log(error.message);
    }
  }
  render() {
    return (
      <div style={{backgroundColor:'#7ed6df'}}>
        <form className="flex h-16 p-2" onSubmit={this.addContacts}>
          <input
            className=" rounded-full w-full placeholder-black p-2 pl-3 shadow-sm border focus:outline-none"
            onChange={this.handleChange}
            value={this.state.searchEmail}
            name="contacts"
            placeholder="Add contacts"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 p-2 ml-1 focus:outline-none rounded-md text-white shadow-sm"
          >
            ADD
          </button>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default AddContact;
