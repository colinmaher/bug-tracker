package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/colinmaher/bug-tracker/server/src/graph"
	"github.com/colinmaher/bug-tracker/server/src/graph/generated"
	verifier "github.com/okta/okta-jwt-verifier-golang"
	oktaUtils "github.com/okta/samples-golang/resource-server/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const defaultPort = "8080"

var production bool = false
var client *mongo.Client = nil

type key int

const (
	authorized key = iota
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// log.Println("Running auth middleware")
		// log.Printf("%T", r.Header["Authorization"][0])
		// w.Write([]byte("OK"))
		// log.Println(r.Context())
		// log.Println(isAuthenticated(r))
		var ctx context.Context = nil

		// log.Printf("%T", ctx)
		if isAuthenticated(r) {
			ctx = context.WithValue(r.Context(), authorized, true)
		} else {
			ctx = context.WithValue(r.Context(), authorized, false)
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func initDb() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var err error = nil
	// log.Printf("%T", mongo.Connect)
	if production == false {
		client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
		if err != nil {
			log.Fatal(err)
		}
	} else {
		client, err = mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URL")))
		if err != nil {
			log.Fatal(err)
		}
	}
	// log.Println(client)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	oktaUtils.ParseEnvironment()
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	if os.Getenv("GO_ENV") == "production" {
		production = true
	}
	initDb()
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: client,
	}}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", authMiddleware(srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

func isAuthenticated(r *http.Request) bool {
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		return false
	}
	tokenParts := strings.Split(authHeader, "Bearer ")
	bearerToken := tokenParts[1]

	tv := map[string]string{}
	tv["aud"] = "api://default"
	tv["cid"] = os.Getenv("SPA_CLIENT_ID")
	jv := verifier.JwtVerifier{
		Issuer:           os.Getenv("ISSUER"),
		ClaimsToValidate: tv,
	}

	_, err := jv.New().VerifyAccessToken(bearerToken)

	if err != nil {
		return false
	}

	return true
}
