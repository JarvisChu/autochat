package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.POST("/api/v1/login", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"code":  200,
			"msg":   "ok",
			"token": "test_token",
		})
	})
	r.GET("/api/v1/user/info", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "ok",
			"name": "test_user",
		})
	})
	r.POST("/api/v1/chat", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"code":    200,
			"msg":     "ok",
			"content": "this is the answer from ChatGPT",
		})
	})
	r.Run()
}
