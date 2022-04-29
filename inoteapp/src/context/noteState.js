import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notes1 = []
      const [notes, setNotes] = useState(notes1)
      const getAllnotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('token')
          },
        });
        const JSON = await response.json()
        setNotes(JSON)
      }

      const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) 
        });
        
        const note = await response.json()
        setNotes(notes.concat(note))
      }


      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('token')
          }, 
        });
        const json = response.json();
        console.log(json)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }


      const editNote = async (id,title,description,tag)=>{
        // API call
          const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json = await response.json();
          console.log(json)
          let newNotes = JSON.parse(JSON.stringify(notes))
 
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes)
      }



        return (
        <noteContext.Provider value={{notes, setNotes,addNote,deleteNote,editNote,getAllnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState