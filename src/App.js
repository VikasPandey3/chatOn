import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/main';
import { auth } from './services/firebase';
import Radium, { StyleRoot } from 'radium'


function PrivateRoute({component:Component,authenticated,...rest}) {
  return (
      <Route
       {...rest}
        render={(props)=> authenticated ?<Component{...props}/>:<Redirect
        to={{pathname:'/', state:{from:props.location}}}/>}      
      />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated
        ? <Redirect to='/main' />
        : <Component {...props} />}
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
    return(
       this.state.loading? <h2>Loading...</h2> : (
      <StyleRoot>
        <Router>
          <Switch>
            <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Home}></PublicRoute>
            <Route path="/main" component={Main}></Route>
            {/* <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
            <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute> */}
          </Switch>
        </Router>
      </StyleRoot>
       )
    );
  }
}

export default Radium(App)