import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/main'
import { auth } from './services/firebase';


function PrivateRoute({component:Component,authenticated,...rest}) {
  return (
      <Route
       {...rest}
        render={(props)=> authenticated === true ?<Component{...props}/>:<Redirect
        to={{pathname:'/login', state:{from:props.location}}}/>}      
      />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/main' />}
    />
  )
}

 class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authenticated:false,
      loading:true
    }

  }
  componentDidMount() {
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({
          authenticated:true,
          loading:false
        })
      } else {
        this.setState({
          authenticated:false,
          loading:false
        })
      }
    })
  }
  
  render() {
    console.log('app.js')
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    );
  }
}

export default App