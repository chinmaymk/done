package main

import (
	"github.com/go-martini/martini"
	"log"
)

func main() {
	m := martini.Classic()

	m.Get("/", func() string {
		return "Wonderful martini"
	})

	m.Run()
}
