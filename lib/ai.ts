import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateRoadmap(goal: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Generate a detailed learning roadmap for someone who wants to "${goal}".
Format it strictly as JSON compatible with the database schema:

{
  "title": "Goal Title",
  "goal": "Describe the goal in one sentence",
  "resources": [
    { "name": "Resource Name", "type": "Book|Course|Video|Article", "link": "https://example.com" },
    ...
  ],
  "stages": [
    {
      "title": "Stage 1 Title",
      "steps": [
        { "task": "Step description", "completed": false },
        ...
      ]
    },
    ...
  ]
}

Include 4-6 stages, each with 3-5 specific steps.
Make sure every step has a 'completed' field set to false (for checkbox functionality).
Include at least 3 resources that help in learning the skill.
Do not include any text outside the JSON.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const json = text.replace(/```json|```/g, "").trim();
  return JSON.parse(json);
}
