package routes

import (
	"done/controllers"
	"done/middleware"
	"done/services"
	"done/views"
	"github.com/go-martini/martini"
)

func SetupRoutes(m martini.Router) {
	//login routes
	m.Get("/", controllers.Index)
	m.Get("/signout", controllers.Logout)
	m.Get("/:page/new", middleware.IsAuthenticated(), controllers.NewPageResolver)

	//showed once user logs in
	pConf := controllers.ViewConfig{"pages/projects", &views.ProjectView{}}
	m.Get("/projects", middleware.IsAuthenticated(), controllers.ViewLoader(pConf))

	m.Post("/projects", middleware.IsAuthenticated(), controllers.CreateProject)

	//helper to display markdown
	m.Post("/markdown", middleware.IsAuthenticated(), controllers.Markdown)

	m.NotFound(func(c services.Context) {
		c.Ren.HTML("pages/404", c)
	})
}
