package models

import (
	"time"
)

type Project struct {
	Id          int
	Name        string
	Description string
	CreatedAt   time.Time
	CreatorId   int
	Creator     User
	Users       []User `gorm:"many2many:user_projects;"`
}
