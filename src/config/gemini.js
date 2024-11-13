// const API_KEY = 'AIzaSyDCXHHlRVCZMBSRSV6VRlh4dy9LTKRY0EY';


// import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI('AIzaSyDCXHHlRVCZMBSRSV6VRlh4dy9LTKRY0EY');   //process.env.API_KEY);

// // ...

// // The Gemini 1.5 models are versatile and work with most use cases
// const generationConfig = {
//     stopSequences: ["red"],
//     maxOutputTokens: 100,
//     temperature: 0.9,
//     topP: 0.1,
//     topK: 16,
// };
// const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig }); //gemini-1.5-flash
// async function run(prompt) {
//     // const prompt = "Write a beautiful, thought-provoking and poetic poem."
//     const result = await model.generateContent(prompt);

//     console.log(result.response.text());
// }
// // ...
// export default run;

//---------------------------------------------------------------------------------------------------

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDCXHHlRVCZMBSRSV6VRlh4dy9LTKRY0EY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
}

export default run;