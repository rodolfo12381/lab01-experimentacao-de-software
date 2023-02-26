const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { GraphQLClient } = require("graphql-request");
const endpoint = "https://api.github.com/graphql";
const token = "";



const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

app.post("/query", (req, res) => {

    let query = ''

    switch (req.body.query) {

    case "1":
        query = `{
            search(query: "stars:>0 sort:created-asc", type: REPOSITORY, first: 100) {
              edges {
                node {
                  ... on Repository {
                    name
                    createdAt
                    stargazerCount
                    url
                  }
                }
              }
            }
          }`
      break;
    case "2":
        query = `{
            search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 100) {
              edges {
                node {
                  ... on Repository {
                    name
                    url
                    pullRequests {
                      totalCount
                    }
                  }
                }
              }
            }
          }`
      break;

    case "3": 
        query = `{
            search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 10) {
              edges {
                node {
                  ... on Repository {
                    name
                    url
                    releases(first: 10) {
                      totalCount
                    }
                  }
                }
              }
            }
          }`
      break;
    case "4":
        query = `{
            search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 100) {
              edges {
                node {
                  ... on Repository {
                    name
                    url
                    updatedAt
                    pushedAt
                  }
                }
              }
            }
          }`
      break;
    case "5":
        query = `{
            search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 100) {
              edges {
                node {
                  ... on Repository {
                    name
                    url
                    primaryLanguage {
                      name
                    }
                  }
                }
              }
            }
          }`
      break;
    case "6":
        query = `{
            search(query: "stars:>10000 sort:stars-desc", type: REPOSITORY, first: 10) {
              edges {
                node {
                  ... on Repository {
                    name
                    url
                    issues(first: 10) {
                      edges {
                        node {
                          title
                          state
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
      break;
  }
  graphQLClient.request(query).then((data) => {
        console.log(JSON.stringify(data))
        res.json(JSON.stringify(data))
  });
});

app.listen("8080", () => {
  console.log("Servidor Rodando !");
});
