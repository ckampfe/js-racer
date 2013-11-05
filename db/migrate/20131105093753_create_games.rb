class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :winner_id
      t.string :winning_time

      t.timestamps
    end
  end
end
