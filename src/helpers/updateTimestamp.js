import { db } from "../services/firebase";
import { connect } from "react-redux";

import React, { Component } from "react";

 class UpdateTimestamp extends Component {
  shouldComponentUpdate() {
      return false;
  }
  render() {
    return null;
  }
}
const mapStateToProps = (state) => {
  console.log("prevstate");
  return {
    prevUID: state.getChat.prevUID,
    prevMessageTimestamp: state.getChat.prevMessageTimestamp,
  };
};

export default connect(mapStateToProps, null)(UpdateTimestamp);
