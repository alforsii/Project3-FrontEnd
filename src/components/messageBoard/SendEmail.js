import React, { Component } from 'react';
import axios from 'axios';

export class SendEmail extends Component {
  state = {};

  //Handle send message submit
  handleSubmit(event) {
    const messageHtml = renderEmail(
      <MyEmail name={this.state.name}> {this.state.feedback}</MyEmail>
    );
    axios({
      method: 'POST',
      url: 'http://localhost:3000/send',
      data: {
        name: this.state.name,
        email: this.state.email,
        messageHtml: messageHtml,
      },
    }).then(response => {
      if (response.data.msg === 'success') {
        alert('Email sent, awesome!');
        this.resetForm();
      } else if (response.data.msg === 'fail') {
        alert('Oops, something went wrong. Try again');
      }
    });
  }

  //Reset state
  resetForm(){
    this.setState({feedback: ''});
}

  render() {
    return <div></div>;
  }
}

export default SendEmail;
