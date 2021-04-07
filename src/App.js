import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  render(){
    return(
        <div className="app-container">
          <SidebarComponent
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              deleteNote={this.deleteNote}
              selectNote={this.selectNote}
              newNote={this.newNote}>
          </SidebarComponent>
          {
            //If a note has been selected, render the editor component as well, if not render nothing.
            this.state.selectedNote ?
                <EditorComponent
                    selectedNote={this.state.selectedNote}
                    selectedNoteIndex={this.state.selectedNoteIndex}
                    notes={this.state.notes}
                    noteUpdate={this.noteUpdate}>
                </EditorComponent>
                :
                null
          }
        </div>
    )
  }

  //Upon successful loading of component
  componentDidMount = () => {
    //On snapshot (update) of the notes collection... do x function
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      //Notes array populated with map,
      const _notes = serverUpdate.docs.map(doc => {
        //data is the data for each doc in the collection
        const data = doc.data();
        //Creating a new field on 'data' called 'id' and assigning it the doc id.
        data['id'] = doc.id;
        return data;
      });
      console.log(_notes);
      this.setState({ notes: _notes });
    });
  };

  selectNote = (note, index) => this.setState({selectedNoteIndex: index, selectedNote: note})

  //Updates firebase notes
  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  };

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase.firestore().collection('notes').add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    const newID = newFromDB.id;
    await this.setState({
      notes: [...this.state.notes, note]
    });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex})
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);

    await this.setState({notes: this.state.notes.filter(_note => _note !== note)});

    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({selectedNoteIndex: null, selectedNote: null});
    }
    else{
      this.state.notes.length > 1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
          //If there are no notes
          this.setState({selectedNoteIndex: null, selectedNote: null});
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
  }

}

export default App;
