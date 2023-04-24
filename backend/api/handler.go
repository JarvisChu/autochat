package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

const (
	InnerUserName = "xxx"
	InnerPasswd   = "xxx"
)

var (
	validTokens = make([]string, 0)
)

func Login(c *gin.Context) {
	req := LoginRequest{}
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusOK, LoginResponse{
			Code: 400,
			Msg:  "invalid request param",
		})
		return
	}

	if req.Name != InnerUserName || req.Passwd != InnerPasswd {
		c.JSON(http.StatusOK, LoginResponse{
			Code: 400,
			Msg:  "user name or password error",
		})
		return
	}

	fmt.Printf("LoginRequest: %+v", req)

	token := fmt.Sprintf("%v", time.Now().UnixMilli())
	validTokens = append(validTokens, token)
	c.JSON(http.StatusOK, LoginResponse{
		Code:  200,
		Msg:   "ok",
		Token: token,
	})
}

func Logout(c *gin.Context) {
	var (
		err   error
		token string
	)

	if token, err = checkToken(c); err != nil {
		c.JSON(http.StatusOK, ChatResponse{
			Code: 403,
			Msg:  err.Error(),
		})
		return
	}

	// remove token
	cpy := make([]string, 0)
	for _, t := range validTokens {
		if t == token {
			continue
		}
		cpy = append(cpy, t)
	}
	validTokens = cpy

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "ok",
	})
}

// GetUserInfo not used
func GetUserInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "ok",
		"name": "test_user",
	})
}

func Chat(c *gin.Context) {
	if _, err := checkToken(c); err != nil {
		c.JSON(http.StatusOK, ChatResponse{
			Code: 403,
			Msg:  err.Error(),
		})
		return
	}

	req := ChatRequest{}
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusOK, LoginResponse{
			Code: 400,
			Msg:  "invalid request param",
		})
		return
	}
	fmt.Printf("ChatRequest: %+v", req)
	if len(req.ChatList) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"code": 400,
			"msg":  "no input",
		})
		return
	}

	// format ChatGPT request
	chatReq := ChatCompletionsRequest{
		Model: "gpt-3.5-turbo",
	}
	chatReq.Messages = append(chatReq.Messages, req.ChatList...)
	chatRsp, err := ChatCompletions(chatReq)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": 500,
			"msg":  err.Error(),
		})
		return
	}

	answer := ""
	for _, choice := range chatRsp.Choices {
		if choice.Message.Role == "assistant" {
			answer = choice.Message.Content
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"msg":     "ok",
		"content": answer,
	})
}

func checkToken(c *gin.Context) (string, error) {
	arr := strings.Split(c.GetHeader("Authorization"), " ") //Authorization: Bearer 1682072478475
	if len(arr) != 2 {
		return "", fmt.Errorf("invalid header")
	}

	token := arr[1]
	for _, t := range validTokens {
		if t == token {
			return token, nil
		}
	}
	return "", fmt.Errorf("invalid token")
}
