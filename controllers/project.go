package controllers

import (
	. "done/models"
	"done/services"
	"net/http"
	"strconv"
)

//Creates a new project and redirects to edit project page
func CreateProject(c services.Context) {

	p := Project{}
	p.Name = c.Req.FormValue("name")
	p.Description = c.Req.FormValue("description")
	p.Creator = c.User

	c.DB.Model(&c.User).Association("Projects").Append(p)

	http.Redirect(c.Res, c.Req, "/projects/"+strconv.Itoa(p.Id)+"/edit/workflows", http.StatusTemporaryRedirect)
}

//helper function to provide markdown of input text with respect to current project
func Markdown(c services.Context) []byte {
	input := c.Req.FormValue("body")
	return services.Markdown(input)
}
