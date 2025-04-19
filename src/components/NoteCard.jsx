import React from 'react';

function NoteCard({ note, handleEdit, handleDelete, translateNote }) {
  return (
    <div className="card h-100 shadow-sm position-relative p-0">
      {/* Delete Button positioned at the top-right of the card */}
      <button
        onClick={() => handleDelete(note.id)}
        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
      >
        ❌
      </button>

      {/* Edit Button */}
      <button
        onClick={() => handleEdit(note)}
        className="btn btn-sm btn-outline-info position-absolute top-0 start-0 m-2"
      >
        ✏️
      </button>


      <div className="card-body mt-5 py-0 px-2">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.content}</p>
        <div>
          {note.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
