package services

import (
	. "done/models"
	"encoding/gob"
	"github.com/jinzhu/gorm"
)

func SetupTables(db gorm.DB) {

	gob.Register(User{})

	db.AutoMigrate(User{})
	db.AutoMigrate(Project{})
	db.AutoMigrate(ProjectUser{})
}
