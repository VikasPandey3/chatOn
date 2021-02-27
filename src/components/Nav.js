import React, { Component } from "react";
import { auth, Storage } from "../services/firebase";
import add from "../icons/plus_add.png";
import edit from "../icons/edit.png";

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutError: "",
      image: null,
      url: "",
      progress: 0,
      toggle: false,
    };

    this.handleSignout = this.handleSignout.bind(this);
  }
  openCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

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
  handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = Storage.ref(`profileImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        Storage.ref("profileImages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url });
          });
      }
    );
  };
  render() {
    return (
      <>
      <nav className='flex flex-col sm:flex-row bg-gray-800 justify-between w-full'>
            <div className=" flex justify-between sm:justify-start border-b-2 border-gray-200 sm:border-none">
                <strong><div className='text-gray-200 m-2 p-3 uppercase'>Chat On</div></strong>
                <button className='sm:hidden text-gray-200 m-2 p-3 focus:outline-none' 
                  onClick={()=>this.setState({toggle:!this.state.toggle})}>
                <i className={!this.state.toggle ?"fa fa-fw fa-bars":"fa fa-fw fa-times"}></i></button>
            </div>
            
            <div className={(this.state.toggle?"block ":"hidden ")+" flex flex-col sm:flex sm:flex-row sm:flex-grow justify-end divide-y divide-gray-400"}>
                <button className='text-gray-200 sm:m-2 sm:border-none hover:text-black  rounded-md hover:bg-white font-semibold p-3 text-left'>Home</button>
                <button className='text-gray-200 sm:m-2 sm:border-none hover:text-black  rounded-md hover:bg-white font-semibold p-3 text-left'>{this.props.user.email}</button>
                <button onClick={this.handleSignout} className='text-gray-200 sm:m-2 rounded-md sm:border-none hover:text-black hover:bg-white font-semibold p-3 text-left'>Logout</button>
            </div>
        </nav>
      
      {/*<div
        style={{ backgroundColor: "#2C3A47" }}
        className="flex items-center justify-between w-full"
      >
        <p className="p-4 text-lg font-extrabold text-white">ChatOn</p>
        <div className="flex items-center justify-between">
          {this.state.logoutError ? alert(this.state.logoutError) : null}
          <strong className="p-2 text-white">{this.props.user.email}</strong>
          <div>
            <button
              className="p-4 font-medium text-white focus:outline-none"
              onClick={this.openCard}
            >
              Profile
            </button>
            <div
              className={
                " absolute max-w-3xl right-0 mt-1 mr-4 bg-white rounded-md shadow-inner bg-white text-center" +
                (this.state.isOpen ? " block" : " hidden")
              }
            >
              <div className=" mx-auto h-40 relative">
                <img
                  src={this.state.url || "https://via.placeholder.com/400x300"}
                  alt="Uploaded Images"
                  className=" w-full h-full object-cover"
                />
                <label
                  for="inf"
                  style={{ marginRight: "-6px", marginBottom: "-6px" }}
                  className="absolute bottom-0 right-0 "
                >
                  <img src={add} alt="file" className="w-8 bg" />
                </label>
                <input type="file" className="hidden" id="inf" />
              </div>
              <p className="p-2 font-medium text-gray-700">
                {this.props.user.email}
              </p>
              <div className="flex px-2 py-4 align-top justify-between">
                <h1 contentEditable="true" className="p-2 text-lg font-bold">
                  Vikas
                </h1>
                <div>
                  <img src={edit} alt="edit" className="w-6" />
                </div>
              </div>

              <button className=" font-bold block text-white w-full bg-black appearance-none rounded-sm px-2 py-1 mt-2 focus:outline-none hover:opacity-75">
                Update Profile
              </button>
            </div>
          </div>
          <button
            className="p-4 font-medium text-white focus:outline-none"
            onClick={this.handleSignout}
          >
            LogOut
          </button>
        </div>
            </div>*/}
    </>
    );
  }
}

export default Nav;
