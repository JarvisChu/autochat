package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jarvischu/autochat/web"
)

func main() {
	r := gin.Default()
	r.POST("/api/v1/login", web.Login)
	r.POST("/api/v1/logout", web.Logout)
	r.GET("/api/v1/user/info", web.GetUserInfo)
	r.POST("/api/v1/chat", web.Chat)
	r.Run(":8080")
}
