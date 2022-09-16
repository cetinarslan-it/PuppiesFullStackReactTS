
const fetchRandomDoggo = async () => {
    const url = fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => data.message);
    const message = await url;
    return message;
}

export default fetchRandomDoggo