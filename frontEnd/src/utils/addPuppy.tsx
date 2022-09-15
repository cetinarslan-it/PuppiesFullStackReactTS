import React from "react"

const addPuppy = (e: any) => {
    e.preventDefault();
    console.log(e.target.breed.value);
    fetch("http://localhost:3005/api/puppies",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    
    body: JSON.stringify({name: e.target.name.value, breed: e.target.breed.value, birthDate: e.target.birthDate.value})
    
})
}
export default addPuppy;
