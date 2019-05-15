import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'
import { changePassword, clearPasswordData } from '../../../modules/user/_index'
import { Helmet } from 'react-helmet'
import Nav from './nav'

class PasswordSettings extends Component{

  state = {
    cur_pass: '',
    new_pass: '',
    c_new_pass: '',

    error: null
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  changePassword = () => {
    this.setState({error: null})
    this.props.clearPasswordData()
    const { cur_pass, new_pass, c_new_pass } = this.state
    if (cur_pass && new_pass && c_new_pass){
      if (new_pass !== c_new_pass){
        this.setState({error: 'New passwords does not match.'})
      }
      else{
        this.props.changePassword({
          auth_id: localStorage.getItem('auth_id'),
          auth_token: localStorage.getItem('auth_token'),
          cur_passw: cur_pass,
          passw: new_pass
        })
      }
    }
    else{
      this.setState({error: 'Empty fields.'})
    }
  }

  render(){
    const { cur_pass, new_pass, c_new_pass, error } = this.state
    const { password_set, password_set_loading } = this.props.UserReducer
    if (!localStorage.getItem('auth_id') && !localStorage.getItem('auth_token')){
      window.location.href = '/'
      return(<div></div>)
    }
    else{
      return(
        <div className="row mt-4 mb-4">
          <Helmet>
            <title>Password Settings - SavesPlace</title>
          </Helmet>
          <div className="col-lg-6 offset-lg-3">

            <Block className="p-3 text-center">
              <Nav changePassword={this.changePassword} />

              {error ? (
                <p className="text-danger text-center mb-0">{error}</p>
              ) : ''}

              {password_set ? password_set.error ? (
                <p className="text-danger text-center mb-0">{password_set.error}</p>
              ) : '' : ''}

              {password_set ? !password_set.error ? (
                <p className="text-success text-center mb-0">{password_set}</p>
              ) : '' : ''}

              <div className="form-group text-left">
                <label htmlFor="cur_pass">Current password</label>
                <input type="password" className="form-control" id="cur_pass" name="cur_pass" onChange={this.handleInputs} value={cur_pass}/>
              </div>

              <div className="form-group text-left">
                <label htmlFor="new_pass">New password</label>
                <input type="password" className="form-control" id="new_pass" name="new_pass" onChange={this.handleInputs} value={new_pass}/>
              </div>

              <div className="form-group text-left">
                <label htmlFor="c_new_pass">Confirm new password</label>
                <input type="password" className="form-control" id="c_new_pass" name="c_new_pass" onChange={this.handleInputs} value={c_new_pass}/>
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

export default withRouter(connect(mapStateToProps, { changePassword, clearPasswordData })(PasswordSettings))
