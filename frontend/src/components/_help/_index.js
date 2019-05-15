import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import renderHTML from 'react-render-html'
import './index.css'


export function Block(props){
  let className = props.className ? props.className : ''
  return(
    <div className={"container-fluid p-0 block " + className}>{props.children}</div>
  )
}

export function BlockBody(props){
  let className = props.className ? props.className : ''
  return(
    <div className={"container-fluid m-0 block-body p-2 " + className}>{props.children}</div>
  )
}

export function BlockHeader(props){
  let className = props.className ? props.className : ''
  return(
    <div className={"container-fluid m-0 block-header pt-2 pb-2 " + className}>{props.children}</div>
  )
}

export function BlockFooter(props){
  let className = props.className ? props.className : ''
  return(
    <div className={"container-fluid m-0 block-footer p-2 " + className}>{props.children}</div>
  )
}

export function SpanBox(props){
  let className = props.className ? props.className : ''
  return(
    <span className={"m-0 p-1 span-box " + className}>{props.children}</span>
  )
}

export function Row(props){
  let className = props.className ? props.className : ''
  return(
    <span className={"row " + className}>{props.children}</span>
  )
}

export function ConfirmEmail(props){
  let className = props.className ? props.className : ''
  return(
    <div className="container-fluid confirm-your-email-address text-white text-center mb-2 p-0 col-lg-8 offset-lg-2">
      <h5 className="mb-0 p-1">You need to confirm your email address! <Link to='/settings'>Click here!</Link></h5>
    </div>
  )
}

export function Event(props){
  let className = props.className ? props.className : ''
  let type = ''
  if (props.type === 'MEM'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-mem" data-toggle="tooltip" data-placement="top" title="Event type">MEME</div>
    )
  }
  else if (props.type === 'WOR'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-wor" data-toggle="tooltip" data-placement="top" title="Event type">WORLD</div>
    )
  }
  else if (props.type === 'SPT'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-spt" data-toggle="tooltip" data-placement="top" title="Event type">SPORT</div>
    )
  }
  else if (props.type === 'ART'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-art" data-toggle="tooltip" data-placement="top" title="Event type">ART</div>
    )
  }
  else if (props.type === 'MUS'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-mus" data-toggle="tooltip" data-placement="top" title="Event type">MUSIC</div>
    )
  }
  else if (props.type === 'SCI'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-sci" data-toggle="tooltip" data-placement="top" title="Event type">SCIENCE</div>
    )
  }
  else if (props.type === 'GAM'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-gam" data-toggle="tooltip" data-placement="top" title="Event type">GAMES</div>
    )
  }
  else if (props.type === 'MDA'){
    type = (
      <div className="container-fluid text-center text-white event-type-for-block event-type-mda" data-toggle="tooltip" data-placement="top" title="Event type">MEDIA</div>
    )
  }
  return(
      <div className={className.includes('big') ? "col-lg-4 col-md-4 col-sm-4 mb-3 text-center animated fadeIn" : "col-xl-3 col-lg-4 col-md-4 col-sm-4 mb-3 text-center animated fadeIn"}>
        <Link to={`/event/${props.id}`}>
          <div className={`container-fluid event-item ${className} p-0`}>

            <div className="img-wrap" style={{'backgroundColor': props.thumb_color}}>
              <img src={`https://api.savesplace.com/media/${props.thumbnail}`} alt={props.title}/>
            </div>

            <div className="event-item-body pl-2 pr-2 mb-2 text-left">
              <h5 className="mt-2 mb-1">{props.title.substr(0, 30)}</h5>
              <span className="mt-2 mb-0 mr-2"><i class="fas fa-clock" /> <Moment fromNow>{props.event_date}</Moment></span>
            </div>

            {type}

          </div>
        </Link>
      </div>
  )
}

export function EventView(props){
  const { datas, title } = props
  return(
    <div className="col-lg-8 col-md-8 text-center mb-3">
      <p className="event-title text-left pl-1 pr-1 pt-1">{title}</p>
      <div className="container-fluid p-0">
        <Block className="event-block pt-2 pb-2">
          {datas ? datas.map((data, i) => {
            if (data && data.data){
              if (data.type === 'TXT'){
                return(
                  <div className="text-left pl-2 pr-2 mb-2 event-data-text" key={i}>{renderHTML(data.data)}</div>
                )
              }
              else if (data.type === 'GIMG'){
                return(
                  <div className="image-wrapper mb-2 " key={i}>
                    <img className="img-fluid data-image" src={data.data} alt={title}/>
                  </div>
                )
              }
              else if (data.type === 'VID'){
                return(
                  <center className="mb-2" key={i}>
                    <div className="image-wrapper">
                      <ReactPlayer className="img-fluid data-video" controls url={data.data} width={560} height={330}/>
                    </div>
                  </center>
                )
              }
            }
          }) : ''}
        </Block>
      </div>
    </div>
  )
}
