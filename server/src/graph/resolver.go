package graph

import (
	"github.com/colinmaher/bug-tracker/server/src/graph/model"
	// "github.com/colinmaher/bug-tracker/server/src/server"
	"go.mongodb.org/mongo-driver/mongo"
)

//go:generate go run github.com/99designs/gqlgen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
type Resolver struct {
	projects []*model.Project
	DB       *mongo.Client
}
