
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'
import { getVisibleComments } from '../Selectors/CommentsSelector'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Forms */
import AddCommentForm from '../Forms/AddCommentForm'
import AddReplyForm from '../Forms/AddReplyForm'

/* Components */
import { Button } from 'react-foundation'
import { Portlet } from 'boosh-react-components'
import Comment from '../Components/Comment/Comment'
import { User } from 'boosh-react-users'
import { Link } from 'react-router'

let pageId = 1;

class CommentsCollection extends React.Component {

  renderLoggedInAddComment() {
    let { me, item_type, item_id } = this.props;

    return (
      <div className="addcomment loggedin">
        <User user_id={me.id} />
        <AddCommentForm user_id={me.id} item_type={item_type} item_id={item_id}/>
      </div>
    )
  }

  renderLoggedOutAddComment() {
    let redirect = ""
    if (typeof window != "undefined") {
      redirect = "?redirect="+window.location;
    }

    return (
      <div className="addcomment loggedout">
        <Link to={'/login'+redirect}>Login to Comment</Link>
      </div>
    )
  }

  renderLoggedInAddReply(id) {
    let { me } = this.props;
    return (
      <div className="addreply loggedin">
        <AddReplyForm user_id={me.id} item_type={'comment'} item_id={id}/>
      </div>
    )
  }

  renderLoggedOutAddReply() {
    let redirect = ""
    if (typeof window != "undefined") {
      redirect = "?redirect="+window.location;
    }

    return (
      <div className="addreply loggedout">
        <Link to={'/login'+redirect}>Login to Reply</Link>
      </div>
    )
  }

  getData(item_type, item_id) {
    this.props.dispatch(Actions.getCommentsAttempt({ item_type: item_type, item_id: item_id }))
  }

  componentDidMount() {
    let { item_type, item_id } = this.props
    this.getData(item_type, item_id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.item_id !== this.props.item_id) {
      this.getData(newProps.group_key, newProps.item_id)
    }
  }

  loadMore() {
    this.getData(pageId++)
  }

  render() {

    let { comments, me, item_type, item_id } = this.props;

    //console.log('COMMENTS', comments)

    return (
      <div className="comments">
        <Portlet items={ me.username ? this.renderLoggedInAddComment() : this.renderLoggedOutAddComment() }/>
        { comments.map((item,id) => {
          return (
            <Portlet key={id} items={
              <div>
                <Comment
                  item_type={item_type}
                  item_id={item_id}
                  comment_id={item.id}
                  user_id={item.user_id}
                  content={item.content} />
                { me.username ? this.renderLoggedInAddReply(item.id) : this.renderLoggedOutAddReply() }
              </div>
            }/>
          )
        }) }
      </div>
    );
  }

}

CommentsCollection.propTypes = {
  me: React.PropTypes.object,
  comments: React.PropTypes.array
}

CommentsCollection.defaultProps = {
  me: {},
  comments: []
}

const mapStateToProps = (state, props) => {
  return {
    comments: getVisibleComments(state, props),
    me: getMe(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(CommentsCollection)

