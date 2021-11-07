# Barista

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![barista-logo](/docs/img/barista-logo.png)

Barista helps you to create a Client-side Dependency Graph using Neo4j database and Madge.

![image](https://user-images.githubusercontent.com/6023235/140647437-54c8f8bc-9d5e-4ef8-9b7a-1982d2066c7c.png)

## Build and Run

- Install madge `npm -g install madge`
  - tool to scan entires and generate source files
- Run `docker-compose up` to start Neo4j instance
- Run `npm install`
- Run `npm run barista` **not work**
- Wait while graph is brewing...
- Graph is ready to use `http://localhost:7474`

## Graph

- user/password: neo4j/barista
- schema:
  - `Folder` - `IN` -> `Folder`
  - `File` - `FROM` -> `Folder`
  - `File` - `DEPENDS_ON` -> `File`
![schema](/docs/img/schema.png)

## Cypher

When Barista create a graph you can mind some data insights from it.
In `cypher` folder we collect some initial list of queries good to start with.

List of queries:
- [level-dependency.cql](./cypher/level-dependency.cql)
  - use `[:DEPENDS_ON*1..N]` to look deep in nested dependencies
