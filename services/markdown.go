package services

import (
	"github.com/russross/blackfriday"
	"html/template"
)

func Markdown(input string) []byte {
	return blackfriday.MarkdownCommon([]byte(input))
}

func MarkdownToHtml(input string) template.HTML {
	a := blackfriday.MarkdownCommon([]byte(input))
	return template.HTML(a)
}
