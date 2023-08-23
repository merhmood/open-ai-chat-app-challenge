import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  organization: 'org-TILDyTjFAB8zyJscrBGvlso8',
  apiKey: process.env.ApiKey,
});
const openai = new OpenAIApi(configuration);

export default openai;
