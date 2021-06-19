Brew Neo4j graph from your client-side codebase using madge

![barista-logo](./barista-logo.png)

## Build and Run

- Install madge `npm -g install madge`
- Run `docker-compose up`
- Run `npm run barista`
- Wait while graph is brewing...
- Graph is ready to use `http://localhost:7474`

## Graph

- user/password: neo4j/barista
- Schema:
  - `Folder` - `IN` -> `Folder`
  - `File` - `FROM` -> `Folder`
  - `File` - `DEPENDS_ON` -> `File`
![schema](./schema.png)

## Cypher

Once you have a graph you can mind some data insights from it.
In `cypher` folder we collect some initial list of queries good to start with.

List of queries:
- [level-dependency.cql](./cypher/level-dependency.cql)
  - use `[:DEPENDS_ON*1..N]` to look deep in nested dependencies
