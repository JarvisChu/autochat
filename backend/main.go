package main

import (
	"embed"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jarvischu/autochat/api"
	"time"
)

//go:embed webpage/dist
//go:embed webpage/dist/assets
var f embed.FS

func main() {
	r := gin.Default()

	// cors
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://zzy.show"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// api
	r.POST("/api/v1/login", api.Login)
	r.POST("/api/v1/logout", api.Logout)
	r.GET("/api/v1/user/info", api.GetUserInfo)
	r.POST("/api/v1/chat", api.Chat)

	// html
	r.GET("/", func(context *gin.Context) {
		d, err := f.ReadFile("webpage/dist/index.html")
		if err != nil {
			fmt.Println(err)
		}
		context.Writer.Write(d)
	})
	r.GET("/umi.css", func(context *gin.Context) {
		d, err := f.ReadFile("webpage/dist/umi.css")
		if err != nil {
			fmt.Println(err)
		}
		context.Header("Content-Type", "text/css")
		context.Writer.Write(d)
	})
	r.GET("/umi.js", func(context *gin.Context) {
		d, err := f.ReadFile("webpage/dist/umi.js")
		if err != nil {
			fmt.Println(err)
		}
		context.Writer.Write(d)
	})
	r.GET("/assets/favicon.ico", func(context *gin.Context) {
		d, err := f.ReadFile("webpage/dist/assets/favicon.ico")
		if err != nil {
			fmt.Println(err)
		}
		context.Writer.Write(d)
	})

	r.Run(":8080")
}
