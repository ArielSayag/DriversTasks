import {Axios} from 'axios';
import { Driver,Task,ApiResponse } from './types';

const client = new Axios({
  baseURL:'https://raw.githubusercontent.com/ArielSayag/DriverData/main'
})


export async function fetchData() : Promise<ApiResponse | undefined > {
  const response = await client.get("/data.json")
  return JSON.parse(response.data );
}


