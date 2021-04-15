import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password)
      .then((x)=>{
        console.log(x)
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <div className='flex items-center justify-center w-full h-full py-24 sm:py-32'>
        <form
          className=" w-full sm:w-2/5 mx-4 sm:w-2/5  border-2 border-blue-500 rounded-md shadow "
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className="mx-auto">
            <p className="p-1 font-serif font-light text-center text-black sm:p-2 sm:text-2xl sm:font-bold">
              LogIn to
              <Link className="font-bold text-blue-600" to="/">
                ChatOn
              </Link>
            </p>
          </div>
          <div className="p-2">
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
              LogIn
            </button>
          </div>
          <hr />
          <p className="p-2">
            Don't have an account?{" "}
            <Link className="font-bold text-blue-500" to="/signup">
              Sign up
            </Link>
          </p>
          <p className="p-2 text-lg">Or</p>
          <button
            className="p-2 m-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800 sm:font-bold sm:px-3 sm:py-2 focus:outline-none"
            type="button"
            onClick={this.googleSignIn}
          >
            SignUp with google
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
