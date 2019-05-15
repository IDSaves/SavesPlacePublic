import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

function Search(el){
  if (el[0]){
    const { label } = el[0]._model
    if (label.includes('January')) window.open(`/events?page=1&only_year=no&year=${label.slice(9)}&month=1`, "_blank")
    if (label.includes('February')) window.open(`/events?page=1&only_year=no&year=${label.slice(10)}&month=2`, "_blank")
    if (label.includes('March')) window.open(`/events?page=1&only_year=no&year=${label.slice(7)}&month=3`, "_blank")
    if (label.includes('April')) window.open(`/events?page=1&only_year=no&year=${label.slice(7)}&month=4`, "_blank")
    if (label.includes('May')) window.open(`/events?page=1&only_year=no&year=${label.slice(5)}&month=5`, "_blank")
    if (label.includes('June')) window.open(`/events?page=1&only_year=no&year=${label.slice(6)}&month=6`, "_blank")
    if (label.includes('July')) window.open(`/events?page=1&only_year=no&year=${label.slice(6)}&month=7`, "_blank")
    if (label.includes('August')) window.open(`/events?page=1&only_year=no&year=${label.slice(8)}&month=8`, "_blank")
    if (label.includes('September')) window.open(`/events?page=1&only_year=no&year=${label.slice(11)}&month=9`, "_blank")
    if (label.includes('October')) window.open(`/events?page=1&only_year=no&year=${label.slice(8)}&month=10`, "_blank")
    if (label.includes('November')) window.open(`/events?page=1&only_year=no&year=${label.slice(10)}&month=11`, "_blank")
    if (label.includes('December')) window.open(`/events?page=1&only_year=no&year=${label.slice(10)}&month=12`, "_blank")
  }
}

export default function EventsLast6Months(props) {
  const { events_last_6_months } = props
  const data = {
    labels: events_last_6_months ? events_last_6_months[0] ? [
      `${events_last_6_months[0][0]}, ${events_last_6_months[0][2]}`,
      `${events_last_6_months[1][0]}, ${events_last_6_months[1][2]}`,
      `${events_last_6_months[2][0]}, ${events_last_6_months[2][2]}`,
      `${events_last_6_months[3][0]}, ${events_last_6_months[3][2]}`,
      `${events_last_6_months[4][0]}, ${events_last_6_months[4][2]}`,
      `${events_last_6_months[5][0]}, ${events_last_6_months[5][2]}`
    ]: [] : [],
    datasets: [{
      data: events_last_6_months ? events_last_6_months[0] ? [
        events_last_6_months[0][1],
        events_last_6_months[1][1],
        events_last_6_months[2][1],
        events_last_6_months[3][1],
        events_last_6_months[4][1],
        events_last_6_months[5][1]
      ] : [] : [],
      backgroundColor: 'rgba(83, 169, 244, .3)',
      hoverBackgroundColor: 'rgba(83, 169, 244, .5)',
      borderColor: 'rgb(83, 169, 244)',
      borderWidth: 1
    }],
  }
  const options = {
    legend: {
    	display: false
    },
    maintainAspectRatio : false,
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  }
  return(
    <Block className="mb-3">
      <BlockHeader className="text-center">
        <h5 className="m-0">Events Of The Last 6 Months</h5>
      </BlockHeader>
      <BlockBody>
        <Bar data={data} options={options} getElementAtEvent={el => Search(el)} />
      </BlockBody>
    </Block>
  )
}
