json.users @users.each do |user|
  json.id user.id
  json.created_at l(user.created_at, format: :default)
  json.email user.email
  json.is_admin user.is_admin
end
