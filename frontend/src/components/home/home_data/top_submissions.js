import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadTopSubmissions } from '../../../modules/event/_index'
import { Block, BlockHeader, BlockFooter, BlockBody, Event } from '../../_help/_index'

import '../index.css'

class TopSubmissions extends Component{

  componentDidMount(){
    this.props.loadTopSubmissions()
  }

  render(){
    const { top_submissions } = this.props.EventReducer
    console.log('Top:', top_submissions);
    return(
      <Block className="mb-3">
        <BlockHeader className="text-center">
          <h5 className="m-0">Top Submissions</h5>
        </BlockHeader>
        <BlockBody>
          <div className="row p-0">
            {top_submissions.length !== 0 && !top_submissions.error ? top_submissions.map((event, i) => (
                <Event
                  type={event.type}
                  id={event.id}
                  thumbnail={event.thumbnail}
                  thumb_color={event.thumb_color}
                  title={event.title}
                  event_date={event.event_date}
                  author={event.author}
                  rating={event.rating}
                  key={i}/>
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

export default withRouter(connect(mapStateToProps, { loadTopSubmissions })(TopSubmissions))
