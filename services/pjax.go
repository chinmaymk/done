package services

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"net/http"
)

// A custom renderer to work wit pjax
type DoneRenderer struct {
	r      render.Render
	IsPjax bool
}

func Pjax() martini.Handler {
	return func(c martini.Context, r render.Render, req *http.Request) {
		s := req.Header.Get("X-PJAX")
		var p bool
		if s != "" {
			p = true
		} else {
			p = false
		}
		done := DoneRenderer{r, p}
		c.Map(done)
	}
}

func (d *DoneRenderer) HTML(template string, data interface{}) {
	layout := "layout"
	d.r.HTML(http.StatusOK, template, data, render.HTMLOptions{
		Layout: layout,
	})
}

func (d *DoneRenderer) Json(data interface{}) {
	d.r.JSON(http.StatusOK, data)
}
