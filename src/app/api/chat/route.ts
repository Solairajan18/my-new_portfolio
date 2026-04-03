import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // In a real RAG setup, you'd integrate your LLM + Vector DB logic here.
    // For now we just return a placeholder mock response.
    
    // Simulating API lag
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Get the last user message
    const lastMessage = messages?.[messages.length - 1]?.content || "Hello";

    const mockResponse = {
      role: 'assistant',
      content: `This is a mock response from the Chatbot API! (You said: "${lastMessage}"). Replace this endpoint logic with your RAG system when ready.`
    };

    return NextResponse.json({ message: mockResponse });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
