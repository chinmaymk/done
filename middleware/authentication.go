package middleware

import (
	"done/services"
	"github.com/go-martini/martini"
	"net/http"
)

func IsAuthenticated() martini.Handler {
	return func(c services.Context) {
		if c.User.Id == 0 {
			http.Redirect(c.Res, c.Req, "/login", http.StatusTemporaryRedirect)
		}
	}
}
