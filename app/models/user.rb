class User < ApplicationRecord
  has_many :notes, dependent: :destroy
  devise :database_authenticatable, :validatable
end
