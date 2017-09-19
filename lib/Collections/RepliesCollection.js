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

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _booshReactAuth = require('boosh-react-auth');

var _CommentsSelector = require('../Selectors/CommentsSelector');

var _booshReactReactions = require('boosh-react-reactions');

var _booshReactReactions2 = _interopRequireDefault(_booshReactReactions);

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

var _booshReactComponents = require('boosh-react-components');

var _Comment = require('../Components/Comment/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Forms */
//import AddReplyForm from '../Forms/AddReplyForm'

/* Components */


/* Actions */

/* React */
var RepliesCollection = function (_React$Component) {
  (0, _inherits3.default)(RepliesCollection, _React$Component);

  function RepliesCollection() {
    (0, _classCallCheck3.default)(this, RepliesCollection);
    return (0, _possibleConstructorReturn3.default)(this, (RepliesCollection.__proto__ || (0, _getPrototypeOf2.default)(RepliesCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(RepliesCollection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          item_type = _props.item_type,
          item_id = _props.item_id;

      this.getData(item_type, item_id);
    }
  }, {
    key: 'getData',
    value: function getData(item_type, item_id) {
      this.props.dispatch(_Creators2.default.getRepliesAttempt({ item_type: item_type, item_id: item_id }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          replies = _props2.replies,
          item_type = _props2.item_type,
          item_id = _props2.item_id;


      return _react2.default.createElement(
        'div',
        { className: 'replies' },
        replies.map(function (item, id) {
          return _react2.default.createElement(_booshReactComponents.Portlet, { key: id, items: _react2.default.createElement(_Comment2.default, {
              item_type: item_type,
              item_id: item_id,
              comment_id: item.id,
              user_id: item.user_id,
              content: item.content }) });
        })
      );
    }
  }]);
  return RepliesCollection;
}(_react2.default.Component);

/* Sagas */
//import GetCommentsSaga from '../Sagas/Preloaders/GetCommentsSaga'

/* Buttons */


/* Selectors */


RepliesCollection.propTypes = {
  me: _react2.default.PropTypes.object,
  replies: _react2.default.PropTypes.array
};

RepliesCollection.defaultProps = {
  me: {},
  replies: []
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    replies: (0, _CommentsSelector.getVisibleComments)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comment.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RepliesCollection);