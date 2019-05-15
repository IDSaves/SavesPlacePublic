import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { check_token } from './modules/auth/_index'
import { setLoadingBar } from './modules/loading_bar/_index'

import { CookieAccept } from './components/cookies/_index'

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

import Header from './components/header/_index'
import Footer from './components/footer/_index'
import Router from './router'

class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('auth_token')
    const id = localStorage.getItem('auth_id')
    if (token && id){
      this.props.check_token({
        id: id,
        token: token
      })
    }
    setTimeout(() => {
      this.props.setLoadingBar(false)
    },500)

  }

  render() {
    const { loading } = this.props.LoadingBarReducer
    return (
      <div className="App">
        <Header />

        <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 p-0 pl-2 pr-2">

          <Router />

          <Footer />

        </div>
        {!localStorage.getItem('cookies_accept') ? <CookieAccept /> : ''}

        <Loading
          show={loading}
          color="#4ABC96"
          showSpinner={false}
        />

      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { check_token, setLoadingBar })(App))
