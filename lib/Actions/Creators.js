'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* COMMENTS */
var getRepliesAttempt = function getRepliesAttempt(meta) {
  return { type: _Types2.default.GET_COMMENT_REQUEST, meta: meta };
};
var getCommentsAttempt = function getCommentsAttempt(meta) {
  return { type: _Types2.default.GET_COMMENTS_REQUEST, meta: meta };
};
var getCommentsSuccess = function getCommentsSuccess(payload) {
  return { type: _Types2.default.GET_COMMENTS_SUCCESS, payload: payload };
};
var getCommentsFailure = function getCommentsFailure(errorCode) {
  return { type: _Types2.default.GET_COMMENTS_FAILURE, errorCode: errorCode };
};

var addCommentAttempt = function addCommentAttempt(meta) {
  return { type: _Types2.default.ADD_COMMENT_REQUEST, meta: meta };
};
var addCommentSuccess = function addCommentSuccess(payload) {
  return { type: _Types2.default.ADD_COMMENT_SUCCESS, payload: payload };
};
var addCommentFailure = function addCommentFailure(errorCode) {
  return { type: _Types2.default.ADD_COMMENT_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getRepliesAttempt: getRepliesAttempt,
  getCommentsAttempt: getCommentsAttempt,
  getCommentsSuccess: getCommentsSuccess,
  getCommentsFailure: getCommentsFailure,

  addCommentAttempt: addCommentAttempt,
  addCommentSuccess: addCommentSuccess,
  addCommentFailure: addCommentFailure

};