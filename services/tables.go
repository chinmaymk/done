package services

import (
	. "done/models"
	"github.com/jinzhu/gorm"
)

func SetupTables(db gorm.DB) {
	db.AutoMigrate(User{})
}
