import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {

    render(){
        const { index, note, classes, selectedNoteIndex } = this.props;

        return(
            <div key={index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === index}
                    alignItems='flex-start'
                    onClick={() => this.selectNote(note, index)}>
                        <div
                            className={classes.textSection}>
                                <ListItemText
                                    primary={note.title}
                                    secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}>
                                </ListItemText>
                        </div>
                        <DeleteIcon
                            onClick={() => this.deleteNote(note)}
                            className={classes.deleteIcon}>
                        </DeleteIcon>
                </ListItem>
            </div>
        )
    }

    selectNote = (note, index) => this.props.selectNote(note, index);

    deleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)){
            this.props.deleteNote(note);
        }
    }
}

export default withStyles(styles)(SidebarItemComponent);