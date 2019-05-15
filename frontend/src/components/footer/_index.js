import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Footer extends Component{
  render(){
    const loc = this.props.location.pathname
    if (loc !== '/login' && loc !== '/register' && loc !== '/settings' && loc !== '/settings/password' && loc !== '/password-reset' && loc !== '/password_reset_confirm'){
      return(
        <div className="container-fluid footer mb-4 mt-5">
          <hr/>
            <div className="row">

              <div className="col-sm-3 text-center p-0">
                <small>© 2019 SavesPlace</small>
              </div>

              <div className="col-sm-3 text-center p-0">
                <small>team@savesplace.com</small><br/>
                <small>help@savesplace.com</small>
              </div>

              <div className="col-sm-3 text-center p-0">
                <small><Link to="/about">About</Link></small><br/>
                <small><Link to="/cookies_policy">Cookies Policy</Link></small>
              </div>

              <div className="col-sm-3 text-center p-0">
                <small><a href="https://twitter.com/SavesPlaceCom" target="_blank">Twitter</a></small><br/>
                <small><a href="https://discord.gg/KQSNnfw" target="_blank">Discord</a></small>
              </div>

          </div>
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

export default withRouter(connect(mapStateToProps)(Footer))
