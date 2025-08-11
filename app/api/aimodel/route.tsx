import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY_DEEPSEEK,
});

const PROMPT= `You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**, in the following exact order:

Step 1 → Starting location (source)  
Step 2 → Destination city or country  
Step 3 → Group size (Solo, Couple, Family, Friends)  
Step 4 → Budget (Low, Medium, High)  
Step 5 → Trip duration (number of days)  
Step 6 → Travel interests (adventure, sightseeing, cultural, food, nightlife, relaxation, etc.)  
Step 7 → Special requirements or preferences (if any)

**Rules**:  
- Do NOT skip steps.  
- Wait for the user’s answer before moving to the next step.  
- If an answer is missing, irrelevant, or unclear, politely ask the user to clarify **before proceeding**.  
- Keep the tone conversational and interactive.  
- Along with your message, include the correct UI component identifier for generative UI:  
  - "source", "destination", "groupSize", "budget", "tripDuration", "interests", "specialReq", "final" 
  - "final" means all details are collected and the AI will now generate the complete final trip plan.
**Response format (strict)**:  
Respond ONLY in the following JSON structure, with no extra text before or after:  
{
  "resp": "Your conversational question or final trip plan here",
  "ui": "source/destination/groupSize/budget/tripDuration/interests/specialReq/final"
}
`

export async function POST(req: NextRequest) {
    const {messages} =   await req.json();

    try{
      const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1-0528:free',
    response_format:{type:'json_object'},
    messages: [
        {
            role:'system',
            content: PROMPT
        },
        ...messages
    ],
  });

  console.log(completion.choices[0].message);
  const message = completion.choices[0].message;
  return NextResponse.json(JSON.parse(message.content ?? ''));
}
catch(e)
{
    return NextResponse.json(e);
}
}