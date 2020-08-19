import React, { Component } from 'react';
import axios from 'axios';
import LoginStyle from './LoginStyle.module.css'
import Alert from '@material-ui/lab/Alert';



class Login extends Component {

	constructor() {
		super();
		this.state = { showMessage: true }

	}

	/*
	 *@author sarath
	 *@description Validate the user.
	*/
	
	handleSubmit = (event) => {
		event.preventDefault();
		axios.get('http://localhost:9000/user?email=' + this.email.value + '&password=' + this.password.value).then(response => {
			if (response.status !== 200)
				throw Error(response.statusText);
			return response;
		}).then(results => {
			if (results.data.length > 0) {
				sessionStorage.setItem('email', this.email.value);
				this.setState({ showMessage: 'Redirecting to Dashboard...' });
				setTimeout(() => {
					this.props.history.push('/OnlineIndex');
					window.location.reload(false);
				}, 1000);
			}
			else {
				this.setState({ showMessage: 'Invalid User' });
			}
		}).catch(error => {
			console.log(error);
		});
	}
	render() {
		return (
			<div className={LoginStyle.body}>
				<form className={LoginStyle.form} id='login'>
					<h2 className={LoginStyle.h2}>Login</h2>
					<input type='text' placeholder='Enter Email' name='username' ref={(email) => this.email = email} /> <br />
					<input type='password' placeholder='Enter Password' ref={(password) => this.password = password} /> <br />
					<input type='submit' className={LoginStyle.button} value='Login' onClick={this.handleSubmit} /> <br />
					<input type='button' className={LoginStyle.button} value='Register' onClick={() => { this.props.history.push('/registration'); }} /><br />
					<span className={LoginStyle.span}>{this.state.showMessage != null ? this.state.showMessage : ''}</span>

				</form>
			</div>
		)
	}
}

export default Login;