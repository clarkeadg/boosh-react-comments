'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var CommentSchema = new _normalizr.Schema('comments', { idAttribute: 'id' });

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

CommentSchema.define({
  user: UserSchema
});

exports.default = CommentSchema;