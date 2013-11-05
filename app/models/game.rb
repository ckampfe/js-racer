class Game < ActiveRecord::Base
  validate :max_players, :on => :update
  has_many :players_games
  has_many :players, :through => :players_games
end
