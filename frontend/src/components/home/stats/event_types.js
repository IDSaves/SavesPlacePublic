import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function EventTypes(props){
  const { event_types } = props
  const data = {
    labels: [
      'Meme',
      'World',
      'Sport',
      'Music',
      'Science',
      'Art',
      'Games',
      'Media'
    ],
    datasets: [{
      data: event_types ? [event_types.MEM, event_types.WOR, event_types.SPT, event_types.MUS, event_types.SCI, event_types.ART, event_types.GAM, event_types.MDA] : [],
      backgroundColor: [
        'rgba(112, 174, 110, .8)',
        'rgba(243, 186, 112, .8)',
        'rgba(155, 162, 255, .8)',
        'rgba(52, 177, 188, .8)',
        'rgba(61, 64, 91, .8)',
        'rgba(223, 72, 98, .8)',
        'rgba(130, 70, 112, .8)',
        'rgb(229, 110, 219, .8)'
      ],
      hoverBackgroundColor: [
        'rgba(112, 174, 110, .9)',
        'rgba(243, 186, 112, .9)',
        'rgba(155, 162, 255, .9)',
        'rgba(52, 177, 188, .9)',
        'rgba(61, 64, 91, .9)',
        'rgba(130, 70, 112, .9)',
        'rgb(229, 110, 219, .9)'
      ],
      borderColor: 'white'
    }],
  }
  const options = {
    legend: {
    	position: 'bottom'
    },
    maintainAspectRatio : false
  }
  return(
    <Block className="mb-3 event-type">
      <BlockHeader className="text-center">
        <h5 className="m-0">Event Types Count</h5>
      </BlockHeader>
      <BlockBody>
        <Doughnut data={data} options={options} height="250px" getElementAtEvent={dataset => console.log(dataset)}/>
      </BlockBody>
    </Block>
  )
}
