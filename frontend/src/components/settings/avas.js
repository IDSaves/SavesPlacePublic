import React from 'react'
import av1 from '../../images/avatars/1.svg'
import av2 from '../../images/avatars/2.svg'
import av3 from '../../images/avatars/3.svg'
import av4 from '../../images/avatars/4.svg'
import av5 from '../../images/avatars/5.svg'
import av6 from '../../images/avatars/6.svg'
import av7 from '../../images/avatars/7.svg'
import av8 from '../../images/avatars/8.svg'
import av9 from '../../images/avatars/9.svg'
import av10 from '../../images/avatars/10.svg'
import av11 from '../../images/avatars/11.svg'
import av12 from '../../images/avatars/12.svg'
import av13 from '../../images/avatars/13.svg'
import av14 from '../../images/avatars/14.svg'
import av15 from '../../images/avatars/15.svg'
import av16 from '../../images/avatars/16.svg'
import av17 from '../../images/avatars/17.svg'

export const av_arr = [
  av1,
  av2,
  av3,
  av4,
  av5,
  av6,
  av7,
  av8,
  av9,
  av10,
  av11,
  av12,
  av13,
  av14,
  av15,
  av16,
  av17
]

export default function Avas(props){
  const { chooseAvatar } = props
  return(
    <div className="avatars-sel pt-3 pl-3 pr-3">
      <div className="row">
        {av_arr.map((av, i) => (
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">

            <div className="set-avatar mb-3" >
              <div className="current-avatar">
                <div className="hover-overlay" onClick={() => chooseAvatar(i+1)}>
                  <i class="fas fa-check-circle text-success" />
                </div>
                <img src={av} key={i}/>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
