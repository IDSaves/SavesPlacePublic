import React, { Component } from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter, Event } from '../../_help/_index.js'
import Pagination from "react-js-pagination"
import emoji from 'react-easy-emoji'

export default class LeftPart extends Component{
  render(){
    const { search_submissions, search_submissions_loading, handlePageChange, page } = this.props
    return(
      <Block className="mb-3 p-3">
        <BlockHeader>
          <h4 className="text-center">Submissions</h4>
        </BlockHeader>
        <BlockBody>
          <div className={search_submissions_loading ? "search-row row o-none": 'search-row row'}>
            {search_submissions.submissions ? search_submissions.submissions.length > 0 ? search_submissions.submissions.map((event, i) => (
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
                <h3 className="mb-4 mt-3">{emoji('😮 Nothing here! 😮')}</h3>
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
              totalItemsCount={search_submissions.total ? search_submissions.total : 0}
              pageRangeDisplayed={3}
              onChange={handlePageChange} />
          </div>
        </BlockBody>
      </Block>
    )
  }
}
