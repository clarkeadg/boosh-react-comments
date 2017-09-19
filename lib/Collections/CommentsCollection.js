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

var _AddCommentForm = require('../Forms/AddCommentForm');

var _AddCommentForm2 = _interopRequireDefault(_AddCommentForm);

var _AddReplyForm = require('../Forms/AddReplyForm');

var _AddReplyForm2 = _interopRequireDefault(_AddReplyForm);

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _Comment = require('../Components/Comment/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _booshReactUsers = require('boosh-react-users');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Actions */

/* React */
var pageId = 1;

/* Components */


/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Forms */


/* Selectors */

var CommentsCollection = function (_React$Component) {
  (0, _inherits3.default)(CommentsCollection, _React$Component);

  function CommentsCollection() {
    (0, _classCallCheck3.default)(this, CommentsCollection);
    return (0, _possibleConstructorReturn3.default)(this, (CommentsCollection.__proto__ || (0, _getPrototypeOf2.default)(CommentsCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(CommentsCollection, [{
    key: 'renderLoggedInAddComment',
    value: function renderLoggedInAddComment() {
      var _props = this.props,
          me = _props.me,
          item_type = _props.item_type,
          item_id = _props.item_id;


      return _react2.default.createElement(
        'div',
        { className: 'addcomment loggedin' },
        _react2.default.createElement(_booshReactUsers.User, { user_id: me.id }),
        _react2.default.createElement(_AddCommentForm2.default, { user_id: me.id, item_type: item_type, item_id: item_id })
      );
    }
  }, {
    key: 'renderLoggedOutAddComment',
    value: function renderLoggedOutAddComment() {
      var redirect = "";
      if (typeof window != "undefined") {
        redirect = "?redirect=" + window.location;
      }

      return _react2.default.createElement(
        'div',
        { className: 'addcomment loggedout' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/login' + redirect },
          'Login to Comment'
        )
      );
    }
  }, {
    key: 'renderLoggedInAddReply',
    value: function renderLoggedInAddReply(id) {
      var me = this.props.me;

      return _react2.default.createElement(
        'div',
        { className: 'addreply loggedin' },
        _react2.default.createElement(_AddReplyForm2.default, { user_id: me.id, item_type: 'comment', item_id: id })
      );
    }
  }, {
    key: 'renderLoggedOutAddReply',
    value: function renderLoggedOutAddReply() {
      var redirect = "";
      if (typeof window != "undefined") {
        redirect = "?redirect=" + window.location;
      }

      return _react2.default.createElement(
        'div',
        { className: 'addreply loggedout' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/login' + redirect },
          'Login to Reply'
        )
      );
    }
  }, {
    key: 'getData',
    value: function getData(item_type, item_id) {
      this.props.dispatch(_Creators2.default.getCommentsAttempt({ item_type: item_type, item_id: item_id }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          item_type = _props2.item_type,
          item_id = _props2.item_id;

      this.getData(item_type, item_id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.item_id !== this.props.item_id) {
        this.getData(newProps.group_key, newProps.item_id);
      }
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      this.getData(pageId++);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          comments = _props3.comments,
          me = _props3.me,
          item_type = _props3.item_type,
          item_id = _props3.item_id;

      //console.log('COMMENTS', comments)

      return _react2.default.createElement(
        'div',
        { className: 'comments' },
        _react2.default.createElement(_booshReactComponents.Portlet, { items: me.username ? this.renderLoggedInAddComment() : this.renderLoggedOutAddComment() }),
        comments.map(function (item, id) {
          return _react2.default.createElement(_booshReactComponents.Portlet, { key: id, items: _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Comment2.default, {
                item_type: item_type,
                item_id: item_id,
                comment_id: item.id,
                user_id: item.user_id,
                content: item.content }),
              me.username ? _this2.renderLoggedInAddReply(item.id) : _this2.renderLoggedOutAddReply()
            ) });
        })
      );
    }
  }]);
  return CommentsCollection;
}(_react2.default.Component);

CommentsCollection.propTypes = {
  me: _react2.default.PropTypes.object,
  comments: _react2.default.PropTypes.array
};

CommentsCollection.defaultProps = {
  me: {},
  comments: []
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    comments: (0, _CommentsSelector.getVisibleComments)(state, props),
    me: (0, _booshReactAuth.getMe)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommentsCollection);