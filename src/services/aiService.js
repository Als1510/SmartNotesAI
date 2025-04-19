import axios from 'axios';

export const generateTitleAndTags = async (content) => {
  const tags = content.split(' ').filter(word => word.startsWith('#')).map(word => word.replace(/[^a-zA-Z0-9#]/g, '').slice(1))

  return { tags };
};

const apiKey = import.meta.env.VITE_AI_API_KEY;

export const generateTitle = async (content) => {
  try {
    const prompt = `Generate a short and relevant title for the following note content:\n\n${content}`;
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: "You are an assistant that generates short and relevant note titles.",
          },
          {
            role: "user",
            content: `Generate a 2-5 word title summarizing this note:\n\n${content}`,
          }
        ],
        max_tokens: 20,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const title = response.data.choices[0].message.content.replace(/^"|"$/g, '').trim();
    return title || 'Untitled Note';
  } catch (error) {
    console.error('Error generating title:', error);
    return 'Untitled Note';
  }
};