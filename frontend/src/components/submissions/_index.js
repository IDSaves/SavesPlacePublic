import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../_help/_index.js'
import LeftPart from './LeftPart/_index'
import RightPart from './RightPart/_index'
import { searchSubmissions } from '../../modules/event/_index'
import { Helmet } from 'react-helmet'
import './index.css'

class Events extends Component{

  constructor(props){
    super(props)

    const params = (name) => {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
      if (results==null){
         return null
      }
      else{
         return decodeURI(results[1]) || 0
      }
    }

    // let params = new URLSearchParams(this.props.location.search)

    this.state = {
      order_rating: params("order_rating") ? params("order_rating") : 'no',
      page: params("page") ? params("page") : 1
    }

  }

  componentDidMount(){
    const { order_rating, page } = this.state
    this.props.searchSubmissions({
      order_rating: order_rating,
      page: page
    })
  }

  submit = () => {
    const { order_rating, page } = this.state
    this.props.searchSubmissions({
      order_rating: order_rating,
      page: page
    })
  }

  handleRating = () => {
    const { order_rating } = this.state
    this.setState({order_rating: order_rating === 'up' ? 'down' : order_rating === 'down' ? 'no' : 'up'})
    console.log(this.state.order_rating);
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      page: pageNumber
    })
    const { page, order_rating } = this.state
    this.props.history.push({
      pathname: '/submissions',
      search: `?order_rating=${order_rating}&page=${pageNumber}`
    })
    this.props.searchSubmissions({
      order_rating: order_rating,
      page: pageNumber
    })
  }

  render(){
    const { order_rating, page } = this.state
    const { search_submissions, search_submissions_loading } = this.props.EventReducer
    return(
      <div className="container-fluid">
        <Helmet>
          <title>Submissions - SavesPlace</title>
        </Helmet>
        <div className="row">
          <div className="col-lg-9">
            <LeftPart page={page} search_submissions={search_submissions} search_submissions_loading={search_submissions_loading} handlePageChange={this.handlePageChange}/>
          </div>
          <div className="col-lg-3">
            <RightPart order_rating={order_rating} handleRating={this.handleRating} page={page} submit={this.submit}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { searchSubmissions })(Events))
