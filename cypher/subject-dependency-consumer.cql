// Find outside dependency for subject, and then find other consumers of same dependency
UNWIND ['module1.*', 'module2.*', 'module3.*'] as module
CALL {
  WITH module
  MATCH (s:File)-[:DEPENDS_ON]->(d:File)<-[:DEPENDS_ON]-(c:File)
  WHERE s.name =~ module
    AND NOT d.name =~ module
    AND NOT d.name =~ 'common/.*'
    AND NOT c.name =~ module
  WITH DISTINCT s.name as subject,
  d.name as dependency,
  collect(DISTINCT c.name) as consumers
  RETURN subject,
    dependency,
    size(consumers) as consumers_count,
    consumers as consumers_detials
}
RETURN subject, dependency, consumers_count, consumers_detials
ORDER BY consumers_count DESC, subject ASC