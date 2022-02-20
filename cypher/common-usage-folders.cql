// Common folder consumers as folders
MATCH (s:File)<-[*]-()-->(consumer:Folder)
WHERE s.name =~ 'common.*'
RETURN DISTINCT s.name as subject,
collect(DISTINCT consumer.name) as consumers