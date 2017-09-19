import Types from './Types'

/* COMMENTS */
const getRepliesAttempt = (meta) => ({ type: Types.GET_COMMENT_REQUEST, meta })
const getCommentsAttempt = (meta) => ({ type: Types.GET_COMMENTS_REQUEST, meta })
const getCommentsSuccess = (payload) => ({ type: Types.GET_COMMENTS_SUCCESS, payload })
const getCommentsFailure = (errorCode) => ({ type: Types.GET_COMMENTS_FAILURE, errorCode })

const addCommentAttempt = (meta) => ({ type: Types.ADD_COMMENT_REQUEST, meta })
const addCommentSuccess = (payload) => ({ type: Types.ADD_COMMENT_SUCCESS, payload })
const addCommentFailure = (errorCode) => ({ type: Types.ADD_COMMENT_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getRepliesAttempt,
  getCommentsAttempt,
  getCommentsSuccess,
  getCommentsFailure,

  addCommentAttempt,
  addCommentSuccess,
  addCommentFailure

}
