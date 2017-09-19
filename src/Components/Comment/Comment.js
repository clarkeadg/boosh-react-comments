
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Buttons */
import { ReactionsButton } from 'boosh-react-reactions'

/* Forms */
//import AddReplyForm from '../../Forms/AddReplyForm'

import RepliesCollection from '../../Collections/RepliesCollection'

/* Components */
//import { Button } from 'react-foundation'
import { User, getUserById } from 'boosh-react-users'
//import Form from 'react-jsonschema-form'
import { Link } from 'react-router'

class Comment extends React.Component {

  render() {

    let { me, user, item_type, item_id, comment_id, content } = this.props;

    return (
      <div className="comment">
        <div className="comment-cont">
          <User user={user} />
          <div className="content">{ content }</div>
        </div>
        <div className="reactions">
          <ReactionsButton icon="fi-like" reaction={'Like'} item_type={'comment'} item_id={comment_id}/>
        </div>
        <RepliesCollection item_type={'comment'} item_id={comment_id}/>
      </div>
    )

  }

}

Comment.propTypes = {
  me: React.PropTypes.object,
  user: React.PropTypes.object,
  item_type: React.PropTypes.string,
  //item_id: React.PropTypes.string,
  content: React.PropTypes.string
}

Comment.defaultProps = {
  me: {},
  user: {},
  item_type: '',
  //item_id: '',
  content: ''
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    user: getUserById(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comment.preload = preload;*/

export default connect(mapStateToProps)(Comment)

