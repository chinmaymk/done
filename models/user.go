package models

type User struct {
	Id       int
	Name     string    `json:"name"`
	Email    string    `json:"email"`
	Login    string    `json:"login"`
	Avatar   string    `json:"avatar_url"`
	Projects []Project `gorm:"many2many:user_projects;"`
}
