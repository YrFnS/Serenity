interface LlmRequest {
  prompt: string;
  add_context_from_internet?: boolean;
}

/**
 * Placeholder LLM invocation. Replace this with a real API call (e.g., OpenAI, Anthropic)
 * when wiring up the chat experience to your backend.
 */
export async function InvokeLLM(request: LlmRequest): Promise<string> {
  console.warn("InvokeLLM is using the placeholder implementation. Provide a real backend for production.", request);

  // Simulate latency so the UI shows the typing indicator.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return "Thanks for reaching out! The AI backend isn't connected yet, but I'm here to help. You can explore our services and book through the form on this page.";
}
