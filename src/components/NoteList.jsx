import React from 'react';
import NoteCard from './NoteCard';

function NoteList({ notes, handleEdit, handleDelete }) {
  return (
    <div className="row g-3">
      {notes.map((note) => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={note.id}>
          <NoteCard
            note={note}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default NoteList;
