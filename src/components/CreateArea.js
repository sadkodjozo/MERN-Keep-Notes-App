import React, { useState } from "react";
import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props){

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const [isExpanded, setExpanded] = useState(false);

      /////////////////////////////////////////////////////

    function expand(){
        setExpanded(true);
    }
      /////////////////////////////////////////////////////

function handleChange(event){
    const {name, value} = event.target;

    setNote(prevNote => {
        return { 
            ...prevNote,
            [name]: value
        };
    });
}
  /////////////////////////////////////////////////////

function submitNote(event){
    props.onAdd(note);
    setNote({
        title: "",
        content: ""
      });
      //event.preventDefault();
}
  /////////////////////////////////////////////////////

return (
    <div>
      <form className="create-note" onClick={expand}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={note.title !== "" ? submitNote : undefined}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
export default CreateArea;