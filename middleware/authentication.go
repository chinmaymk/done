package middleware

import (
	"done/services"
	"github.com/go-martini/martini"
	"net/http"
)

func IsAuthenticated() martini.Handler {
	return func(c services.Context) {
		if c.User.UserId == 0 {
			http.Redirect(c.Res, c.Req, "/login?next="+c.Req.URL.String(), http.StatusTemporaryRedirect)
		}
	}
}
