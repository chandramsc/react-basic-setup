import React from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


export default class TextEditerPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleModelChange = this.handleModelChange.bind(this);

        this.state = {
            model: ''
        };
    };

    config = {
        placeholder: "Edit Me",
        events: {
            'froalaEditor.focus': function (e, editor) {
                // console.log(editor.selection.get());
            }
        }
    };

    handleModelChange = (model) => {
        this.setState({
            model: model
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.model);
    }

    render() {
        return (
            <div className="content-container">
                <form className="form" onSubmit={this.onSubmit}>
                    <FroalaEditor
                        tag='textarea'
                        config={this.config}
                        model={this.state.model}
                        onModelChange={this.handleModelChange}
                    />
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
}

//   const mapDispatchToProps = (dispatch) => ({
//     startAddExpense: (expense) => dispatch(startAddExpense(expense))
//   });

//   export default connect(undefined, mapDispatchToProps)(TextEditerPage);
