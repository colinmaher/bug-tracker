package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"
	"math/rand"

	"github.com/colinmaher/bug-tracker/server/src/graph/generated"
	"github.com/colinmaher/bug-tracker/server/src/graph/model"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *mutationResolver) CreateProject(ctx context.Context, input model.NewProject) (*model.Project, error) {
	project := &model.Project{
		ID:    fmt.Sprintf("P%d", rand.Int()),
		Name:  input.Name,
		Owner: input.UserID,
		// Users: []*model.UserPermissions,
	}
	collection := r.DB.Database("bug-tracker").Collection("Projects")
	insertResult, err := collection.InsertOne(context.TODO(), project)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted document: ", insertResult.InsertedID)
	return project, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user := &model.User{
		ID:   fmt.Sprintf("U%d", rand.Int()),
		Name: input.Name,
	}
	collection := r.DB.Database("bug-tracker").Collection("Users")
	insertResult, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted document: ", insertResult.InsertedID)
	return user, nil
}

func (r *queryResolver) Projects(ctx context.Context, userID *string) ([]*model.Project, error) {
	var result *model.User
	var err error
	collection := r.DB.Database("bug-tracker").Collection("Users")
	filter := bson.D{{"id", *userID}}
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}
	projects := result.Projects
	return projects, nil
}

func (r *queryResolver) User(ctx context.Context, userID *string) (*model.User, error) {
	var result *model.User
	var err error
	collection := r.DB.Database("bug-tracker").Collection("Users")
	log.Println(*userID)
	filter := bson.D{{"id", *userID}}
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}
	return result, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
