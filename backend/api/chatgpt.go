package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

const (
	CHATGPT_URL = "https://api.openai.com/v1/chat/completions"
	API_KEY     = ""
)

func ChatCompletions(req ChatCompletionsRequest) (ChatCompletionsResponse, error) {
	bs, err := json.Marshal(&req)
	if err != nil {
		return ChatCompletionsResponse{}, err
	}

	request, err := http.NewRequest(http.MethodPost, CHATGPT_URL, bytes.NewReader(bs))
	if err != nil {
		return ChatCompletionsResponse{}, err
	}
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+API_KEY)

	cli := http.Client{
		Timeout: 60 * time.Second,
	}

	response, err := cli.Do(request)
	if err != nil {
		return ChatCompletionsResponse{}, err
	}

	bodyBytes, err := io.ReadAll(response.Body)
	if err != nil {
		return ChatCompletionsResponse{}, err
	}

	fmt.Printf("response: %v", string(bodyBytes))

	rsp := ChatCompletionsResponse{}
	if err = json.Unmarshal(bodyBytes, &rsp); err != nil {
		return ChatCompletionsResponse{}, fmt.Errorf("unmarshal response failed, err:%v", err.Error())
	}

	return rsp, nil
}
