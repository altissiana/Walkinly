import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Contacts extends Component {
  state = {
    name: "",
    phoneNumber: ""
  };
  componentDidMount() {
    getContacts();
  }
  render() {
    return (
      <div className="contactList">
        <h1> Emergency Contacts</h1>
        <nav>
          <ul>
            <li>
              Name: {}
              Phone Number:
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
