import React from 'react';
import { history } from '../routers/AppRouter';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: props.email ? props.email : '',
      password: props.password ? props.password : '',
      error: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillMount() {
  //   const tokenStr = localStorage.getItem('token');
  //   const token = JSON.parse(tokenStr);

  //   if(token != null) {
  //     history.push('/dashboard')
  //   }
  // }

  onUsernameChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please provide username and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
          email: this.state.email,
          password: this.state.password
      });
    }
  };

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
            <input
              type="email"
              placeholder="Email"
              autoFocus
              className="text-input"
              value={this.state.email}
              onChange={this.onUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <div>
              <button className="button">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
