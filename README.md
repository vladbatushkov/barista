# Barista

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![barista-logo](/docs/img/barista-logo.png)

Brew a graph of your client-side codebase using Madge & Neo4j.

![image](https://user-images.githubusercontent.com/6023235/140647437-54c8f8bc-9d5e-4ef8-9b7a-1982d2066c7c.png)

## Build and Run

- [Optional] Run `docker-compose up` to start Neo4j instance
  - Predefined user/password: `neo4j`/`barista`
  - You can use any Neo4j instance instead
- Run `yarn install`
- Run `yarn barista`
- Wait... graph is brewing... done!
- [Optional] Use local [Neo4j Browser](http://localhost:7474) to explore your graph
  - You can use any Neo4j tool for graph analysis

## Graph Schema

Nodes:
- `(:Folder)`
- `(:File)`

Relationships:
- `(:Folder)-[:IN]->(:Folder)`
- `(:File)-[:FROM]->(:Folder)`
- `(:File)-[:DEPENDS_ON]->(:File)`

![schema](/docs/img/schema.png)

## Useful Queries

When Barista finish, use a graph to find useful insights.
In **/cypher** folder we collect some cool queries for you:
- [level-dependency.cql](./cypher/level-dependency.cql)
  - Use `[:DEPENDS_ON*1..N]` to look deeper into nested dependencies
