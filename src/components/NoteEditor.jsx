import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaSmile } from 'react-icons/fa';

function NoteEditor({
  noteTitle,
  setNoteTitle,
  noteContent,
  setNoteContent,
  handleAddNote,
  handleSaveEdit,
  editingNote
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setNoteContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // ✅ Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-3 position-relative">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Title (or) Get it generated from AI"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />

      <div className="position-relative">
        <textarea
          className="form-control pe-5"
          placeholder="Type your note here..."
          rows="3"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <FaSmile
          title="Pick Emoji"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            position: 'absolute',
            right: '15px',
            bottom: '15px',
            cursor: 'pointer',
            color: '#6c757d'
          }}
          size={20}
        />
      </div>

      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '15px',
            zIndex: 10
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="text-end mt-2">
        {editingNote ? (
          <button onClick={handleSaveEdit} className="btn btn-success">
            Save Edit
          </button>
        ) : (
          <button onClick={handleAddNote} className="btn btn-primary">
            Add Note
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteEditor;
