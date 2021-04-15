import React, { Component } from 'react'
import Nav from '../components/Nav'
import Login from './Login'
import Signup from './Signup'
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggle: false,
          key:'home'
        };
        this.handlePage=this.handlePage.bind(this);
    }
    handlePage(e){
        console.log(e.target.name);
        this.setState({key:e.target.name})

    }
    render() {
        return (
        <div className='relative' style={{height:'100%',margin:'0'}}>
            <div style={{height:'65px'}} className='absolute top-0 w-full z-10'>
                <nav className='flex flex-col sm:flex-row bg-gray-800 justify-between w-full'>
                    <div className=" flex justify-between sm:justify-start border-b-2 border-gray-200 sm:border-none">
                        <strong><div className='text-gray-200 m-2 p-3 uppercase'>Chat On</div></strong>
                        <button className='focus:outline-none focus:ring focus:border-blue-300 sm:hidden text-gray-200 m-2 p-3' 
                        onClick={()=>this.setState({toggle:!this.state.toggle})}>
                        <i className={!this.state.toggle ?"fa fa-fw fa-bars":"fa fa-fw fa-times"}></i></button>
                    </div>
                    <div className={this.state.toggle?"block ":"hidden sm:block"}>
                        <div className="flex flex-col sm:flex sm:flex-row sm:flex-grow justify-end divide-y divide-gray-400">
                            <button onClick={this.handlePage} name='home' className='text-gray-200 sm:m-2 sm:border-none hover:text-black focus:outline-none focus:ring focus:border-green-100 rounded-md hover:bg-white font-semibold p-3 text-left'>Home</button>
                            <button onClick={this.handlePage} name='login' className='text-gray-200 sm:m-2 sm:border-none hover:text-black focus:outline-none focus:ring focus:border-blue-300 rounded-md hover:bg-white font-semibold p-3 text-left'>LogIn</button>
                            <button onClick={this.handlePage} name='signup'className='text-gray-200 sm:m-2 rounded-md sm:border-none hover:text-black focus:outline-none focus:ring focus:border-blue-300 hover:bg-white font-semibold p-3 text-left'>SignUp</button>
                        </div>
                    </div>
                </nav>
            </div>
            <div style={{paddingTop:'64px'}} className='absolute w-full h-screen'>
                {(()=>{
                    switch (this.state.key) {
                        case 'home':
                            return( 
                                <div className='text-center w-full bg-teal-500 h-full'>
                                    <div className='text-3xl font-bold sm:text-5xl relative text-white'
                                     style={{top:'30vh',display:this.state.home}}
                                     >
                                         Welcome to chatOn
                                    </div>
                                </div>  
                            )
                        case 'login':
                            return <div className='h-full bg-white'><Login/></div>
                        case 'signup':
                             return <div className='h-full bg-white'><Signup/></div>
                        default:
                            return <div className='text-3xl font-bold sm:text-5xl relative text-white' style={{top:'25vh',display:this.state.home}}>Welcome to chatOn</div>
                    }
                })()} 
            </div> 
        </div>
        )
    }
}

export default Home
