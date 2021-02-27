import React, { Component } from "react";
import { connect } from "react-redux";

class Status extends Component {
  
  render() {
    console.log(this.props.detail)
    return (
      <div style={{backgroundColor:'#7ed6df'}}>
        <div className='flex p-2 h-16'>
        <p className="text-black m-2">
          {this.props.detail===undefined ? null : this.props.detail.name}
          Vikas
        </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    detail: state.getChat.contactDetail,
  };
};

export default connect(mapStateToProps, null)(Status);
