'use strict';

var RepliesCollection = require('./Collections/RepliesCollection');
var CommentsCollection = require('./Collections/CommentsCollection');
var CommentsActions = require('./Actions/Creators');
var CommentsSaga = require('./Sagas/CommentsSaga');
var CommentsApi = require('./Services/CommentsApi');
var CommentsReducer = require('./Reducers/CommentsReducer');
var CommentsRoutes = require('./routes');

module.exports = {
  RepliesCollection: RepliesCollection.default,
  CommentsCollection: CommentsCollection.default,
  CommentsActions: CommentsActions.default,
  CommentsSaga: CommentsSaga.default,
  CommentsApi: CommentsApi.default,
  CommentsReducer: CommentsReducer.default,
  CommentsRoutes: CommentsRoutes.default
};