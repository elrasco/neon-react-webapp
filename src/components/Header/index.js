import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";

class Header extends Component {
  render() {
    return (
      <Flex className="Header">
        <Link to={"/"}>
          <Flex className="logo" justify="start">
            <img className="logoImg" src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/shark_logo.svg" alt="" />
          </Flex>
          <Flex className="bar" />
        </Link>
      </Flex>
    );
  }
}

export default Header;
