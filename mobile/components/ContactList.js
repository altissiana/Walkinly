import React, { Component } from "react";
import { BerowserRouter as Router, Route, Link } from "react-router-dom";

class Contacts extends Component {
  render() {
    return (
      <div className="contactList">
        <h1> Emergency Contacts</h1>
        <nav>
          <ul>
            <li>Name: Phone Number: Email:</li>
          </ul>
        </nav>
      </div>
    );
  }
}
