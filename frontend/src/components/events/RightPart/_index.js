import React, { Component } from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'
import { Link } from 'react-router-dom'
import MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css'


export default class RightPart extends Component{

  render(){
    const { view_data, submit_data, page, handleCheckBox, handleDate, submit, available_years, order_rating, handleRating } = this.props
    return(
      <div>
        <Link to={{ pathname: "/events", search: `?page=${page}&only_year=${submit_data.only_year}&year=${submit_data.year}&month=${submit_data.month}&order_rating=${submit_data.order_rating}` }} onClick={submit}>
          <Block className="blue-block mb-3">
            <BlockBody className="text-center text-white">
              <h5 className="m-0">Search</h5>
            </BlockBody>
          </Block>
        </Link>

        <Block className="mb-3">
          <BlockHeader className="text-center">
            <h5>Choose Date</h5>
          </BlockHeader>
          <BlockBody className="choose-date-body">

            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="customCheck" name="only_year" defaultChecked={submit_data.only_year === 'yes' ? true : false} onClick={handleCheckBox} />
              <label className="custom-control-label" htmlFor="customCheck">Whole year</label>
            </div>

            <MonthPickerInput year={2019} onChange={(maskedValue, selectedYear, selectedMonth) => handleDate(maskedValue, selectedYear, selectedMonth)} closeOnSelect={true} />

          </BlockBody>
        </Block>

        <div onClick={handleRating} className="handleRating">
          <Block className="mb-3">
            <BlockHeader className="text-center">
              <h4 className="mb-0">{submit_data.order_rating === 'up' ? <i className="fas fa-arrow-up text-success" /> : submit_data.order_rating === 'down' ?  <i className="fas fa-arrow-down text-danger" /> : <i className="fas fa-minus" />} Order by rating</h4>
            </BlockHeader>
          </Block>
        </div>

        <Block className="mb-3">
          <BlockHeader className="text-center">
            All Available Years
          </BlockHeader>
          <BlockBody className="text-center">
            <button type="button" className="btn btn-sm btn-info container-fluid" data-toggle="modal" data-target="#myModal">
              Open
            </button>

            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">All Available Years</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>

                  <div className="modal-body pb-0">
                    {available_years ? available_years.map((year, i) => (
                      <a className="available-year mb-3" href={`/events?page=1&only_year=yes&year=${year}`} key={i}>{year}</a>
                    )) : ''}
                  </div>

                </div>
              </div>
            </div>

          </BlockBody>
        </Block>

      </div>
    )
  }
}
