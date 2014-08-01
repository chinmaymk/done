package services

import (
	. "done/models"
	"github.com/go-martini/martini"
	"github.com/jinzhu/gorm"
	"github.com/martini-contrib/sessions"
	"net/http"
)

type Context struct {
	Req       *http.Request
	Res       http.ResponseWriter
	Ren       DoneRenderer
	Ses       sessions.Session
	User      User
	ProjectId int64
	DB        gorm.DB
	Data      interface{}
}

//This guy provides one struct for handling everything, prevents long function definitions
func Contexter() martini.Handler {
	return func(r *http.Request,
		res http.ResponseWriter,
		ren DoneRenderer,
		ses sessions.Session,
		db gorm.DB,
		c martini.Context) {

		var user User
		u := ses.Get("user")
		if u != nil {
			user = u.(User)
		}

		context := Context{
			Req:       r,
			Res:       res,
			Ren:       ren,
			Ses:       ses,
			User:      user,
			ProjectId: 0,
			DB:        db,
			Data:      nil,
		}

		c.Map(context)
	}
}
