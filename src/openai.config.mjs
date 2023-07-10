import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-TILDyTjFAB8zyJscrBGvlso8",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;