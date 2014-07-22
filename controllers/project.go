package controllers

import (
	. "done/models"
	"done/services"
)

//Creates a new project and redirects to edit project page
func CreateProject(c services.Context) string {
	p := Project{}
	p.ProjectName = c.Req.FormValue("name")
	p.ProjectDescription = c.Req.FormValue("description")
	return "something"
}

//helper function to provide markdown of input text with respect to current project
func Markdown(c services.Context) []byte {
	input := c.Req.FormValue("body")
	return services.Markdown(input)
}
