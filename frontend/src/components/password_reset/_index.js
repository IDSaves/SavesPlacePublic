import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import { Block, BlockHeader, BlockFooter, BlockBody } from '../_help/_index'
import { sendPasswordCode } from '../../modules/user/_index'
import { Helmet } from 'react-helmet'
import Nav from './nav'
import './index.css'

class Password extends Component{

  state = {
    email: '',
    error: ''
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  sendCode = () => {
    this.setState({error: ''})
    const { email } = this.state
    if (!email){
      this.setState({error: 'Empty field.'})
    }
    else if(!EmailValidator.validate(email)){
      this.setState({error: 'Invalid email.'})
    }
    else{
      this.props.sendPasswordCode({
        email: email
      })
    }
  }

  render(){
    const { error } = this.state
    console.log(error);
    const { send_password_reset_code, send_password_reset_code_loading } = this.props.UserReducer
    if (localStorage.getItem('auth_id') && localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else{
      return(
        <div className="row mt-4 mb-4">
          <Helmet>
            <title>Password Reset - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3">
            <Block className="p-3 text-center">

              <Nav />

              {error ? (
                <p className="mb-2 text-danger">{error}</p>
              ) : ''}

              {send_password_reset_code ? send_password_reset_code.error ? (
                <p className="mb-2 text-danger">{send_password_reset_code.error}</p>
              ) : '' : ''}

              <h4 className="mb-3">Reset password</h4>
              <div className="row text-left">
                <div className="col-lg-8 offset-lg-2 set">
                  <b><span>EMAIL</span></b>
                  <input type="text" className="set-input mb-2 p-2" placeholder="Email" name="email" onChange={this.handleInputs}/>
                </div>
                <div className="col-lg-8 offset-lg-2 mt-3">
                  {
                    !send_password_reset_code_loading
                    ?
                    send_password_reset_code && send_password_reset_code === "Email has been sent!"
                    ?
                    (<button className="btn btn-success mb-2 container-fluid" type="button" id="button-addon2">Email has been sent!</button>)
                    :
                    (<button className="btn btn-info mb-2 container-fluid" type="button" id="button-addon2" onClick={this.sendCode}>Reset</button>)
                    :
                    (<button className="btn btn-secondary mb-2 container-fluid" type="button" id="button-addon2">Sending...</button>)
                  }
                </div>
              </div>

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

export default withRouter(connect(mapStateToProps, { sendPasswordCode })(Password))
