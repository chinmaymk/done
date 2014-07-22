package models

import (
	"time"
)

type Project struct {
	ProjectId          int64
	ProjectName        string
	ProjectDescription string
	UserId             int64
	CreatedAt          time.Time
}
