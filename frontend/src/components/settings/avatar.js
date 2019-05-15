import React from 'react'

export default function Avatar(props){
  const { handleAvas, cur_avatar, set_avatar, av_arr } = props
  return(
    <div className="set-avatar mb-3" >
      <div className="current-avatar big">
        <div className="hover-overlay" onClick={handleAvas}>
          <i className="fas fa-pencil-alt text-warning" />
        </div>
        <img src={set_avatar === -1 ? `https://api.savesplace.com/media/user_avatars/${props.cur_avatar}.svg` : av_arr[set_avatar - 1]}/>
      </div>
    </div>
  )
}
