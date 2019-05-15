import React, { Component } from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter, Event } from '../../_help/_index.js'
import Pagination from "react-js-pagination"
import emoji from 'react-easy-emoji'

export default class LeftPart extends Component{
  render(){
    const { view_data, submit_data, search_data, search_loading, handlePageChange, page } = this.props
    return(
      <Block className="mb-3 p-3">
        <BlockHeader>
          <h4 className="text-center">{view_data.month ? view_data.only_year === 'yes' ? `${view_data.year} Year` : `${view_data.year}.${view_data.month <= 9 ? `0${view_data.month}` : view_data.month}` : `${view_data.year} Year`} Events</h4>
        </BlockHeader>
        <BlockBody>
          <div className={search_loading ? "search-row row o-none": 'search-row row'}>
            {search_data.events ? search_data.events.length > 0 ? search_data.events.map((event, i) => (
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
                className="animated fadeIn"/>
            )) : (
              <div className="col-12 text-center">
                <h3 className="mb-4 mt-3">{emoji("😱 Nothing's here! 😱")}</h3>
              </div>
            ) : (
              <div className="col-12 text-center">
                <h3 className="mb-4 mt-3">{emoji('🐢 Loading... ')}</h3>
              </div>
            )}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              prevPageText={<i className="fas fa-angle-left"></i>}
              nextPageText={<i className="fas fa-angle-right"></i>}
              firstPageText={<i className="fas fa-angle-double-left"></i>}
              lastPageText={<i className="fas fa-angle-double-right"></i>}
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={search_data.total ? search_data.total : 0}
              pageRangeDisplayed={3}
              onChange={handlePageChange} />
          </div>
        </BlockBody>
      </Block>
    )
  }
}
