import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar
          light
          expand="md"
          className="pr-5 pt-3 pb-3"
          style={{ backgroundColor: "#6c63ff" }}
        >
          <NavbarBrand className="pl-5 text-white" href="/">
            Autosurance
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/*               <NavItem>
                <NavLink className="text-white" href="/">
                  Features
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" href="/">
                  Solution
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="mr-3 text-white" href="/dashboard">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavLink
                href="/form"
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              >
                <span
                  style={{ color: "#6c63ff" }}
                  className="font-weight-bold pl-2 pr-2"
                >
                  Sign Up
                </span>
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
