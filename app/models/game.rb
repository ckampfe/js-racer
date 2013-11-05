class Game < ActiveRecord::Base
  validate :max_players, :on => :update

  def max_players
    if self.players.count >= 2
      errors.add(:players, "can't have more than 2 players")
    end
  end

  has_many :players_games
  has_many :players, :through => :players_games


end
