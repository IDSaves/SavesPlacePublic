import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter, EventView } from '../_help/_index.js'
import { loadEvent, loadYourVote, setYourVote, acceptSubmission, rejectSubmission } from '../../modules/event/_index'
import { Helmet } from 'react-helmet'
import RightPart from './right_part'

import './index.css'

class Event extends Component{

  componentDidMount(){
    this.props.loadEvent(this.props.match.params.id)
    if (localStorage.getItem('auth_token') && localStorage.getItem('auth_id')){
      this.props.loadYourVote({
        auth_token: localStorage.getItem('auth_token'),
        auth_id: localStorage.getItem('auth_id'),
        event_id: this.props.match.params.id
      })
    }
  }

  setVote = (vote) => {
    this.props.setYourVote({
      auth_token: localStorage.getItem('auth_token'),
      auth_id: localStorage.getItem('auth_id'),
      event_id: this.props.match.params.id,
      vote_type: vote
    }, vote)
  }

  acceptThis = () => {
    this.props.acceptSubmission({
      auth_token: localStorage.getItem('auth_token'),
      auth_id: localStorage.getItem('auth_id'),
      event_id: this.props.match.params.id
    })
  }

  rejectThis = () => {
    this.props.rejectSubmission({
      auth_token: localStorage.getItem('auth_token'),
      auth_id: localStorage.getItem('auth_id'),
      event_id: this.props.match.params.id
    })
  }

  render(){
    const { id } = this.props.match.params
    const { event_data, event_data_loading, your_vote, accept_submission, accept_submission_loading, reject_submission, reject_submission_loading, } = this.props.EventReducer
    const { u_data } = this.props.AuthReducer
    return(
      <div className="event mb-5">
          <Helmet>
            <title>
              {event_data ? !event_data.error ? (
                `${event_data.title} - SavesPlace`
              ) : (
                `Event #${this.props.match.params.id} - SavesPlace`
              ) :
                `Event #${this.props.match.params.id} - SavesPlace`
              }
            </title>
            <meta name="description" content={
              event_data ? !event_data.error ? 
                event_data.title :
                `SavesPlace Event` :
                `SavesPlace Event`
             } />
          </Helmet>
          {event_data ? event_data.error ? (
            <Block className="p-3 text-danger text-center">
              <h3 className="mb-0">Something went wrong! :(</h3>
            </Block>
          ) : (
            <div className="row">
              {!event_data_loading ? <EventView
                datas={event_data && !event_data.error ? event_data.datas : []}
                title={event_data && !event_data.error ? event_data.title : ''}/> : (
                <div className="col-lg-7 col-md-7 offset-lg-1 offset-md-1 text-center">
                  <Block className="p-1 text-center">
                    <h5 className="mb-0">Loading...</h5>
                  </Block>
                </div>
              )}

              {!event_data_loading ? <RightPart
                u_data={u_data}
                acceptThis={this.acceptThis}
                rejectThis={this.rejectThis}
                accept_submission={accept_submission}
                reject_submission={reject_submission}
                event_data={event_data && !event_data.error ? event_data : []}
                your_vote={your_vote}
                setVote={this.setVote}/> : (
                <div className="col-lg-3 col-md-3">
                  <div className="row">
                    <div className="col-12 text-center mb-3">
                      <Block className="p-1 text-center">
                        <h5 className="mb-0">Loading...</h5>
                      </Block>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : ''}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { loadEvent, loadYourVote, setYourVote, acceptSubmission, rejectSubmission })(Event))
