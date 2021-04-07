import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem.js';

class SidebarComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null
        }
    }

    render(){

        const { notes, classes, selectedNoteIndex } = this.props;

        console.log("THE NOTES!");
        console.log(notes);

        if(notes){
            return(
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}>
                        {
                            this.state.addingNote ? 'Cancel' : 'New Note'
                        }
                    </Button>
                    {
                        //If adding note is true
                        this.state.addingNote ?
                            <div>
                                <input
                                    type='text'
                                    className={classes.newNoteInput}
                                    placeholder='Enter note title'
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                />
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNote}>
                                    Submit note
                                </Button>
                            </div> :
                            null
                    }
                    <List>
                    {
                        notes.map((_note, _index) => {
                            return (
                                <div key={_index}>
                                    <SidebarItemComponent
                                        note={_note}
                                        index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}>
                                    </SidebarItemComponent>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                    </List>
                </div>
            )
        } else{
            return (<div></div>);
        }
    }

    //Refresh title var and flip the adding note var on new note clicked
    newNoteBtnClick = () => {
        this.setState({addingNote: !this.state.addingNote, title: null})
    };

    //Updating the title text for the note, occurs on key up.
    updateTitle = (txt) => {
        this.setState({title: txt});
    };

    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({title: null, addingNote: false})
    };

    selectNote = (note, index) => this.props.selectNote(note, index);

    deleteNote = (note) => this.props.deleteNote(note);
}

export default withStyles(styles)(SidebarComponent);