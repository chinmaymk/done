package controllers

import (
	"done/conf"
	"done/services"
	"fmt"
	"github.com/go-martini/martini"
	"strconv"
)

type Loader interface {
	Load(c services.Context, params martini.Params) interface{}
}

type ViewConfig struct {
	Page string
	View Loader
}

func ViewLoader(vc ViewConfig) martini.Handler {
	return func(c services.Context, params martini.Params) {
		i, err := strconv.Atoi(params[conf.ProjectId])
		if err == nil {
			c.ProjectId = int64(i)
		}
		c.Data = vc.View.Load(c, params)
		c.Ren.HTML(vc.Page, c)
	}
}

func NewPageResolver(c services.Context, params martini.Params) {
	s := fmt.Sprintf("new/%s", params["page"])
	c.Ren.HTML(s, c)
}
