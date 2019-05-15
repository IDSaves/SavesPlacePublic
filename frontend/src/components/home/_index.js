import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadStats, loadTopUsers, countEventTypes, countEventsLast6Months } from '../../modules/stats/_index'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../_help/_index.js'
import { loadAvailableYears } from '../../modules/event/_index'
import { Helmet } from 'react-helmet'

import LastAcceptedEvents from './home_data/last_accepted_events'
import TopSubmissions from './home_data/top_submissions'
import Statistics from './stats/statistics'
import TopUsers from './stats/top_users'
import EventTypes from './stats/event_types'
import AvalableYears from './stats/available_years'
import EventsLast6Months from './home_data/events_last_6_months'
import Social from './stats/social'

import './index.css'

class Home extends Component{

  componentDidMount(){
    this.props.loadStats()
    this.props.loadTopUsers()
    this.props.countEventTypes()
    this.props.countEventsLast6Months()
    this.props.loadAvailableYears()
  }

  SubmitEvent = () => {
    if (!localStorage.getItem('auth_id') && !localStorage.getItem('auth_token')){
      window.location.href = '/login'
    }
    else{
      window.location.href = '/submit'
    }
  }

  render(){
    const { stats, top_users, event_types, events_last_6_months } = this.props.StatsReducer
    const { available_years } = this.props.EventReducer
    return(
      <div className="row">

        <Helmet>
          <title>The History of Events - SavesPlace</title>
          <meta name="description" content="The SavesPlace is the website where important and not-so events are collected. It's where you'll find the most interesting events for such a period of time." />
        </Helmet>

        <div className="col-lg-9">

          <EventsLast6Months events_last_6_months={events_last_6_months}/>

          <LastAcceptedEvents />

          <TopSubmissions />

        </div>

        <div className="col-lg-3">

          <div onClick={this.SubmitEvent}>
            <Block className="green-block submit-event-block mb-3">
              <BlockBody className="text-center text-white">
                <h5 className="m-0">Submit An Event <i className="fas fa-plus ml-2"></i></h5>
              </BlockBody>
            </Block>
          </div>

          <AvalableYears available_years={available_years}/>
          <Social />

          <Statistics stats={stats}/>

          <EventTypes event_types={event_types}/>

        </div>

      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { loadStats, loadTopUsers, countEventTypes, countEventsLast6Months, loadAvailableYears })(Home))
