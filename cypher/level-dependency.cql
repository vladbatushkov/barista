MATCH (s:File)-[:DEPENDS_ON]->(d:File)<-[:DEPENDS_ON]-(c:File)
WHERE s.name =~ 'home/.*' // files from home folder
  AND NOT d.name =~ 'common/.*' // ignore dependencies from common folder
  AND NOT c.name =~ 'home/.*' // ignore consumers from home folder
WITH DISTINCT s.name as subject,
d.name as dependency,
collect(DISTINCT c.name) as consumers
RETURN subject,
  dependency,
  size(consumers) as consumers_count,
  consumers as consumers_detials
ORDER BY consumers_count DESC