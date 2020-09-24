import React from 'react';
import { fakeData } from './FakeData_Signin';
import './Signin.css'

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange(e) {
    console.log(e.target.name, ":", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onClickSignin() {
    fetch('https://url....com/user/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render() {
    return (
      <div className="user Signin">
        <h2>Signin</h2>
        <div className="Signin_input">
          <input
            type="text"
            placeholder="email"
            onChange={this.onChange.bind(this)}
            value={this.state.email}
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.onChange.bind(this)}
            value={this.state.password}
            name="password"
          />
          <button
            onClick={this.onClickSignin.bind(this)}
          >Signin</button>
        </div>
      </div>
    );
  }
}