
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'
import { getVisibleComments } from '../Selectors/CommentsSelector'

/* Sagas */
//import GetCommentsSaga from '../Sagas/Preloaders/GetCommentsSaga'

/* Buttons */
import ReactionsButton from 'boosh-react-reactions'

/* Forms */
//import AddReplyForm from '../Forms/AddReplyForm'

/* Components */
import { User } from 'boosh-react-users'
import { Link } from 'react-router'
import { Portlet } from 'boosh-react-components'
import Comment from '../Components/Comment/Comment'

class RepliesCollection extends React.Component {

  componentDidMount() {
    let { item_type, item_id } = this.props
    this.getData(item_type, item_id)
  }

  getData(item_type, item_id) {
    this.props.dispatch(Actions.getRepliesAttempt({ item_type: item_type, item_id: item_id }))
  }

  render() {

    let { replies, item_type, item_id } = this.props;

    return (
      <div className="replies">
        {replies.map((item,id) => {
          return (
            <Portlet key={id} items={
              <Comment
                item_type={item_type}
                item_id={item_id}
                comment_id={item.id}
                user_id={item.user_id}
                content={item.content} />
            }/>
          )
        })}
      </div>
    )

  }

}

RepliesCollection.propTypes = {
  me: React.PropTypes.object,
  replies: React.PropTypes.array
}

RepliesCollection.defaultProps = {
  me: {},
  replies: []
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    replies: getVisibleComments(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comment.preload = preload;*/

export default connect(mapStateToProps)(RepliesCollection)

