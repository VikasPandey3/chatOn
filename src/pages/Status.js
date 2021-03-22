import React, { Component } from "react";
import { connect } from "react-redux";

class Status extends Component {
  
  render() {
    console.log(this.props.receiver)
    return (
      <header
      className="flex bg-red-400 border-l-2 flex-baseline w-full content-center justify-between px-4 py-3 relative"
      style={{ height: "59px", 
      zIndex: "1000", 
      flex: "none" }}
    >
      <div>{this.props.receiver===undefined ? null : this.props.receiver.name}</div>
    </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    receiver: state.getChat.receiver,
  };
};

export default connect(mapStateToProps, null)(Status);
