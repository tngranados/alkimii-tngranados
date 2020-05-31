json.id note.id
json.created_at l(note.created_at, format: :default)
json.updated_at l(note.updated_at, format: :default)
json.title note.title
json.message note.message
json.user_id note.user.id
json.user_email note.user.email
