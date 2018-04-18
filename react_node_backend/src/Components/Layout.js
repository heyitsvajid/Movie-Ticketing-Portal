import React, { Component } from 'react';
import axios from 'axios';
import Index from './Index';
import Header from './Header';
import Footer from './Footer';
// import SignIn from './SignIn';
// import SignUp from './SignUp';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
  }

  render() {
    debugger
    return (
    <div>
      {/* <Header /> */}
      {this.props.children}
      {/* <Footer/> */}
    </div>
    )
  }
}

export default Layout;
