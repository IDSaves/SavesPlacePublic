import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function AvalableYears(props){
  const { available_years } = props
  return(
    <Block className="mb-3">
      <BlockHeader className="text-center">
        <h5 className="m-0">Available Years</h5>
      </BlockHeader>
      <BlockBody className="text-center">
        {available_years ? available_years.map((year, i) => (
          <a className="available-year mb-1" href={`/events?page=1&only_year=yes&year=${year}`} key={i}>{year}</a>
        )) : ''}
      </BlockBody>
    </Block>
  )
}
