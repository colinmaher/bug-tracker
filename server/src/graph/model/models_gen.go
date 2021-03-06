// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewProject struct {
	Name   string `json:"name"`
	UserID string `json:"userId"`
}

type NewUser struct {
	Name string `json:"name"`
}

type Project struct {
	ID    string             `json:"id"`
	Name  string             `json:"name"`
	Owner string             `json:"owner"`
	Users []*UserPermissions `json:"users"`
}

type User struct {
	ID       string     `json:"id"`
	Name     string     `json:"name"`
	Projects []*Project `json:"projects"`
}

type UserPermissions struct {
	ID          string `json:"id"`
	CanView     bool   `json:"canView"`
	CanAddUsers bool   `json:"canAddUsers"`
	CanEdit     bool   `json:"canEdit"`
	CanCreate   bool   `json:"canCreate"`
}
