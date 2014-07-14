package routes

import (
	"done/controllers"
	"done/middleware"
	"done/services"
	"github.com/go-martini/martini"
)

func SetupRoutes(m martini.Router) {
	//login routes
	m.Get("/", controllers.Index)
	m.Get("/signout", controllers.Logout)

	//showed once user logs in
	m.Get("/projects", controllers.Show)

	//rest of the project group
	m.Group("/projects", func(r martini.Router) {
		r.Get("/:id", controllers.ShowOne)
		r.Get("/:id/:page", controllers.ViewResolver)
	}, middleware.IsAuthenticated())

	m.NotFound(func(c services.Context) {
		c.Ren.Pjax("pages/404", c)
	})
}
