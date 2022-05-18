
import axios from 'axios';

//configuramos los params
const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '48935ed2c21196c7dc8bb75ab6849d4c',
        language: 'es-ES'
    }
});

export default movieDB;