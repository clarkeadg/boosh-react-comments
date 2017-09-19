// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`

  GET_COMMENT_REQUEST
  GET_COMMENTS_REQUEST
  GET_COMMENTS_SUCCESS
  GET_COMMENTS_FAILURE

  ADD_COMMENT_REQUEST
  ADD_COMMENT_SUCCESS
  ADD_COMMENT_FAILURE

`)
