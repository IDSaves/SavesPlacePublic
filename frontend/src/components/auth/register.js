import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { register, log_error } from '../../modules/auth/_index'
import { Block, BlockHeader, BlockBody, BlockFooter } from '../_help/_index'
import * as EmailValidator from 'email-validator'
import { Helmet } from 'react-helmet'

class Auth extends Component{

  state = {
    login: '',
    email: '',
    pass: '',
    pass2: ''
  }

  handleInputs = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  submitRegister = (e) => {
    const { login, email, pass, pass2 } = this.state
    e.preventDefault()
    if (!login || !email || !pass || !pass2){
      this.props.log_error({error: 'Empty fields.'})
    }
    else if (!EmailValidator.validate(email)){
      this.props.log_error({error: "Invalid email address."})
    }
    else if (login.length < 4 || login.length > 15){
      this.props.log_error({error: 'Your login length should be at least 4 and less than 15.'})
    }
    else if (login.includes(' ')){
      this.props.log_error({error: 'Your login should be a single word.'})
    }
    else if (pass != pass2){
      this.props.log_error({error: "Passwords don't match."})
    }
    else if (pass2.length < 6 || pass2.length > 25){
      this.props.log_error({error: 'Your password length should be more than 6 and less than 25.'})
    }
    else{
      this.props.register({
        email: email,
        login: login,
        password: pass2
      })
    }
  }

  render(){
    const { login, email, pass, pass2 } = this.state
    const { data, loading } = this.props.AuthReducer

    if (localStorage.getItem('auth_id') && localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else{
      return(
        <div className="row mt-4">
          <Helmet>
              <title>Register - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
            <Block>
              <BlockHeader className="text-center">
                <h4 className="m-0">{emoji(('👋 Sign up to SavesPlace 👋'))}</h4>
              </BlockHeader>

              <BlockBody>
                <p className={`text-center mb-0 mt-1 ${!loading ? 'text-danger' : '' }`}>{!loading ? data ? data.error ? data.error : '' : '' : 'Loading...'}</p>
                <form className="p-3">
                  <div className="form-group">
                    <label htmlFor="login">Username</label>
                    <input type="login" className="form-control" id="login" onChange={this.handleInputs} value={login}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={this.handleInputs} value={email}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" className="form-control" id="pass" onChange={this.handleInputs} value={pass}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass2">Confirm password</label>
                    <input type="password" className="form-control" id="pass2" onChange={this.handleInputs} value={pass2}/>
                  </div>
                  <button type="submit" className="container-fluid btn btn-primary" onClick={this.submitRegister}>Register</button>
                </form>
              </BlockBody>

              <BlockFooter className="text-center">
                <p className="m-0">You already have an account? <a href="/login">Login!</a></p>
                <p className="mt-1 mb-0">Or go <a href="/">back...</a></p>
              </BlockFooter>
            </Block>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { register, log_error })(Auth))
