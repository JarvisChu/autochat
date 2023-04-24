package api

type LoginRequest struct {
	Name   string `json:"name"`
	Passwd string `json:"passwd"`
}

type LoginResponse struct {
	Code  int    `json:"code"`
	Msg   string `json:"msg"`
	Token string `json:"token"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequest struct {
	ChatList []Message `json:"messages"`
}

type ChatResponse struct {
	Code    int    `json:"code"`
	Msg     string `json:"msg"`
	Content string `json:"token"`
}

type ChatCompletionsRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

/*
	{
	  "id": "chatcmpl-123",
	  "object": "chat.completion",
	  "created": 1677652288,
	  "choices": [{
	    "index": 0,
	    "message": {
	      "role": "assistant",
	      "content": "\n\nHello there, how may I assist you today?",
	    },
	    "finish_reason": "stop"
	  }],
	  "usage": {
	    "prompt_tokens": 9,
	    "completion_tokens": 12,
	    "total_tokens": 21
	  }
	}
*/
type Choice struct {
	Index        int     `json:"index"`
	Message      Message `json:"message"`
	FinishReason string  `json:"finish_reason"`
}

type ChatCompletionsResponse struct {
	ID      string   `json:"id"`
	Object  string   `json:"object"`
	Created int64    `json:"created"`
	Choices []Choice `json:"choices"`
	Usage   struct {
		PromptTokens     int `json:"prompt_tokens"`
		CompletionTokens int `json:"completion_tokens"`
		TotalTokens      int `json:"total_tokens"`
	} `json:"usage"`
}
