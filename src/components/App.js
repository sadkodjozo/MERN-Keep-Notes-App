import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Footer from './Footer';
import Axios from 'axios';
import Note from './Note';
import CreateArea from './CreateArea';


const url = "http://localhost:3001";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        
          Axios.get(url + "/notes")
               .then((res) => {
                    const data = res.data; 
                    setNotes(data);
                });
          
    },[]);


    const addNote = async (newNote) => {
        await Axios.post("http://localhost:3001/add", newNote)
        .then((res) => {
            const data = res.data;
            console.log(data);
            setNotes((prevNotes) => {
                return [...prevNotes, data]
            }); 
            })
        .catch(err => console.log(err));

          
    };

    const deleteNote = async (id) => {
        // await fetch(url+ "/notes/delete/" +id, {method: "DELETE"})
        // .then(res => res.json());
        await Axios.delete(`${url}/notes/delete/${id}`)
        .then((res) => {
            const data = res.data;
            console.log(data);
            const link = `${url}/notes/delete/${id}`
            console.log(link);

            setNotes((prevNotes) => {
                return prevNotes.filter(noteItem => {
                  return noteItem._id !== id;
                });
              });
            })
        .catch( err => console.log(err));
                 
    };

    

  return (
    <div className="App">
        <Header />
        <CreateArea onAdd={addNote}/> 

         {notes.map((note) => {
            return (
             <Note
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                onDelete={deleteNote}
            />
            );
        })}
        <Footer />
               
    </div>
  );
}

export default App;
