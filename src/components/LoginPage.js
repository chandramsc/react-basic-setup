import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { startLogin } from '../actions/authLogin';

export class LoginPage extends React.Component {
    onSubmit = async (user) => {
        try {
            let response = await this.props.startLogin(user)
            console.log("Login success")
            this.props.history.push('/dashboard');
        }catch(error){
            console.log("Login failed")
        }
        
    };
    render() {
        return (
            <div>
                <LoginForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (user) => dispatch(startLogin(user))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
