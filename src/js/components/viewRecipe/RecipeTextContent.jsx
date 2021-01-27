import React, {createRef} from "react";
import ReactQuill from "react-quill";
import {modules, formats} from "../../config/editor.config";
import {autorun} from "mobx";

class Editor extends React.Component {
    constructor (props) {
        super(props)
        this.state = { editorHtml: ''}
        this.handleChange = this.handleChange.bind(this);
        this.reactQuill = createRef();
        this.quill;
        this.id;
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
    }

    componentDidUpdate(prevProps, prevState) {
        if(typeof this.quill !== "undefined") {
            this.quill.enable(this.props.toEdit);
        }
        
    }

    componentDidMount() {
        this.props.pcRen.on("getSave", () => {
            console.log({id: this.props.contentId, content: this.quill.getContents()})
            this.props.pcRen.send("saveData", {id: this.props.contentId, content: this.quill.getContents()});
        });

        let int = setInterval(() => {
            if (typeof this.reactQuill.getEditor == 'function') {
                this.quill = this.reactQuill.getEditor();
                this.quill.enable(this.props.toEdit);
                clearInterval(int);
            

                this.quill.setContents(this.props.content);
            }
        }, 1);

        this.props.pcRen.on("id", (eve, args) => {
            console.log(args);
            this.id = args;
        })
    }

    render() {
        return (
            <>
                <ReactQuill
                    onChange={this.handleChange}
                    modules={Editor.modules}
                    theme="snow"
                    ref={(el) => {this.reactQuill = el}}
                    suppressContentEditableWarning={true}
                />
            </>
        )
    }
};

Editor.modules = modules;
Editor.formats = formats;

export default Editor;