import React from 'react';

import Note from './Note';

export default function Notes({ notes, delNote }) {
  return notes.map(note => (
    <Note key={note.id} delNote={delNote} note={note} />
  ));
}
