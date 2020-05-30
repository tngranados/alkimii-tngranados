json.user do
  json.id @user.id
  json.email @user.email
  json.is_admin @user.is_admin
end
