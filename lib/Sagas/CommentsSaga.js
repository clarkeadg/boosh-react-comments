'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _CommentSchema = require('../Schemas/CommentSchema');

var _CommentSchema2 = _interopRequireDefault(_CommentSchema);

var _booshReactUsers = require('boosh-react-users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SCHEMAS */
exports.default = function (api) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(attemptGetComments),
      _marked2 = /*#__PURE__*/_regenerator2.default.mark(attemptGetReplies),
      _marked3 = /*#__PURE__*/_regenerator2.default.mark(attemptAddComment),
      _marked4 = /*#__PURE__*/_regenerator2.default.mark(watchGetRepliesAttempt),
      _marked5 = /*#__PURE__*/_regenerator2.default.mark(watchGetCommentsAttempt),
      _marked6 = /*#__PURE__*/_regenerator2.default.mark(watchAddCommentAttempt);

  function attemptGetComments(meta) {
    var response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetComments$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.call)(api.getComments, meta);

          case 2:
            response = _context.sent;

            if (!(response && response.ok)) {
              _context.next = 15;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_CommentSchema2.default));

            if (!payload.result.length) {
              payload.entities.comments = {};
              payload.entities.users = {};
            }
            //console.log('NORMALIZED DATA', payload)

            payload.meta = meta;

            //yield put(Actions.gotPaginationCount({ count: count }))
            _context.next = 11;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getUsersSuccess(payload));

          case 11:
            _context.next = 13;
            return (0, _effects.put)(_Creators2.default.getCommentsSuccess(payload));

          case 13:
            _context.next = 17;
            break;

          case 15:
            _context.next = 17;
            return (0, _effects.put)(_Creators2.default.getCommentsFailure(response.data));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  function attemptGetReplies(meta) {
    var response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetReplies$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.call)(api.getComments, meta);

          case 2:
            response = _context2.sent;

            if (!(response && response.ok)) {
              _context2.next = 15;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_CommentSchema2.default));

            if (!payload.result.length) {
              payload.entities.comments = {};
              payload.entities.users = {};
            }
            //console.log('NORMALIZED DATA', payload)

            payload.meta = meta;

            //yield put(Actions.gotPaginationCount({ count: count }))
            _context2.next = 11;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getUsersSuccess(payload));

          case 11:
            _context2.next = 13;
            return (0, _effects.put)(_Creators2.default.getCommentsSuccess(payload));

          case 13:
            _context2.next = 17;
            break;

          case 15:
            _context2.next = 17;
            return (0, _effects.put)(_Creators2.default.getCommentsFailure(response.data));

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  function attemptAddComment(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptAddComment$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.call)(api.addComment, meta);

          case 2:
            response = _context3.sent;


            console.log('ADD COMMENT RESPONSE', response, meta);

            // success?

            if (!(response && response.ok)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 7;
            return (0, _effects.put)(_Creators2.default.getCommentsAttempt({ item_type: meta.item_type, item_id: meta.item_id }));

          case 7:
            _context3.next = 11;
            break;

          case 9:
            _context3.next = 11;
            return (0, _effects.put)(_Creators2.default.addCommentFailure(response.data));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked3, this);
  }

  function watchGetRepliesAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchGetRepliesAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 9;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_Types2.default.GET_COMMENT_REQUEST);

          case 3:
            _ref = _context4.sent;
            meta = _ref.meta;
            _context4.next = 7;
            return (0, _effects.call)(attemptGetReplies, meta);

          case 7:
            _context4.next = 0;
            break;

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked4, this);
  }

  function watchGetCommentsAttempt() {
    var _ref2, _meta;

    return _regenerator2.default.wrap(function watchGetCommentsAttempt$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 9;
              break;
            }

            _context5.next = 3;
            return (0, _effects.take)(_Types2.default.GET_COMMENTS_REQUEST);

          case 3:
            _ref2 = _context5.sent;
            _meta = _ref2.meta;
            _context5.next = 7;
            return (0, _effects.call)(attemptGetComments, _meta);

          case 7:
            _context5.next = 0;
            break;

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked5, this);
  }

  function watchAddCommentAttempt() {
    var _ref3, _meta2;

    return _regenerator2.default.wrap(function watchAddCommentAttempt$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!true) {
              _context6.next = 9;
              break;
            }

            _context6.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_COMMENT_REQUEST);

          case 3:
            _ref3 = _context6.sent;
            _meta2 = _ref3.meta;
            _context6.next = 7;
            return (0, _effects.call)(attemptAddComment, _meta2);

          case 7:
            _context6.next = 0;
            break;

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked6, this);
  }

  return {
    watchGetRepliesAttempt: watchGetRepliesAttempt,
    watchGetCommentsAttempt: watchGetCommentsAttempt,
    watchAddCommentAttempt: watchAddCommentAttempt,
    attemptGetComments: attemptGetComments,
    attemptAddComment: attemptAddComment
  };
};