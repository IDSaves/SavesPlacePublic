import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function Statistics(props) {
  const { stats } = props
  console.log(stats);
  return(
    <Block className="mb-3">
      <BlockHeader className="text-center">
        <h5 className="m-0">Statistics</h5>
      </BlockHeader>
      <BlockBody>
        <p className="mb-1">Events: <span className="float-right">{stats ? stats.events : 'Loading...'} <i className="fas fa-check-circle" /></span></p>
        <p className="mb-1">Pending submissions: <span className="float-right">{stats ? stats.pending_submissions : 'Loading...'} <i className="fas fa-clock" /></span></p>
        <p className="mb-1">Rejected Submissions: <span className="float-right">{stats ? stats.rejected_submissions : 'Loading...'} <i className="fas fa-times-circle" /></span></p>
        <p className="mb-1">Submitted in this month: <span className="float-right">{stats ? stats.submissions_this_month : 'Loading...'} <i className="fas fa-calendar" /></span></p>
      </BlockBody>
    </Block>
  )
}
