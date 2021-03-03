import React, { Component } from "react";
import { connect } from "react-redux";

class Status extends Component {
  
  render() {
    console.log(this.props.receiver)
    return (
        <div className='flex flex-wrap h-16 bg-gray-700 content-center'>
          <div className="text-white p-2 text-2xl font-serif uppercase">
          {this.props.receiver===undefined ? null : this.props.receiver.name}
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    receiver: state.getChat.receiver,
  };
};

export default connect(mapStateToProps, null)(Status);
