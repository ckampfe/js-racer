class Player < ActiveRecord::Base
  validates :nickname, :uniqueness => true
  has_many :players_games
  has_many :games, :through => :players_games
end
