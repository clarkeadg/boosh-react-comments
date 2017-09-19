import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

/* SCHEMAS */
import CommentSchema from '../Schemas/CommentSchema'

import { UsersActions } from 'boosh-react-users'

export default (api) => {

  function * attemptGetComments (meta) {

    // make the call to the api
    const response = yield call(api.getComments, meta)

    //console.log('GOT COMMENTS',response.data)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(CommentSchema));
      if (!payload.result.length) {
        payload.entities.comments = {};
        payload.entities.users = {};
      }
      //console.log('NORMALIZED DATA', payload)

      payload.meta = meta;

      //yield put(Actions.gotPaginationCount({ count: count }))
      yield put(UsersActions.getUsersSuccess(payload))
      yield put(Actions.getCommentsSuccess(payload))


      //yield put(Actions.getCommentsSuccess(object_group, object_id, response.data.rows))
    } else {
      yield put(Actions.getCommentsFailure(response.data))
    }
  }

  function * attemptGetReplies (meta) {

    // make the call to the api
    const response = yield call(api.getComments, meta)

    //console.log('GOT REPLIES',response.data, meta)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(CommentSchema));
      if (!payload.result.length) {
        payload.entities.comments = {};
        payload.entities.users = {};
      }
      //console.log('NORMALIZED DATA', payload)

      payload.meta = meta;

      //yield put(Actions.gotPaginationCount({ count: count }))
      yield put(UsersActions.getUsersSuccess(payload))
      yield put(Actions.getCommentsSuccess(payload))

      //yield put(Actions.getCommentsSuccess(action.object_group, action.object_id, response.data.rows))
    } else {
      yield put(Actions.getCommentsFailure(response.data))
    }
  }

  function * attemptAddComment (meta) {

    // make the call to the api
    const response = yield call(api.addComment, meta)

    console.log('ADD COMMENT RESPONSE', response, meta)

    // success?
    if (response && response.ok) {
      yield put(Actions.getCommentsAttempt({item_type: meta.item_type, item_id: meta.item_id}));
    } else {
      yield put(Actions.addCommentFailure(response.data))
    }
  }

  function * watchGetRepliesAttempt () {
    //yield takeEvery(Types.GET_COMMENT_REQUEST, attemptGetReplies)
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_COMMENT_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetReplies, meta)
    }
  }

  function * watchGetCommentsAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_COMMENTS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetComments, meta)
    }
  }

  function * watchAddCommentAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.ADD_COMMENT_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptAddComment, meta)
    }
  }

  return {
    watchGetRepliesAttempt,
    watchGetCommentsAttempt,
    watchAddCommentAttempt,
    attemptGetComments,
    attemptAddComment
  }
}
