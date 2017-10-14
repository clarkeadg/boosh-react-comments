'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ACTION_HANDLERS;

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = {
  'discussion': {},
  'profile': {},
  'comment': {},
  'video': {}
};

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
  entities: {},
  result: result,
  errorCode: null,
  attempting: false
});

// request
var attempt = function attempt(state, action) {
  return state.merge({ attempting: true });
};

// recieve
var success = function success(state, action) {
  var _action$payload$meta = action.payload.meta,
      item_type = _action$payload$meta.item_type,
      item_id = _action$payload$meta.item_id;

  if (result[item_type]) {
    result[item_type][item_id] = action.payload.result;
  }
  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.comments),
    result: result
  });
};

// failure
var failure = function failure(state, action) {
  return state.merge({ attempting: false, errorCode: action.errorCode });
};

// map our types to our handlers
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_COMMENTS_REQUEST, attempt), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_COMMENTS_SUCCESS, success), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_COMMENTS_FAILURE, failure), _ACTION_HANDLERS);

exports.default = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);