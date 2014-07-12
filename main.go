package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"github.com/russross/blackfriday"
	"html/template"
	"io/ioutil"
	"net/http"
)

func main() {
	m := martini.Classic()

	store := sessions.NewCookieStore([]byte("new new cookie"))

	m.Use(sessions.Sessions("agila", store))

	m.Use(oauth2.Github(&oauth2.Options{
		ClientId:     "1e7b4ec76b1eaa4acd42",
		ClientSecret: "e4aa485fb28cf99067ad6e015cccd943a21eee3b",
		RedirectURL:  "http://localhost:3000/oauth2callback",
		Scopes:       []string{"repo, user"},
	}))

	m.Use(render.Renderer(render.Options{
		Directory:       "templates",                // Specify what path to load the templates from.
		Layout:          "",                         // Specify a layout template. Layouts can call {{ yield }} to render the current template.
		Extensions:      []string{".tmpl", ".html"}, // Specify extensions to load for templates.
		IndentJSON:      true,                       // Output human readable JSON
		IndentXML:       true,                       // Output human readable XML
		HTMLContentType: "text/html",                // Output XHTML content type instead of default "text/html"
	}))

	m.Get("/", func(r render.Render, tokens oauth2.Tokens) {
		token := tokens.Access()
		println("token", token)
		response, _ := http.Get("https://api.github.com/user?access_token=" + token)
		defer response.Body.Close()

		contents, _ := ioutil.ReadAll(response.Body)
		r.JSON(http.StatusOK, string(contents))
	})

	m.Get("/oauth2callback", func(req *http.Request, tokens oauth2.Tokens) string {
		token := tokens.Access()
		println("oauth callback", token)
		return token
	})

	m.Get("/oauth2error", func(req *http.Request) string {
		return "not right"
	})

	m.Post("/", func(req *http.Request, r render.Render) {
		text := req.FormValue("text")
		r.HTML(200, "show", template.HTML(blackfriday.MarkdownCommon([]byte(text))))
	})

	m.Run()
}
