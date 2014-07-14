package controllers

import (
	"done/services"
)

func Show(c services.Context) {
	c.Ren.Pjax("pages/projects", c)
}

func ShowOne(c services.Context) {
	c.Ren.Pjax("pages/projects", c)
}

func ViewResolver(c services.Context) {
	c.Ren.Pjax("pages/projects", c)
}
