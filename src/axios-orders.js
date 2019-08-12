import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-f2801.firebaseio.com/'
});

export default instance;