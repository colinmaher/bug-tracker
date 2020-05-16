package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var production bool = false
var client *mongo.Client = nil

const defaultPort = "8090"

func register(w http.ResponseWriter, req *http.Request) {
	// log.Println(*req)
	log.Printf("registering user\n")

}

func logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestDump, err := httputil.DumpRequest(r, true)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(requestDump))
		next.ServeHTTP(w, r)
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
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	if os.Getenv("GO_ENV") == "production" {
		production = true
	}
	initDb()
	mux := http.NewServeMux()
	mux.HandleFunc("/register", register)
	log.Printf("server running at http://localhost:%s/", port)
	http.ListenAndServe(":8090", logger(mux))
}

// 05cc641d5917a449643665fcb68e7f57c7012e68bd1b5a104205dbf134358608
