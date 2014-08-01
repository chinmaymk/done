package main

import (
	"done/conf"
	"done/routes"
	"done/services"
	"fmt"
	"github.com/go-martini/martini"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"html/template"
)

var m *martini.Martini

func init() {
	r := martini.NewRouter()
	m = martini.New()
	m.MapTo(r, (*martini.Routes)(nil))
	m.Action(r.Handle)

	setupDataBase(m)

	setupMiddleWare(m)

	routes.SetupRoutes(r)
}

func main() {
	m.Run()
}

// setups all middleware in right order
func setupMiddleWare(m *martini.Martini) {

	m.Use(gzip.All())

	m.Use(martini.Logger())
	m.Use(martini.Recovery())
	m.Use(martini.Static("public"))

	//create a cookie store
	store := sessions.NewCookieStore([]byte("new new cookie"))
	m.Use(sessions.Sessions("done", store))

	//github login
	m.Use(oauth2.Github(&oauth2.Options{
		ClientId:     conf.GithubClientId,
		ClientSecret: conf.GithubClientSecret,
		Scopes:       []string{"repo, user"},
	}))

	funcmap := template.FuncMap{
		"markdown": services.MarkdownToHtml,
	}
	//templating engine
	m.Use(render.Renderer(render.Options{
		Directory:       "templates",                // Specify what path to load the templates from.
		Layout:          "layout",                   // Specify a layout template. Layouts can call {{ yield }} to render the current template.
		Extensions:      []string{".tmpl", ".html"}, // Specify extensions to load for templates.
		IndentJSON:      true,                       // Output human readable JSON
		IndentXML:       true,                       // Output human readable XML
		HTMLContentType: "text/html",                // Output XHTML content type instead of default "text/html"
		Funcs:           []template.FuncMap{funcmap},
	}))

	m.Use(services.Pjax())

	m.Use(services.Contexter())
}

func setupDataBase(m *martini.Martini) {

	c := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True", conf.DBUser, conf.DBPassword, conf.DBName)

	db, err := gorm.Open("mysql", c)
	if err != nil {
		panic(err)
	}
	db.LogMode(true)

	db.DB().SetMaxIdleConns(10)
	db.DB().SetMaxOpenConns(100)
	db.DB().Ping()

	services.SetupTables(db)
	m.Map(db)
}
