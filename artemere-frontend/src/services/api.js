import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Assuming your backend runs on port 5000
});

export const createArt = (artData) => API.post('/art', artData);
export const getArtDetails = (id) => API.get(`/art/${id}`);
