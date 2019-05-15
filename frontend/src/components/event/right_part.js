import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter, EventView } from '../_help/_index.js'
import { Link } from 'react-router-dom'
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  ViberShareButton,

  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberIcon
} from 'react-share';

export default function RightPart(props){
  const { acceptThis, rejectThis, accept_submission, accept_submission_loading, reject_submission, reject_submission_loading, u_data, event_data, your_vote, setVote } = props
  return(
    <div className="col-lg-4 col-md-4">
      <div className="row">

        <div className={event_data.accepted ? "col-12 mb-3 d-none" : "col-12 mb-3"}>
          <Block className={!event_data.accepted && !event_data.rejected ? "p-2 turquoise-block text-white text-center" : event_data.accepted ? "p-2 green-block text-white text-center d-none" : event_data.rejected ? "p-2 red-block text-white text-center" : ""}>
            <h5 className="mb-0">{!event_data.accepted && !event_data.rejected ? 'Submission is pending' : event_data.accepted ? '' : event_data.rejected ? 'Submission is rejected' : ""}</h5>
          </Block>
        </div>

        <div className="col-12 mb-3">
          <Block className="p-2">
            <div className="event-thumb-block" style={{'backgroundColor': event_data.thumb_color}}>
              <img className="event-thumb img-fluid" src={`https://api.savesplace.com${event_data.thumbnail}`}/>
            </div>
          </Block>
        </div>

        {u_data ? u_data.staff_level > 0 ? event_data.accepted ? (
          <div className="col-12 mb-3">
            <Block className="p-2">
              <h5 className="mb-0 text-success">Accepted by: <Link to={`/profile/${event_data.accepted_by_username}`}>{event_data.accepted_by}</Link></h5>
            </Block>
          </div>
        ) : '' : '': ''}

        { u_data ? u_data.staff_level > 0 ? event_data.rejected ? (
          <div className="col-12 mb-3">
            <Block className="p-2">
              <h5 className="mb-0 text-danger">Rejected by: <Link to={`/profile/${event_data.rejected_by_username}`}>{event_data.rejected_by}</Link></h5>
            </Block>
          </div>
        ) : '' : '' : ''}

        {u_data ? u_data.email_is_confirmed ? event_data.rejected ? '' : (
          <div className="col-6 text-center vote-yes-event mb-3" onClick={localStorage.getItem('auth_id') && localStorage.getItem('auth_token') ? () => setVote('yes') : null}>
            <Block className={your_vote === 'yes' ? "green-block p-1 text-white" : "p-1 text-success"}>
              <h5 className="mb-0"><i className="fas fa-arrow-up" /> {event_data.pos_votes}</h5>
            </Block>
          </div>
        ) : '' : ''}

        {u_data ? u_data.email_is_confirmed ? event_data.rejected ? '' : (
          <div className="col-6 text-center vote-no-event mb-3" onClick={localStorage.getItem('auth_id') && localStorage.getItem('auth_token') ? () => setVote('no') : null}>
            <Block className={your_vote === 'no' ? "red-block p-1 text-white" : "p-1 text-danger"}>
              <h5 className="mb-0"><i className="fas fa-arrow-down" /> {event_data.neg_votes}</h5>
            </Block>
          </div>
        ) : '' : ''}

        {u_data ? !u_data.email_is_confirmed ? (
          <div className="col-12 text-center mb-3">
            <Block className="p-2">
              <h5 className="mb-0">To rate this event you need to confirm your email address!</h5>
            </Block>
          </div>
        ) : '' : ''}

        <div className="col-12 mb-3">
          <Block className="p-2">            
            <h5 className="mb-1">Importance rating: {event_data.rating}</h5>
            <h5 className="mb-1">Event date: {event_data.event_date}</h5>
            <h5 className="mb-1">Publish date: {event_data.publish_date}</h5>
          </Block>
        </div>
        {event_data.accepted ? (
          <div className="col-12 mb-3">
            <Block className="p-2 text-center">
              <FacebookShareButton
                url={String(window.location)}
                quote={event_data.title}
                className="share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>

              <TwitterShareButton
                url={String(window.location)}
                title={event_data.title}
                className="share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>

              <RedditShareButton
                url={String(window.location)}
                title={event_data.title}
                windowWidth={660}
                windowHeight={460}
                className="share-button">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>

              <PinterestShareButton
                url={String(window.location)}
                media={`https://api.savesplace.com/media/events_thumbnails/3c2d261b-fc82-492a-8b3e-3ef5350fc934.png`}
                windowWidth={1000}
                windowHeight={730}
                className="share-button">
                <PinterestIcon size={32} round />
              </PinterestShareButton>

              <TelegramShareButton
                url={String(window.location)}
                title={event_data.title}
                className="share-button">
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={String(window.location)}
                title={event_data.title}
                separator=":: "
                className="share-button">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <ViberShareButton
                url={String(window.location)}
                title={event_data.title}
                body="body"
                className="share-button">
                <ViberIcon
                  size={32}
                  round />
              </ViberShareButton>

            </Block>
          </div>
        ): ''}

        {u_data ? u_data.staff_level >= 1 ? (
          <div className="col-12 text-center">
            <Block className="p-2">
              {event_data.accepted || event_data.rejected ? u_data.staff_level >= 2 ? (
                <div>
                  {accept_submission_loading || reject_submission_loading ? (
                    <div className="row m-0">
                      <div className="col-12">
                        <button className="btn btn-sm btn-secondary container-fluid">Loading...</button>
                      </div>
                    </div>
                  ) : accept_submission === 'Success' || reject_submission === 'Success' ? (
                    <div className="row m-0">
                      <div className="col-12">
                        <button className="btn btn-sm btn-info container-fluid">Success</button>
                      </div>
                    </div>
                  ) : (
                    <div className="row m-0">
                      <div className="col-6">
                        <button className="btn btn-sm btn-success container-fluid" onClick={acceptThis}>Accept</button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-sm btn-danger container-fluid" onClick={rejectThis}>Reject</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : "You can't moderate Accepted/Rejected events." : (
                <div>
                  {accept_submission_loading || reject_submission_loading ? (
                    <div className="row m-0">
                      <div className="col-12">
                        <button className="btn btn-sm btn-secondary container-fluid">Loading...</button>
                      </div>
                    </div>
                  ) : accept_submission === 'Success' || reject_submission === 'Success' ? (
                    <div className="row m-0">
                      <div className="col-12">
                        <button className="btn btn-sm btn-info container-fluid">Success</button>
                      </div>
                    </div>
                  ) : (
                    <div className="row m-0">
                      <div className="col-6">
                        <button className="btn btn-sm btn-success container-fluid" onClick={acceptThis}>Accept</button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-sm btn-danger container-fluid" onClick={rejectThis}>Reject</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Block>
          </div>
        ) : '' : ''}

      </div>
    </div>
  )
}
