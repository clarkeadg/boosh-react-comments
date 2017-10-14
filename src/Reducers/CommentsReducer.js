import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const result = {
  'discussion': {},
  'profile': {},
  'comment': {},
  'video': {}
}

export const INITIAL_STATE = Immutable({
  entities: {},
  result: result,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {
  let { item_type, item_id } = action.payload.meta;
  if (result[item_type]) {
    result[item_type][item_id] = action.payload.result;
  }
  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.comments),
    result: result
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_COMMENTS_REQUEST]: attempt,
  [Types.GET_COMMENTS_SUCCESS]: success,
  [Types.GET_COMMENTS_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
