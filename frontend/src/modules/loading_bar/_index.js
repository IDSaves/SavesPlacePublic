/*
*Consts
*/

const SET_BAR = 'SET_BAR'

/*
*Actions
*/

export const setLoadingBar = (data) => {
  return{
      type: SET_BAR,
      data: data
  }
}

/*
*Reducer
*/

let defaultState = {
  loading: true
}

export default function reducer (state=defaultState, action){
  const {type, data} = action
  switch (type) {

    case SET_BAR:
      return Object.assign({}, state, { loading: data })

    default:
      return state
  }
}
