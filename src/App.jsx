import React, { useState } from 'react';
import './App.css';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import { generateTitle, generateTitleAndTags } from './services/aiService';

function App() {
  const [noteTitle, setNoteTitle] = useState('');
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [noteContent, setNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;

    const finalTitle = noteTitle.trim() || await generateTitle(noteContent);
    const { tags } = await generateTitleAndTags(noteContent);
    console.log(tags)
    const newNote = { id: Date.now(), title: finalTitle, tags, content: noteContent };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    setNoteContent('');
    setNoteTitle('');
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const handleSaveEdit = async () => {
    if (!noteContent.trim()) return;

    const finalTitle = noteTitle.trim() || 'Untitled Note';
    const { tags } = await generateTitleAndTags(noteContent);

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...note, title: finalTitle, tags, content: noteContent } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-left">🧠 Smart Notes with AI</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <NoteEditor
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        handleAddNote={handleAddNote}
        handleSaveEdit={handleSaveEdit}
        editingNote={editingNote}
      />

      <NoteList
        notes={filteredNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
