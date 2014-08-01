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
	showProjectsConf := controllers.ViewConfig{"pages/projects", &views.ProjectView{}}
	m.Get("/projects", middleware.IsAuthenticated(), controllers.ViewLoader(showProjectsConf))

	editProjectsConf := controllers.ViewConfig{"pages/editproject", &views.EditProjectView{}}
	m.Get("/projects/:project_id/edit/:tab", middleware.IsAuthenticated(), controllers.ViewLoader(editProjectsConf))

	m.Post("/projects", middleware.IsAuthenticated(), controllers.CreateProject)

	//helper to display markdown
	m.Post("/markdown", middleware.IsAuthenticated(), controllers.Markdown)

	m.NotFound(func(c services.Context) {
		c.Ren.HTML("404", c)
	})
}
