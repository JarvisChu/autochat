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
			"token": "test_token",
		})
	})
	r.GET("/api/v1/user/info", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
			"name": "test_user",
		})
	})
	r.Run()
}
