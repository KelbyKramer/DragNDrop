class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :info
      t.integer :postion

      t.timestamps
    end
  end
end
