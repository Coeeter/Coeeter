import axios from 'axios';
import 'dotenv/config';

const headers = process.env.GITHUB_TOKEN
  ? {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }
  : undefined;

const client = axios.create({
  headers,
  baseURL: 'https://api.github.com',
});

export default client;
