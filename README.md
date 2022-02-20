# Barista

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![barista-logo](/docs/img/barista-logo.png)

Brew a graph of your client-side codebase using Madge & Neo4j.

Read a tutorial in article. [WIP]

How it works diagram:

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

## Useful Cypher Queries

**/cypher** folder contains a collection of useful queries:

- Common folder consumers as folders: [common-usage-folders.cql](./cypher/common-usage-folders.cql)
- Common folder consumers: [common-usage.cql](./cypher/common-usage.cql)
- Detect dependencies from the outside: [strict-module-dependency.cql](./cypher/strict-module-dependency.cql)
- Detect n-deep dependencies from the outside: [strict-module-n-deep-dependencies.cql](./cypher/strict-module-n-deep-dependencies.cql)
- Find outside dependency for subject, and then find other consumers of same dependency: [subject-dependency-consumer.cql](./cypher/subject-dependency-consumer.cql)

## Contributors are welcomed

Categories to work on:

- Enrich result graph with new nodes and relationships
- Change the logic of application
- Add more useful Cypher queries
- Improve documentation
