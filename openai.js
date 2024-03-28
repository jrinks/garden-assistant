import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: api_key});

async function ask() {
const assistant = await openai.beta.assistants.create({
    name: "Garden Assistant",
    instructions: "You are a garden assistant \
    that will create detailed planting calendar based on the zip code and \
    plant list the user provides.",
    tools: [{"type": "retrieval"}],
    model: "gpt-3.5-turbo",
})


 const thread = await openai.beta.threads.create();

 const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: 'I live in zip code 60084 and I want to plant tomatoes, cucumbers, carrots, zinnias, squash, potatoes, sunflowers, pansies, onions, watermelon and lettuce in my garden. Can you provide me with a detailed planting schedule based on my last frost date?'
 }) 

const create = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Please provide the user with a planting schedule with real dates for this calendar year."
})

console.log(create);

}

ask()

