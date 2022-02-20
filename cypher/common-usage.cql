// Common folder consumers
MATCH (s:File)<-[:DEPENDS_ON*]-(consumer:File)
WHERE s.name =~ 'common.*'
RETURN DISTINCT s.name as subject,
collect(DISTINCT consumer.name) as consumers