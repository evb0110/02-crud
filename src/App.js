import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Notes from './components/Notes';

class App extends Component {
  state = {
    notes: [],
    value: '',
  };

  constructor() {
    super();
    this.getNotes = this.getNotes.bind(this);
    this.delNote = this.delNote.bind(this);
    this.notesURL = 'http://localhost:7777/notes';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, value: e.target.value });
  }

  getNotes() {
    axios
      .get(this.notesURL)
      .then(response => this.setState({ notes: response.data }));
  }

  componentDidMount() {
    this.getNotes();
  }

  delNote(id) {
    axios.delete(`${this.notesURL}/${id}`).then(() => this.getNotes());
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = Math.random()
      .toString()
      .slice(2, 10);
    const newNote = { id, content: this.state.value };
    axios.post(this.notesURL, newNote).then(() => {
      this.getNotes();
      this.setState({ ...this.state, value: '' });
    });
  }

  render() {
    return (
      <div className="app-container">
        <form onSubmit={this.handleSubmit} className="enter-new">
          <textarea
            rows="3"
            cols="50"
            placeholder="Enter new note"
            onChange={this.handleChange}
            value={this.state.value}
          />
          <button>Submit</button>
        </form>
        <div className="App">
          <Notes delNote={this.delNote} notes={this.state.notes} />
        </div>
      </div>
    );
  }
}

export default App;
