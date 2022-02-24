// Detect dependencies from the outside
UNWIND ['module1.*', 'module2.*', 'module3.*'] as module
CALL {
  WITH module
  MATCH (s:File)-[:DEPENDS_ON]->(d:File)
  WHERE s.name =~ module
  	AND NOT d.name =~ module
  	AND NOT d.name =~ 'common.*'
  RETURN DISTINCT s.name as subject,
  d.name as dependency
}
RETURN subject, dependency
ORDER BY subject