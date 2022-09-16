import { useState, useEffect } from "react";
import "./App.css";
import fetchRandomDoggo from "./utils/doggoBackground";


type name = {
  birthDate: string;
  breed: string;
  id: number;
  name: string;
  setUpDateId :  React.Dispatch<React.SetStateAction<name[]>>
};

interface UpdateId {
  birthDate?: string;
  breed?: string;
  name?: string;
}


export default function App () {

  const [name, setName] = useState<name[]>();
  const [updatePopUp, setUpdatePopUp] = useState<boolean>(false);
  const [addPopUp, setAddPopUp] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number>(1);
  const [randomUrl, setRandomUrl] = useState<string>("");
  const [updateId, setUpdateId] = useState<UpdateId>();


  
  const onClick = (id: number) => {
    setActiveId(id);
  };

  const addingPopUp = () => {
    setAddPopUp(!addPopUp);
  }

  const changeName = (e: any) => {
    const value = e.currentTarget.value;
    setUpdateId({name: value})
  }

  const changeBreed = (e: any) => {
    const value = e.currentTarget.value;
    setUpdateId({breed: value})
  }

  const changeBirthDate = (e: any) => {
    const value = e.currentTarget.value;
    setUpdateId({birthDate: value})
  }

  const doggoUrlArray = async ()  => {
    const urlArray = [];
    urlArray.push(await fetchRandomDoggo());
    console.log(urlArray[0], "this is in doggoUrlArray");
    return urlArray[0];
  }

  const updPopUp = () => {
    const id: any  = name?.find(data => data.id === activeId);
    const editPuppy = {
      name: id.name, 
      breed: id.breed, 
      birthDate:id.birthDate, 
      id: id.id
    }
    setUpdateId({name: id.name, breed: id.breed, birthDate:id.birthDate});
    setUpdatePopUp(!updatePopUp);
    console.log(updateId, "this is updPopUp");
  }

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:3005/api/puppies");
      const jsonData = await data.json();
      setName(jsonData);
      const url = (await fetchRandomDoggo());
      setRandomUrl(await fetchRandomDoggo());
      console.log(url, "this is useEffect");
      console.log(await doggoUrlArray());
    };
    api();
  }, []);

  const addPuppy = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:3005/api/puppies",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({name: e.target.name.value, breed: e.target.breed.value, birthDate: e.target.birthDate.value})
    })
    setAddPopUp(!addPopUp);
  }
  
  const updatePuppy = (e:any) => {
    fetch(`http://localhost:3005/api/puppies/${activeId}`, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({name: e.target.name.value, breed: e.target.breed.value, birthDate: e.target.birthDate.value})
    })
    setUpdatePopUp(!updatePopUp);
  }

  const deleteCall = () => {
    fetch(`http://localhost:3005/api/puppies/${activeId}`, 
    {
      method: 'DELETE',
    })
  }

  return (
    <div className="App">
      { 
        addPopUp ? 
        <form onSubmit={addPuppy} className="popUp">  
          <div>Name <input name="name"></input></div>
          <div>Breed <input name="breed"></input></div>
          <div>Birth Date <input name="birthDate"></input></div>
          <button type="submit">Add new puppy</button>
          <button onClick={addingPopUp}>Cancel</button>
        </form> : 
        <div></div>
      }
      { 
        updatePopUp ? 
        <form onSubmit={updatePuppy} className="popUp">
          <div className="puppyName">Name <input onChange={changeName} value={updateId?.name} name="name"></input></div>
          <div>Breed <input onChange={changeBreed}value={updateId?.breed} name="breed"></input></div>
          <div>Birth Date <input onChange={changeBirthDate} value={updateId?.birthDate} name="birthDate"></input></div>
          <button type="submit">Update</button>
          <button onClick={updPopUp}>Cancel</button>
        </form> : 
        <div></div>
      }
        
      <div className="page">
        <p>Puppies</p>
        <div className="card-container">
          <div className="card-container__cards" >
            <h1>Add new puppy</h1>
            <h1 onClick={addingPopUp}>+</h1>
          </div>
          { 
            name ? 
            name.map((data) => {
              return (
                <div style={{backgroundImage: randomUrl ? `url(${randomUrl})` : ''}} onClick={() => onClick(data.id)} className="card-container__cards" key={data.id}>
                 
                  <h1>{data.name}</h1>
                  <div className="puppyCard">
                    <div className={`panel${activeId === data.id ? "active" : ""}`}>
                      Breed: {data.breed} <br />
                      birthDate: {data.birthDate}
                    </div>
                    <div className={`panel${activeId === data.id ? "active" : ""}`}>
                      <button onClick={deleteCall}>Delete</button>
                      <button onClick={updPopUp}>Update</button>
                    </div>
                  </div>
                </div>
              )
            }) : "Loading"
          }
        </div>
      </div>
    </div>
  );
}



