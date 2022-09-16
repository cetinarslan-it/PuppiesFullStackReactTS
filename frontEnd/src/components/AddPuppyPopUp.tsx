import { useState, useEffect } from "react";
import addPuppy from '../utils/addPuppy';

const AddPuppyPopUp = () => {
    const [addPopUp, setAddPopUp] = useState<boolean>(false);
    const addingPopUp = (e: any) => {
        setAddPopUp(!addPopUp);
      }

  return (
    <div>
      <form onSubmit={addPuppy} className="popUp">  
        <div>Name <input name="name"></input></div>
        <div>Breed <input name="breed"></input></div>
        <div>Birth Date <input name="birthDate"></input></div>
        <button type="submit">Add new puppy</button>
        <button onClick={addingPopUp}>Cancel</button>
      </form>
    </div>
  )
}

export default AddPuppyPopUp