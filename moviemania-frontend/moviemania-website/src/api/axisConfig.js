import axios from 'axios';

let config = {
    baseURL:'http://localhost:8080/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
    //   'ngrok-skip-browser-warning':'true'
    }
};

export default axios.create(config);
