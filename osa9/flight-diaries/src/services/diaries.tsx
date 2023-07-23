import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
  const request = await axios.get<DiaryEntry[]>(baseUrl);
  return request.data;
}

const create = async (diary: DiaryEntry) => {
  await axios.post(baseUrl, diary)
  console.log('ok')
  const request = await axios.get(baseUrl)
  console.log('req', request)
  return request.data
}

export default { getAll, create }