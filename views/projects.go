package views

import (
	"done/models"
	"done/services"
	"github.com/go-martini/martini"
)

type ProjectView struct{}

func (p *ProjectView) Load(c services.Context, _ martini.Params) interface{} {
	var projects []models.Project

	q := `SELECT * FROM projects p 
  LEFT JOIN project_users pu 
    ON p.project_id = pu.project_id 
  LEFT JOIN users u
    ON pu.user_id = u.user_id
  WHERE u.user_id = ?`

	c.DB.Raw(q, c.User.UserId).Scan(&projects)
	return projects
}
