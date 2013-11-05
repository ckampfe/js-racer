require 'faker'

10.times do
  g = Game.create
  2.times { g.players << Player.create(:nickname => Faker::Name.first_name) }
end