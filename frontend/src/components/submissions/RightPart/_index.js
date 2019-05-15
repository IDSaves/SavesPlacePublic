import React, { Component } from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'
import { Link } from 'react-router-dom'
import MonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css'


export default class RightPart extends Component{

  render(){
    const { order_rating, submit, handleRating, page } = this.props
    return(
      <div>
        <Link to={{ pathname: "/submissions", search: `?order_rating=${order_rating}&page=${page}` }} onClick={submit}>
          <Block className="blue-block mb-3">
            <BlockBody className="text-center text-white">
              <h5 className="m-0">Search</h5>
            </BlockBody>
          </Block>
        </Link>

        <div onClick={handleRating} className="handleRating">
          <Block className="mb-3">
            <BlockHeader className="text-center">
              <h4 className="mb-0">{order_rating === 'up' ? <i className="fas fa-arrow-up text-success" /> : order_rating === 'down' ?  <i className="fas fa-arrow-down text-danger" /> : <i className="fas fa-minus" />} Order by rating</h4>
            </BlockHeader>
          </Block>
        </div>

      </div>
    )
  }
}
