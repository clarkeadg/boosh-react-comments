
/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Components */
import Form from 'react-jsonschema-form'
import { Button } from 'react-foundation'

class AddReplyForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        schema: {
          xtitle: "Reply",
          type: "object",
          required: ["addReply"],
          properties: {
            addReply: {title: "Add Reply", type: "string" }
          }
        },
        uiSchema: {
          addReply: {
            "ui:placeholder": "Add Reply",
            "ui:options": { label: false }
          }
        },
        formData: {
        },
        buttons: []
      }
    }
  }

  onSubmit = ({formData}) => {
    this.props.dispatch(Actions.addCommentAttempt({
      user_id: this.props.user_id,
      item_type: this.props.item_type,
      item_id: this.props.item_id,
      content: formData.addReply
    }))
    formData.addReply = "";
  }

  onChange = ({formData}) => {

  }

  onError = ({formData}) => {

  }

  render() {

    let z = this;

    return (
      <Form
        schema={z.state.form.schema}
        uiSchema={z.state.form.uiSchema}
        formData={z.state.form.formData}
        onChange={z.onChange}
        onSubmit={z.onSubmit}
        onError={z.onError} >
        <div>{z.state.form.buttons.map((item,id) => {
          return (<Button key={id} type={item.type}>{ item.title }</Button>)
        })}</div>
      </Form>
    );
  }

}

const mapStateToProps = (state, props) => {
  return {
  }
}

export default connect(mapStateToProps)(AddReplyForm)



