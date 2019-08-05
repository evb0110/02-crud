import React from 'react';
import './Note.css'

export default function Note({ note, delNote }) {
  return (
    <div className='note-container'>
      <div className='note-close' onClick={() => delNote(note.id)}>X</div>
      <div className='note'>{note.content}</div>
    </div>
  );
}
