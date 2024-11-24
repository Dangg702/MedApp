import axios from 'axios';
export const axiosJWT = axios.create();
import {API_URL} from '@env';

console.log('API_URL', API_URL);

export const getChat = async (message: string) => {
  console.log('message', message);
  const response = await axios.post(`${API_URL}/api/chatai/message`, message);
  const {data} = response;
  console.log('data', data);
  if (data) {
    return data;
  } else {
    throw new Error('Failed to fetch doctor list');
  }
};
