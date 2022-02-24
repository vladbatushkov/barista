// Detect n-deep dependencies from the outside
UNWIND ['module1.*', 'module2.*', 'module3.*'] as module
CALL {
  WITH module
  MATCH (s:File)-[:DEPENDS_ON*]->(d:File)
  WHERE s.name =~ module
  	AND NOT d.name =~ module
  	AND NOT d.name =~ 'common.*'
  RETURN DISTINCT s.name as subject,
  collect(DISTINCT d.name) as dependencies
}
RETURN subject, dependencies
ORDER BY subject