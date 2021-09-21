import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
// import notes from '../assets/data'
import { Link } from 'react-router-dom'
const NotePage = ({ match, history }) => {
    let noteId = match.params.id
    // let note = notes.find(note => note.id == noteId)
    let [note, setNotes] = useState(null)
    useEffect(() => {
        getNotes()
    }, [noteId])


    let getNotes = async () => { 
        if(noteId === 'new') return
        let response = await fetch(`http://localhost:5000/notes/${noteId}`)
        let data = await response.json()

        setNotes(data)
    }
    let createNote = async () => {
        await fetch(`http://localhost:5000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated ': new Date() })
        })
    }
    let updateNote = async () => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated ': new Date() })
        })
    }
    let deleteNote = async () => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }
    let handleSumit = () => {
        if (noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note !==null ){
            createNote()
        }
       
        history.push('/')
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSumit} />
                    </Link>

                </h3>
                {noteId !== 'new' ? (

                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSumit}>Done</button>

                )}

            </div>
            <textarea onChange={(e) => { setNotes({ ...note, 'body': e.target.value }) }} value={note?.body}>


            </textarea>

        </div>
    )
}

export default NotePage
