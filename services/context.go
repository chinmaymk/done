package services

import (
	. "done/models"
	"github.com/go-martini/martini"
	"github.com/jinzhu/gorm"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/sessions"
	"net/http"
)

type Context struct {
	Req       *http.Request
	Res       http.ResponseWriter
	Ren       DoneRenderer
	Ses       sessions.Session
	Tokens    oauth2.Tokens
	User      User
	ProjectId int64
	Data      interface{}
}

//This guy provides one struct for handling everything, prevents long function definitions
func ContextProvider() martini.Handler {
	return func(r *http.Request,
		res http.ResponseWriter,
		ren DoneRenderer,
		ses sessions.Session,
		tokens oauth2.Tokens,
		db gorm.DB,
		c martini.Context) {

		email := ses.Get("email")
		user := User{}
		if email != nil {
			db.Where("email = ?", email.(string)).First(&user)
		}

		c.Map(Context{r, res, ren, ses, tokens, user, 0, nil})
	}
}
