package models

type User struct {
	UserId int64  `primaryKey:"yes"`
	Name   string `json:"name"`
	Email  string `json:"email" sql:"type:varchar(100);not null;unique"`
	Login  string `json:"login" sql:"not null;unique"`
	Avatar string `json:"avatar_url"`
}
