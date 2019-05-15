import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as EmailValidator from 'email-validator'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../_help/_index.js'
import { setSettings, clearSettingData, sendConfirmationCode, confirmEmail } from '../../modules/user/_index'
import { check_token } from '../../modules/auth/_index'
import Nav from './nav'
import Avatar from './avatar'
import Inputs from './inputs'
import Avas, { av_arr }  from './avas'
import { Helmet } from 'react-helmet'
import './index.css'

class Settings extends Component{

  state = {
    nickname: -1,
    status: -1,
    email: -1,
    avatar: -1,

    code: '',
    code_error: '',

    showAvas: false,
    error: null
  }

  componentDidMount(){
    this.props.clearSettingData()
    const token = localStorage.getItem('auth_token')
    const id = localStorage.getItem('auth_id')
    if (token && id){
      this.props.check_token({
        id: id,
        token: token
      })
    }
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAvas = () => {
    this.setState({showAvas: !this.state.showAvas})
  }

  chooseAvatar = (av) => {
    this.setState({avatar: av, showAvas: false})
  }

  submitSettings = () => {
    this.setState({error: null})
    const { nickname, status, email, avatar } = this.state
    let error_arr = {}
    if (nickname === -1 && status === -1 && email === -1 && avatar === -1) this.setState({error: "Nothing's changed!"})
    else{
      if (nickname !== -1 && (nickname.length < 4 || nickname.length > 15)) error_arr.nickname = 'Your login length should at least 4 and should not be more than 15!'
      if (status !== -1 && (status.length > 70)) error_arr.status = 'Your status should not be more than 70!'
      if (email !== -1 && (!EmailValidator.validate(email))) error_arr.email = 'Email is not valid!'

      if (!error_arr.nickname && !error_arr.status && !error_arr.email){
        console.log(1);
        this.props.setSettings({
          auth_id: localStorage.getItem('auth_id'),
          auth_token: localStorage.getItem('auth_token'),
          nickname: nickname,
          status: status,
          email: email,
          avatar: avatar
        })
      }
      else{
        this.setState({error: error_arr})
      }
    }
  }

  sendCode = () => {
    this.props.sendConfirmationCode({
      auth_id: localStorage.getItem('auth_id'),
      auth_token: localStorage.getItem('auth_token'),
    })
  }

  submitCode = () => {
    this.setState({code_error: ''})
    const { code } = this.state
    if (!code || code.length !== 4){
      this.setState({code_error: 'Invalid code!'})
      console.log(1);
    }
    else{
      this.props.confirmEmail({
        auth_id: localStorage.getItem('auth_id'),
        auth_token: localStorage.getItem('auth_token'),
        code: code
      })
    }
  }

  render(){
    const { u_data } = this.props.AuthReducer
    const { settings_data, confirmation_data, confirmation_data_loading, confirmation_code_data, confirmation_code_data_loading } = this.props.UserReducer
    const { showAvas, avatar, error, code_error } = this.state
    if (!localStorage.getItem('auth_id') && !localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else  if (!u_data){
      return(<div></div>)
    }
    else{
      console.log(this.state);
      return(
        <div className="row mt-4 mb-4">
          <Helmet>
            <title>Settings - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3">
            {!u_data.email_is_confirmed ? (
              <Block className="text-center p-2 mb-3">
                <h5 className="mb-3">Confirm your email address</h5>
                <div className="email-confirmation">

                  {
                    !confirmation_data_loading
                    ?
                    confirmation_data === 'Email has been sent!'
                    ?
                    (<button className="btn btn-success mb-2 container-fluid" type="button" id="button-addon2">Code has been sent!</button>)
                    :
                    (<button className="btn btn-info mb-2 container-fluid" type="button" id="button-addon2" onClick={this.sendCode}>Send confirmation code</button>)
                    :
                    (<button className="btn btn-secondary mb-2 container-fluid" type="button" id="button-addon2">Sending...</button>)
                  }

                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Code" maxlength="4"  pattern="\d{4}" name="code" onChange={this.handleInputs}/>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="button-addon2" onClick={this.submitCode}>Send</button>
                    </div>
                  </div>

                  {code_error ? (
                    <p className="mb-0 text-danger">{code_error}</p>
                  ) : ''}

                  {confirmation_code_data ? !confirmation_code_data.error ? (
                    <p className="mb-0 text-success">{confirmation_code_data}</p>
                  ) : (
                    <p className="mb-0 text-danger">{confirmation_code_data.error}</p>
                  ) : ''}

                </div>
              </Block>
            ) : ''}

            <Block className="p-3 text-center">

              <Nav submitSettings={this.submitSettings}/>

              {error === "Nothing's changed!" ? (
                <p className="text-danger text-center">{error}</p>
              ) : ''}

              {settings_data ? settings_data.error ? (
                <p className="text-danger text-center">{settings_data.error}</p>
              ) : '' : ''}

              {settings_data ? settings_data.id && settings_data.token ? (
                <p className="text-success text-center">Settings changed!</p>
              ) : '' : ''}

              <Avatar cur_avatar={u_data.avatar} set_avatar={avatar} av_arr={av_arr} handleAvas={this.handleAvas} />

              {!showAvas ? (
                <Inputs handleInputs={this.handleInputs} u_data={u_data} error={error}/>
              ) : (
                <Avas chooseAvatar={this.chooseAvatar}/>
              )}

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

export default withRouter(connect(mapStateToProps, { setSettings, check_token, clearSettingData, sendConfirmationCode, confirmEmail })(Settings))
