package controllers

import (
	. "done/models"
	"done/services"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"github.com/martini-contrib/oauth2"
	"io/ioutil"
	"net/http"
)

func Index(tokens oauth2.Tokens, c services.Context, db gorm.DB) {
	if tokens.IsExpired() {
		c.Ren.Pjax("pages/landing", c)
		return
	}

	token := tokens.Access()

	if c.Ses.Get("email") == nil {

		println("getting user from github")

		response, _ := http.Get("https://api.github.com/user?access_token=" + token)
		defer response.Body.Close()

		contents, _ := ioutil.ReadAll(response.Body)

		u := User{}
		err := json.Unmarshal(contents, &u)
		if err != nil {
			panic(err)
		}
		var user User
		db.FirstOrCreate(&user, u)

		c.Ses.Set("email", user.Email)
	}

	http.Redirect(c.Res, c.Req, "/projects", http.StatusTemporaryRedirect)
}

func LoginError(req *http.Request) string {
	return "not right"
}

func Logout(c services.Context) {
	c.Ses.Clear()
	http.Redirect(c.Res, c.Req, "/logout", http.StatusTemporaryRedirect)
}
