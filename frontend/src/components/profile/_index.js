import React, { Component, Fragment } from 'react'
import emoji from 'react-easy-emoji'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Block, BlockBody, BlockHeader, BlockFooter, Event } from '../_help/_index.js'
import { loadUserData } from '../../modules/user/_index'
import { setLoadingBar } from '../../modules/loading_bar/_index'
import { Helmet } from 'react-helmet'

import './index.css'

class Profile extends Component{

  state = {
    tab: 2,
    loading: false
  }

  componentDidMount(){
    this.props.loadUserData(this.props.match.params.username)
  }

  componentWillReceiveProps(props){
    if (this.props.match.params.username != props.match.params.username){
     this.props.loadUserData(props.match.params.username)
   }
  }

  changeTab = (tab) => {
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({tab: tab, loading: false})
    }, 300)

  }

  render(){
    const { data } = this.props.UserReducer
    const { tab, loading } = this.state
    let user_rank = (<span className="user-rank p-1 text-white bg-info">User</span>)
    if (data){
      if (data.staff_level === 1) user_rank = (<span className="user-rank p-1 pl-2 pr-2 text-white bg-success">Editor</span>)
      if (data.staff_level === 2) user_rank = (<span className="user-rank p-1 pl-2 pr-2 text-white bg-warning">Moderator</span>)
      if (data.staff_level === 3) user_rank = (<span className="user-rank p-1 pl-2 pr-2 text-white bg-danger">Administrator</span>)
      if (data.staff_level === 4) user_rank = (<span className="user-rank p-1 pl-2 pr-2 text-white bg-danger">Developer</span>)
      if (data.staff_level === 5) user_rank = (<span className="user-rank p-1 pl-2 pr-2 text-white bg-danger">Administrator</span>)
    }
    return(
      <Fragment>
          <Helmet>
            <title>{this.props.match.params.username} Profile - SavesPlace</title>
          </Helmet>
          { data ? !data.error ? (
            <Block>
              <BlockHeader>
                <div className="profile-header pt-3 pl-3 pr-3 text-center mb-3">

                  <img className="profile-avatar mb-3" src={`https://api.savesplace.com/media/user_avatars/${data.avatar}.svg`} alt="User avatar"/>

                  <div className="profile-header-data pl-4 pr-4 pt-2">
                    <h2 className="mb-2">{data.emoji !== '1' ? emoji(`${data.nickname} ${data.emoji}`) : data.nickname}</h2>
                    {user_rank}<br/>
                    <p className="mt-2 profile-status">{data.status}</p>
                  </div>

                </div>
                <div className="profile-tabs text-center">
                  <div className={tab === 1 ? "profile-tab mr-3 active" : "profile-tab mr-3"} onClick={() => this.changeTab(1)}>
                    <p className="mb-0">Rejected Submissions</p>
                  </div>
                  <div className={tab === 2 ? "profile-tab ml-3 active" : "profile-tab ml-3"} onClick={() => this.changeTab(2)}>
                    <p className="mb-0">Events</p>
                  </div>
                  <div className={tab === 3 ? "profile-tab ml-3 mr-3 active" : "profile-tab ml-3 mr-3"} onClick={() => this.changeTab(3)}>
                    <p className="mb-0">Pending Submissions</p>
                  </div>
                </div>
              </BlockHeader>
              <BlockBody>
                <div className="row m-0 profile-body">
                  {!loading ? tab === 1 ? data.rejected_submissions ? data.rejected_submissions.map((event, i) => (
                    <Event type={event.event_type}
                      id={event.id}
                      thumbnail={event.thumbnail}
                      thumb_color={event.thumb_color}
                      title={event.title}
                      event_date={event.event_date}
                      author={event.author}
                      rating={event.rating}
                      key={i} />
                  )) : (
                    <div className="col-12 text-center mt-3 mb-3">
                      <h3>{emoji(`😱 Nothing's here... `)}</h3>
                    </div>
                  ) : tab === 2 ? data.events ? data.events.map((event, i) => (
                    <Event type={event.event_type}
                      id={event.id}
                      thumbnail={event.thumbnail}
                      thumb_color={event.thumb_color}
                      title={event.title}
                      event_date={event.event_date}
                      author={event.author}
                      rating={event.rating}
                      key={i} />
                  )) : (
                    <div className="col-12 text-center mt-3 mb-3">
                      <h3>{emoji(`😱 Nothing's here... `)}</h3>
                    </div>
                  ) : data.pending_submissions ? data.pending_submissions.map((event, i) => (
                    <Event type={event.event_type}
                      id={event.id}
                      thumbnail={event.thumbnail}
                      thumb_color={event.thumb_color}
                      title={event.title}
                      event_date={event.event_date}
                      author={event.author}
                      rating={event.rating}
                      key={i} />
                  )) : (
                    <div className="col-12 text-center mt-3 mb-3">
                      <h3>{emoji(`😱 Nothing's here... `)}</h3>
                    </div>
                  ) : ''}
                </div>
              </BlockBody>
            </Block>
          ) : (
            <Block className="p-3 text-danger text-center">
              <h3 className="mb-0">Something went wrong! :(</h3>
            </Block>
          ) : (
            <Block className="p-3 text-center">
              <h5 className="mb-0">Loading...</h5>
            </Block>
          ) }

      </Fragment>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, { loadUserData, setLoadingBar })(Profile))
