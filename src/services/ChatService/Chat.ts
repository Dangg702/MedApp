import axios from 'axios';
export const axiosJWT = axios.create();
import {API_URL} from '@env';

export const getChat = async (message:string) => {
    console.log('message', message);
    const response = await axios.post('https://medschedapi.onrender.com/api/chatai/message',message);
    const {data} = response;
    console.log('data', data);
    if (data) {
      return data;
    } else {
      throw new Error('Failed to fetch doctor list');
    }
  };