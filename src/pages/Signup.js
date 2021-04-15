import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";
import { db } from "../services/firebase";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    signup(this.state.email, this.state.password)
      .then((user) => {
        db.ref("users").child(user.user.uid).set({
          email: user.user.email,
          name: this.state.name,
          uid:user.user.uid
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  render() {
    return (
      <div className='flex items-center justify-center w-full h-full py-24 sm:py-32'>
        <form
          className=" w-full sm:w-2/5 mx-4 border-2 border-blue-500 rounded-md shadow "
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className="mx-auto">
            <p className="p-1 font-serif font-light text-center text-black sm:p-2 sm:text-2xl sm:font-bold">
              SignUp to
              <Link className="font-bold text-blue-600" to="/">
                ChatOn
              </Link>
            </p>
          </div>
          <div className="p-2">
            <input
              className="block w-full p-2 font-light text-black placeholder-black border-b-2 border-blue-500 sm:pb-3 sm:font-medium sm:px-1 focus:outline-none"
              placeholder="Username"
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <input
              className="block w-full p-2 font-light text-black placeholder-black border-b-2 border-blue-500 sm:pb-3 sm:font-medium sm:px-1 focus:outline-none"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="p-2">
            <input
              className="block w-full p-2 font-light text-black placeholder-black border-b-2 border-blue-500 appearance-none sm:pb-3 sm:font-medium sm:px-1 focus:outline-none"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div className="p-2">
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button
              className="p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800 sm:font-bold sm:px-3 sm:py-2 focus:outline-none"
              type="submit"
            >
              SignUp
            </button>
          </div>
          <hr></hr>
          <p className="p-2">
            Already have an account?
            <Link className="font-bold text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
