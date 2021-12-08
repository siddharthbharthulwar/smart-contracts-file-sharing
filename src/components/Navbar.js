import React, { Component } from 'react';
import box from '../box.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark p-0">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
        >
          <img src={box} width="30" height="30" className="align-top" alt="" />
          DStorage - The Blockchain Storage App
        </a>
        <ul className="navbar-nav px-3">
          <b className='text-white'>{this.props.account} with {this.props.num} blocks</b>
        </ul>
      </nav>
    );
  }
}

export default Navbar;