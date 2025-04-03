export async function getChatResponse(
    messages: { role: string; content: string }[],
    languageCode: string
  ) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          languageCode,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error getting chat response:', error);
      throw error;
    }
  }