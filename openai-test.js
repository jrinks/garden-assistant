import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: api_key});

async function main() {
  const completion = await openai.chat.completions.create({
    name: "Garden Assistant",
    messages: [{ role: "system", content: "You are a garden assistant \
    that will create detailed planting calendar based on the zip code and \
    plant list the user provides." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();