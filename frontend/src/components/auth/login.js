import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { login, log_error } from '../../modules/auth/_index'
import { Block, BlockHeader, BlockFooter, BlockBody } from '../_help/_index'
import { Helmet } from 'react-helmet'
import './index.css'

class Auth extends Component{

  state = {
    login_email: '',
    pass: ''
  }

  componentDidMount(){
    document.title = "Login"
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitLogin = (e) => {
    const { login_email, pass } = this.state
    e.preventDefault()
    console.info(login_email, pass)
    if (!login_email || !pass){
      this.props.log_error({error: 'Empty fields!'})
    }
    else{
      this.props.login({
        login_email: login_email,
        password: pass
      })
    }
  }

  render(){
    const { login_email, pass } = this.state
    const { data, loading } = this.props.AuthReducer

    if (localStorage.getItem('auth_id') && localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else{
      return(
        <div className="row mt-4">
          <Helmet>
              <title>Login - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
            <Block>
              <BlockHeader className="text-center">
                <h4 className="m-0">{emoji(('👋 Login to SavesPlace 👋'))}</h4>
              </BlockHeader>

              <BlockBody>
                <p className={`text-center mb-0 mt-1 ${!loading ? 'text-danger' : '' }`}>{!loading ? data ? data.error ? data.error : '' : '' : 'Loading...'}</p>
                <form className="p-3">
                  <div className="form-group">
                    <label htmlFor="login">Username or email address</label>
                    <input type="login" className="form-control" id="login" name="login_email" onChange={this.handleInputs} value={login_email}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" className="form-control" id="pass" name="pass" onChange={this.handleInputs} value={pass}/>
                  </div>
                  <button type="submit" className="container-fluid btn btn-primary" onClick={this.submitLogin}>Login</button>
                  <Link className="btn btn-sm btn-link mt-2" to="/password-reset">Forgot your password?</Link>
                </form>
              </BlockBody>

              <BlockFooter className="text-center">
                <p className="m-0">You don't have an account? <Link to="/register">Create it!</Link></p>
                <p className="mt-1 mb-0">Or go <Link to="/">back...</Link></p>
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

export default withRouter(connect(mapStateToProps, { login, log_error })(Auth))
