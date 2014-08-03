package models

import (
	"time"
)

type Project struct {
	Id          int
	Name        string
	Description string `sql:"type:text"`
	CreatorId   int    `gorm:"foreignKey"`
	CreatedAt   time.Time
	Users       []User `gorm:"many2many:user_projects;"`
	Creator     User
}
