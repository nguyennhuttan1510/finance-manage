import axios from 'axios';

const instancePublic = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instancePublic;
