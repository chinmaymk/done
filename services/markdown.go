package services

import (
	"github.com/russross/blackfriday"
)

func Markdown(input string) []byte {
	return blackfriday.MarkdownCommon([]byte(input))
}
