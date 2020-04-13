import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Chip from '@material-ui/core/Chip';

export class EditTagsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    openCloseModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        let predefinedTags = ["Patient", "Knowledgeable", "Responsible", "Attentive", "Honest", "Bedside Manner",
            "Trustworthy", "Respectful", "Empathetic", "Friendly", "Enthusiastic", "Humorous"];

        // let userTags = this.props.selectedTags.map((tag) => {
        //     console.log(tag.label);
        //     return tag.label;
        // })

        // console.log(userTags);

        let tags = predefinedTags.map((tag) => {
            let selected;
            if (this.props.selectedTags.includes(tag)) {
                selected = true;
            } else {
                selected = false;
            }
            return <Tag key={tag} label={tag} selected={selected} addRemoveTag={this.props.addRemoveTag}/>;
        });

        return (
            <div>
                <EditOutlinedIcon id='edit-icon' type="button" onClick={this.openCloseModal} />
                <Modal
                    id='modal'
                    open={this.state.isOpen}
                    onClose={this.openCloseModal}
                    // closeAfterTransition
                    // BackdropComponent={Backdrop}
                    // BackdropProps={{
                    //     timeout: 500,
                    // }}
                >
                    {/* <Fade in={this.state.isOpen}> */}
                        <div id='modal-content'>
                            <h2 id='modal-title'>Please select tag(s) that best describe this doctor from the list below </h2>
                            <hr />
                            <div id='modal-tags'>
                                {tags}
                                <button type="button" onClick={this.openCloseModal}>Done</button>
                            </div>
                        </div>
                    {/* </Fade> */}
                </Modal>
            </div>
        );
    }
}

export class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    selectTag = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        this.props.addRemoveTag(this.props.label)
    }

    render() {
        let bgColor;
        let fontColor;
        if (this.state.selected) {
            bgColor= "rgb(255, 134, 134)";
            fontColor = "white";
        } else {
            bgColor = "white";
            fontColor = "rgb(255, 134, 134)";
        }

        return (
            <Chip
                id='predefinedtTag'
                variant="outlined"
                size="small"
                label={this.props.label}
                onClick={this.selectTag}
                style={{
                    color: fontColor,
                    backgroundColor: bgColor
                }}
            />
        )
    }
}

