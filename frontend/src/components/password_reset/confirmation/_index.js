import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import { Block, BlockHeader, BlockFooter, BlockBody } from '../../_help/_index'
import { resetPassword } from '../../../modules/user/_index'
import { Helmet } from 'react-helmet'
import Nav from '../nav'

class ConfirmPasswordReset extends Component{

  state = {
    psw: '',
    cpsw: '',

    error: ''
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  reset = () => {
    let params = new URLSearchParams(this.props.location.search)
    this.setState({error: ''})
    const { psw, cpsw } = this.state
    if (!psw || !cpsw){
      this.setState({error: 'Empty fields.'})
    }
    else if(psw !== cpsw){
      this.setState({error: 'Passwords does not match.'})
    }
    else if(psw.length < 6 || psw.length > 25){
      console.log(1);
      this.setState({error: 'Your password showld be more than 6 and less than 25!'})
    }
    else{
      this.props.resetPassword({
        u: params.get("u"),
        password_code: params.get("code"),
        new_password: psw
      })
    }
  }

  render(){
    const { error } = this.state
    const { reset_password, reset_password_loading } = this.props.UserReducer
    if (localStorage.getItem('auth_id') && localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else{
      return(
        <div className="row mt-4 mb-4">
          <Helmet>
            <title>Password Reset Confirmation - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3">
            <Block className="p-3 text-center">

              <Nav />

              {error ? (
                <p className="mb-2 text-danger">{error}</p>
              ) : ''}

              {reset_password ? reset_password.error ? (
                <p className="mb-2 text-danger">{reset_password.error}</p>
              ) : '' : ''}

              <h4 className="mb-3">Reset password</h4>
              <div className="row text-left">

                <div className="col-lg-8 offset-lg-2 set">
                  <b><span>New password</span></b>
                  <input type="password" className="set-input mb-2 p-2" placeholder="Password" name="psw" onChange={this.handleInputs}/>
                </div>

                <div className="col-lg-8 offset-lg-2 set">
                  <b><span>Confirm new password</span></b>
                  <input type="password" className="set-input mb-2 p-2" placeholder="Password" name="cpsw" onChange={this.handleInputs}/>
                </div>

                <div className="col-lg-8 offset-lg-2 mt-3">
                {
                  !reset_password_loading
                  ?
                  reset_password && reset_password === 'You have successfully changed your password!'
                  ?
                  (<button className="btn btn-success mb-2 container-fluid" type="button" id="button-addon2">Success!</button>)
                  :
                  (<button className="btn btn-info mb-2 container-fluid" type="button" id="button-addon2" onClick={this.reset}>Reset</button>)
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

export default withRouter(connect(mapStateToProps, { resetPassword })(ConfirmPasswordReset))
