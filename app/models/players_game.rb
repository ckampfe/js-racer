class PlayersGame < ActiveRecord::Base
  # Remember to create a migration!
  validate :max_players, :on => :create

  def max_players
    if PlayersGame.where("game_id = ?", self.game_id).count >= 2
      errors.add(:players, "can't have more than 2 players")
    end
  end


  belongs_to :player
  belongs_to :game
end
