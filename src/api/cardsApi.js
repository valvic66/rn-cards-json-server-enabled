import axios from 'axios';
import { BASE_URL } from '../constants/Cards';

export default axios.create({
  baseURL: BASE_URL
});