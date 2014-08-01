package views

import (
	. "done/models"
	"done/services"
	"github.com/go-martini/martini"
)

type ProjectView struct {
}

func (p *ProjectView) Load(c services.Context, _ martini.Params) interface{} {
	var projects []Project
	c.DB.Model(c.User).Related(&projects, "Projects")
	return projects
}
