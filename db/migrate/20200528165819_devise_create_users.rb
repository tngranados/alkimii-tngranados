# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.boolean :is_admin, null: false, default: false
      t.timestamps         null: false
    end

    add_index :users, :email,                unique: true
  end
end
