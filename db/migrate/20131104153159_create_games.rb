class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.timestamps
    end

  add_column :games, :winner_id, :integer
  add_column :games, :winning_time, :string
  end
end
