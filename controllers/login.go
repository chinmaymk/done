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

// flow goes like this
// If he's not authenticated, send him to login page
// if he's authenticated and not loaded in session then get user details from github
// and the end redirect him to /projects
func Index(tokens oauth2.Tokens, c services.Context, db gorm.DB) {
	if tokens.IsExpired() {
		c.Ren.HTML("pages/landing", c)
		return
	}

	token := tokens.Access()

	if c.Ses.Get("user") == nil {

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

		c.Ses.Set("user", user)
	}

	http.Redirect(c.Res, c.Req, "/projects", http.StatusTemporaryRedirect)
}

//called in case oauth blows up
func LoginError(req *http.Request) string {
	return "not right"
}

//this is necessary to clear up in memory session values
func Logout(c services.Context) {
	c.Ses.Clear()
	http.Redirect(c.Res, c.Req, "/logout", http.StatusTemporaryRedirect)
}
