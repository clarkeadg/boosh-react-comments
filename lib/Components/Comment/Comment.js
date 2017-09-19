'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _booshReactAuth = require('boosh-react-auth');

var _booshReactReactions = require('boosh-react-reactions');

var _RepliesCollection = require('../../Collections/RepliesCollection');

var _RepliesCollection2 = _interopRequireDefault(_RepliesCollection);

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */
//import { Button } from 'react-foundation'


/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Buttons */


/* Actions */

/* React */
var Comment = function (_React$Component) {
  (0, _inherits3.default)(Comment, _React$Component);

  function Comment() {
    (0, _classCallCheck3.default)(this, Comment);
    return (0, _possibleConstructorReturn3.default)(this, (Comment.__proto__ || (0, _getPrototypeOf2.default)(Comment)).apply(this, arguments));
  }

  (0, _createClass3.default)(Comment, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          me = _props.me,
          user = _props.user,
          item_type = _props.item_type,
          item_id = _props.item_id,
          comment_id = _props.comment_id,
          content = _props.content;


      return _react2.default.createElement(
        'div',
        { className: 'comment' },
        _react2.default.createElement(
          'div',
          { className: 'comment-cont' },
          _react2.default.createElement(_booshReactUsers.User, { user: user }),
          _react2.default.createElement(
            'div',
            { className: 'content' },
            content
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'reactions' },
          _react2.default.createElement(_booshReactReactions.ReactionsButton, { icon: 'fi-like', reaction: 'Like', item_type: 'comment', item_id: comment_id })
        ),
        _react2.default.createElement(_RepliesCollection2.default, { item_type: 'comment', item_id: comment_id })
      );
    }
  }]);
  return Comment;
}(_react2.default.Component);
//import Form from 'react-jsonschema-form'


/* Forms */
//import AddReplyForm from '../../Forms/AddReplyForm'

/* Selectors */


Comment.propTypes = {
  me: _react2.default.PropTypes.object,
  user: _react2.default.PropTypes.object,
  item_type: _react2.default.PropTypes.string,
  //item_id: React.PropTypes.string,
  content: _react2.default.PropTypes.string
};

Comment.defaultProps = {
  me: {},
  user: {},
  item_type: '',
  //item_id: '',
  content: ''
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    user: (0, _booshReactUsers.getUserById)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comment.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Comment);