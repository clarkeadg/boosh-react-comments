import { createSelector } from 'reselect'

/* Private */

const allComments = (state, props) => state.comments

const itemType = (state, props) => props.item_type

const itemId = (state, props) => props.item_id

/* Export */

export const getVisibleComments = createSelector(
  [ allComments, itemType, itemId ],
  ( comments, type, id ) => {
    if (!comments.result[type]) return [];
    if (!comments.result[type][id]) return [];
    return comments.result[type][id].map((id) => {
      return comments.entities[id]
    })
  }
)
