import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter, Event } from '../../_help/_index.js'
import { loadLastAcceptedSubmissions } from '../../../modules/event/_index'

class LastAcceptedEvents extends Component{

  componentDidMount(){
    this.props.loadLastAcceptedSubmissions()
  }

  render(){
    const { last_accepted_submissions } = this.props.EventReducer
    return(
      <Block className="mb-3">
        <BlockHeader className="text-center">
          <h5 className="m-0">Last Accepted Events</h5>
        </BlockHeader>
        <BlockBody>
          <div className="row pt-2">
            {last_accepted_submissions.length !== 0 && !last_accepted_submissions.error ? last_accepted_submissions.map((event, i) => (
              <Event
                type={event.event_type}
                id={event.id}
                thumbnail={event.thumbnail}
                thumb_color={event.thumb_color}
                title={event.title}
                event_date={event.event_date}
                author={event.author}
                rating={event.rating}
                key={i}
                className="big"/>
            )) : (
              <div className="col-12 text-center">
                <h3 className="mb-4 mt-3">{emoji("😱 Nothing's here! 😱")}</h3>
              </div>
            )}
          </div>
        </BlockBody>
      </Block>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { loadLastAcceptedSubmissions })(LastAcceptedEvents))
