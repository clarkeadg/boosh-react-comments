
const RepliesCollection  = require('./Collections/RepliesCollection');
const CommentsCollection = require('./Collections/CommentsCollection');
const CommentsActions    = require('./Actions/Creators');
const CommentsSaga       = require('./Sagas/CommentsSaga');
const CommentsApi        = require('./Services/CommentsApi');
const CommentsReducer    = require('./Reducers/CommentsReducer');
const CommentsRoutes     = require('./routes');

module.exports = {
  RepliesCollection:     RepliesCollection.default,
  CommentsCollection:    CommentsCollection.default,
  CommentsActions:       CommentsActions.default,
  CommentsSaga:          CommentsSaga.default,
  CommentsApi:           CommentsApi.default,
  CommentsReducer:       CommentsReducer.default,
  CommentsRoutes:        CommentsRoutes.default
}
