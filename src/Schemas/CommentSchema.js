import { Schema, valuesOf, arrayOf } from 'normalizr'

const CommentSchema = new Schema('comments', { idAttribute: 'id' });

const UserSchema = new Schema('users', { idAttribute: 'id' });

CommentSchema.define({
  user: UserSchema
});

export default CommentSchema;
