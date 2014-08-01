package views

import (
	"done/services"
	"github.com/go-martini/martini"
)

type EditProjectView struct{}

func (p *EditProjectView) Load(c services.Context, _ martini.Params) interface{} {
	return "Hello World"
}
