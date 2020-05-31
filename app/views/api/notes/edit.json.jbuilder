json.note do
  json.id @note.id
  json.title @note.title
  json.message @note.message
  json.user_id @note.user
end
