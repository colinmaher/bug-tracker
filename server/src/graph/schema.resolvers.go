package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/colinmaher/bug-tracker/server/src/graph/generated"
	"github.com/colinmaher/bug-tracker/server/src/graph/model"
)

func (r *mutationResolver) CreateProject(ctx context.Context, input model.NewProject) (*model.Project, error) {
	project := &model.Project{
		ID:   fmt.Sprintf("P%d", rand.Int()),
		Name: input.Name,
		User: input.UserID,
	}
	r.projects = append(r.projects, project)
	return project, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Projects(ctx context.Context) ([]*model.Project, error) {
	// panic(fmt.Errorf("not implemented"))
	projects := r.projects
	return projects, nil
}

func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
