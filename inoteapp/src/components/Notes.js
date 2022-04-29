import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/noteContext';
import { AddNotes } from './AddNotes';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const history = useHistory();
    const {notes, getAllnotes, editNote} = context
    useEffect(()=>{
      if(localStorage.getItem('token')){

        getAllnotes()
      }else{
        history.push('/login')
      }
      // eslint-disable-next-line
    },[])
    const [note, setNote] = useState({id: "",etitle: "",edescription:"", etag: ""})
    const refClose = useRef(null)
    const handleClick = (e) =>{
      editNote(note.id, note.etitle,note.edescription,note.etag)
      refClose.current.click();
      props.showAlert('Note updated','success')
  }
  const onChange = (e)=>{
       setNote({...note, [e.target.name]: e.target.value})

  }
    const ref = useRef(null)
    const updateNote = (currentnote) =>{
       ref.current.click();
       setNote({id: currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag: currentnote.tag})
    }
  return (
    <>
    <AddNotes showAlert={props.showAlert}/>
    
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label" >Title</label>
    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h2>Your notes</h2>
    <div className="container">
    {notes.length===0 && "No notes to display"}
    </div>
    {notes.map((note)=>{
        return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
    })}
    </div>
    </>
  )
}

export default Notes
