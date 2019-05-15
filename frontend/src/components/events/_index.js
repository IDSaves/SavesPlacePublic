import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../_help/_index.js'
import LeftPart from './LeftPart/_index'
import RightPart from './RightPart/_index'
import { searchEvents, loadAvailableYears } from '../../modules/event/_index'
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
    const date = new Date()
    const month = date.getMonth()
    const year = date.getYear()

    this.state = {
      view_data: {
        only_year: params("only_year") ? params("only_year") : 'yes',
        year: params("year") ? params("year") : year + 1900,
        month: params("month") ? params("month") : month + 1,
        order_rating: params("order_rating") ? params("order_rating") : 'down'
      },
      submit_data: {
        only_year: params("only_year") ? params("only_year") : 'yes',
        year: params("year") ? params("year") : year + 1900,
        month: params("month") ? params("month") : month + 1,
        order_rating: params("order_rating") ? params("order_rating") : 'down'
      },
      page: params("page") ? params("page") : 1
    }

  }

  componentDidMount(){
    this.props.searchEvents({
      only_year: this.state.submit_data.only_year,
      year: this.state.submit_data.year,
      month: this.state.submit_data.month,
      order_rating: this.state.submit_data.order_rating,
      page: this.state.page
    })
    this.props.loadAvailableYears()
  }

  handleCheckBox = (e) => {
    this.setState({
      submit_data: {
        only_year: this.state.submit_data.only_year == 'yes' ? 'no' : 'yes',
        year: this.state.submit_data.year,
        month: this.state.submit_data.month,
        order_rating: this.state.submit_data.order_rating
      }
    })
  }

  handleDate = (maskedValue, selectedYear, selectedMonth) => {
    this.setState({
      submit_data: {
        only_year: this.state.submit_data.only_year,
        year: selectedYear,
        month: selectedMonth + 1,
        order_rating: this.state.submit_data.order_rating
      }
    })
  }

  submit = () => {
    this.setState({
      view_data: {
        only_year: this.state.submit_data.only_year,
        year: this.state.submit_data.year,
        month: this.state.submit_data.month,
        order_rating: this.state.submit_data.order_rating,
      }
    })
    this.props.searchEvents({
      only_year: this.state.submit_data.only_year,
      year: this.state.submit_data.year,
      month: this.state.submit_data.month,
      order_rating: this.state.submit_data.order_rating,
      page: this.state.page,
    })
  }

  handleRating = () => {
    const { order_rating } = this.state.submit_data
    this.setState({
      submit_data: {
        only_year: this.state.submit_data.only_year,
        year: this.state.submit_data.year,
        month: this.state.submit_data.month,
        order_rating: order_rating === 'up' ? 'down' : order_rating === 'down' ? 'no' : 'up'
      }
    })
    console.log(order_rating);
  }

  handlePageChange = (pageNumber) => {
    if (!pageNumber) pageNumber = 1
    this.setState({
      page: pageNumber
    })
    const { page, submit_data } = this.state
    this.props.history.push({
      pathname: '/events',
      search: `?page=${pageNumber}&only_year=${submit_data.only_year}&year=${submit_data.year}&month=${submit_data.month}`
    })
    this.props.searchEvents({
      only_year: submit_data.only_year,
      year: submit_data.year,
      month: submit_data.month,
      page: pageNumber
    })
  }

  render(){
    const { view_data, submit_data, page } = this.state
    const { search_data, search_loading, available_years } = this.props.EventReducer
    return(
      <div className="container-fluid">
        <Helmet>
          <title>
            {view_data.only_year ===  'yes' ?
              `${view_data.year} Year Events - SavesPlace` :
              `${view_data.year}.${view_data.month <= 9 ? `0${view_data.month}` : view_data.month} Events - SavesPlace`
            }
          </title>
          <meta name="description" content={
            view_data.only_year ===  'yes' ? (
              `${view_data.year} Year Events`
            ) : (
              `${view_data.year}.${view_data.month <= 9 ? `0${view_data.month}` : view_data.month} Events`
          )}/>
        </Helmet>
        <div className="row">
          <div className="col-lg-9">
            <LeftPart
              search_data={search_data}
              search_loading={search_loading}
              view_data={view_data}
              submit_data={submit_data}
              handlePageChange={this.handlePageChange}
              page={page}/>
          </div>
          <div className="col-lg-3">
            <RightPart
              view_data={view_data}
              submit_data={submit_data}
              page={page}
              handleCheckBox={this.handleCheckBox}
              handleDate={this.handleDate}
              submit={this.submit}
              available_years={available_years}
              handleRating={this.handleRating}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { searchEvents, loadAvailableYears })(Events))
