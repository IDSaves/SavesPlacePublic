import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../_help/_index.js'
import { loadStats } from '../../modules/stats/_index'
import { loadAvailableYears } from '../../modules/event/_index'
import { Helmet } from "react-helmet"

import Logo from '../../images/Logo11.svg'
import './index.css'

class About extends Component{

  componentDidMount(){
    this.props.loadStats()
    this.props.loadAvailableYears()
  }

  render(){
    const { stats } = this.props.StatsReducer
    const { available_years } = this.props.EventReducer
    return(
      <Block>
        <Helmet>
            <title>About - SavesPlace</title>
        </Helmet>

        <BlockHeader className="text-center p-3">
          <img className="about-logo mb-3" src={Logo}/>
          <h2 className="mb-0">About The SavesPlace</h2>
        </BlockHeader>
        <BlockBody className="p-2">

          <div className="row">
            <div className="col-lg-10 offset-lg-1">

              <div className="text-center mt-1 pb-2">
                <h4 className="mb-0">
                  The SavesPlace is the website where important and not-so events are collected.
                  It's where you'll find the most interesting events for such a period of time.
                  Anyone can join to share cool stuff and vote the most important to the top.
                </h4>
              </div>

              <hr className="mt-1 mb-1"/>

              <div className="text-center pt-2">
                <h4 className="mb-2">There are currently 8 types of events:</h4>
                <span className="d-inline-block event-type-about mem pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Meme</span>
                <span className="d-inline-block event-type-about wor pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">World</span>
                <span className="d-inline-block event-type-about spt pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Sport</span>
                <span className="d-inline-block event-type-about art pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Art</span>
                <span className="d-inline-block event-type-about mus pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Music</span>
                <span className="d-inline-block event-type-about sci pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Science</span>
                <span className="d-inline-block event-type-about gam pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Gaming</span>
                <span className="d-inline-block event-type-about mda pt-1 pb-1 pl-2 pr-2 mr-2 mb-2 text-white">Media</span>
              </div>

              <hr className="mt-1 mb-1"/>

              <div className="text-center p-2">
                <h4 className="mb-3">And {stats ? stats.events : 0} events occurred in these years:</h4>
                {available_years ? available_years.map((year, i) => (
                  <a className="available-year mb-3" href={`/events?page=1&only_year=yes&year=${year}`} key={i}>{year}</a>
                )) : ''}
              </div>


            </div>
          </div>

        </BlockBody>
      </Block>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { loadStats, loadAvailableYears })(About))
