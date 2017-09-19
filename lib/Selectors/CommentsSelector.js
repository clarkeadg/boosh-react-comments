'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleComments = undefined;

var _reselect = require('reselect');

/* Private */

var allComments = function allComments(state, props) {
  return state.comments;
};

var itemType = function itemType(state, props) {
  return props.item_type;
};

var itemId = function itemId(state, props) {
  return props.item_id;
};

/* Export */

var getVisibleComments = exports.getVisibleComments = (0, _reselect.createSelector)([allComments, itemType, itemId], function (comments, type, id) {
  if (!comments.result[type]) return [];
  if (!comments.result[type][id]) return [];
  return comments.result[type][id].map(function (id) {
    return comments.entities[id];
  });
});