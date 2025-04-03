import { NextResponse } from 'next/server';
import { getLanguageName } from '@/lib/langaugeDetection';

// Add this export to make the route dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { messages, languageCode } = await request.json();
    
    const languageName = getLanguageName(languageCode);
    
    // Prepare the messages array for OpenAI API
    const apiMessages = [
      {
        role: 'system',
        content: `You are a helpful multilingual assistant. Respond in ${languageName} (${languageCode}). Keep responses conversational and helpful.`
      },
      ...messages
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return NextResponse.json(
        { error: 'Error from OpenAI API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
      language: languageCode
    });
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}