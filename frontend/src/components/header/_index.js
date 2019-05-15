import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { LogOut } from '../../modules/auth/_index'
import AvatarImage from '../../images/avatar.svg'
import Logo from '../../images/Logo11.svg'
import { ConfirmEmail } from '../_help/_index'

import './index.css'

class Header extends Component{
  render(){
    const loc = this.props.location.pathname
    const { u_data } = this.props.AuthReducer
    console.log(u_data);
    let t_data, avatar, nickname = ''
    if (localStorage.getItem('auth_token') && localStorage.getItem('auth_id')){
      t_data = jwt.decode(localStorage.getItem('auth_token'), {complete: true})
      nickname = t_data.payload.user_nickname
      avatar = t_data.payload.user_avatar
    }
    if (loc !== '/login' && loc !== '/register' && loc !== '/settings' && loc !== '/settings/password' && loc !== '/password-reset' && loc !== '/password_reset_confirm'){
      return(
        <div className="container-fluid row header mb-4 m-0">
          <nav className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 navbar navbar-expand-md p-1">

            <b><Link className="navbar-brand t-text" to="/">
              <img className="logo-image mr-2" src={Logo} />
              <span className="header-title-part-1">Saves</span>
              <span className="header-title-part-2">Place</span>
            </Link></b>

            <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse text-white justify-content-start" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <b><Link className="nav-item nav-link h-text" to="/events">Events</Link></b>
                <b><Link className="nav-item nav-link h-text" to="/submissions">Submissions</Link></b>
                <b><Link className="nav-item nav-link h-text" to="/about">About</Link></b>
              </div>
            </div>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {localStorage.getItem('auth_token') && localStorage.getItem('auth_id') ?
                  (
                    <div className="dropdown" id="HeaderDrowdown">
                      <span className="h-text" id="HeaderDrowdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="headerImg mr-2 rounded-circle" src={u_data ? u_data !== 'fail' ? `https://api.savesplace.com/media/user_avatars/${avatar}.svg` : AvatarImage : AvatarImage} />
                        <b>{nickname} <i className="fas fa-angle-down"></i></b>
                      </span>

                      <div className="dropdown-menu text-center p-0" aria-labelledby="HeaderDrowdownLink">
                        <Link className="dropdown-item mt-1 hs-text" to={u_data ? `/profile/${u_data.username}` : ''}>Your Profile</Link>
                        <Link className="dropdown-item mt-1 hs-text" to="/settings">Settings</Link>
                        <Link className="dropdown-item mb-1 hs-text" to="#" onClick={() => this.props.LogOut()}><b>Sign out</b></Link>
                      </div>
                    </div>
                  )
                  :
                  <b><Link className="nav-item nav-link h-text" to="/login">Sign in / Sign up</Link></b>
                }
              </div>
            </div>


          </nav>
          {u_data ? !u_data.email_is_confirmed ? <ConfirmEmail /> : '' : ''}
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { LogOut })(Header))
