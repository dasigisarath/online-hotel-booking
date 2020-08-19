import React, { Component } from 'react';
// import './register.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LoginStyle from '../../component/login/LoginStyle.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


/**  * @author:Sarath
 *  * @description:Class Component for Register*/

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        userName: '',
        email: '',
        mobile: '',
        address: '',
        AadharNumber: '',
        password: ''
      }
    };
  }

  /**  * @author:sarath
 *  * @description:For Instance Change*/

  handleChange = (event) => {
    let users = this.state.users;
    users[event.target.name] = event.target.value;
    this.setState({ users })
  }

  /**  * @author:sarath
  @description:Button for Sumbitting*/

  handleSubmit = (event) => {
    event.preventDefault();
    let userName = this.state.users.userName;
    let email = this.state.users.email;
    let mobile = this.state.users.mobile;
    let address = this.state.users.address;
    let AadharNumber = this.state.users.AadharNumber;
    let password = this.state.users.password;


    if (userName.length !== 0 & email.length !== 0 & address.length !== 0) {
      axios.post('http://localhost:9000/user', {
        userName,
        email,
        mobile,
        address,
        AadharNumber,
        password
      })
        .then(function (response) {

          window.alert('Registered Successfully');
          window.location.reload();
        })
        .catch(function (error) {


        });

    }
    else {
      window.alert('Please Enter values in Fields')
    }
  }

  render() {
    return (
      <div className={LoginStyle.body}   >
        <form   >
          <h2 >Registration Form</h2>
          <ValidatorForm className={LoginStyle.form} style={{padding:'35px',margin:'5px'}} ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
            <TextField fullWidth margin="normal" type="text" id="outlined-basic" label="Enter Name" variant="outlined" name="userName" className="border" onChange={this.handleChange} />
            <TextValidator type="email" fullWidth label="Email" variant="outlined" onChange={this.handleChange} name="email" value={this.state.users.email} validators={['required', 'isEmail']} errorMessages={['Please enter email!', 'Enter valid email']} />
            <TextValidator margin="normal" fullWidth label="Enter Mobile" variant="outlined" onChange={this.handleChange} name="mobile" value={this.state.users.mobile} validators={['required', 'isNumber', 'matchRegexp:^[0-9]{10}$']} errorMessages={['Please enter contact!', 'Can only contain digits', 'Contact needs to be 10 digits']} />
            <TextField fullWidth type="text" id="outlined-basic" label="Enter Address" variant="outlined" name="address" className="border" onChange={this.handleChange} />
            <TextValidator margin="normal" fullWidth label="Enter Aadhar Number" variant="outlined" onChange={this.handleChange} name="AadharNumber" value={this.state.users.AadharNumber} validators={['required', 'matchRegexp:[0-9]{12}']} errorMessages={['Please enter AADHAR Number!', 'Aadhar Number(EX)-345678234567']} />
            <TextValidator fullWidth variant="outlined" type="password" label="Enter Password" onChange={this.handleChange} name="password" value={this.state.users.password} validators={['required', 'matchRegexp:(?=.*[ -/@])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$']} errorMessages={['Please enter password!', 'Password must be at least 8 characters long and must contain atleast one lowercase letter, one uppercase letter, one number and one special character']} />
            <br/>
            <Button fullWidth margin="normal" variant="contained" color="primary" onClick={this.handleSubmit}> Register </Button><br />
          Existing User? <Link to="/">Login </Link>

          </ValidatorForm>
        </form>
      </div>
    )
  }


}