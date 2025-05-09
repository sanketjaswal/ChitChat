SELECT * FROM conversations AS c JOIN partipants AS p ON  p.conversationid = c.id WHERE p.userid = '5'

SELECT u.* FROM Users u JOIN Participants p ON u.id = p.userId WHERE p.conversationId IN (
    SELECT conversationId
    FROM Participants
    WHERE userId = $1
)
AND u.id != $1;