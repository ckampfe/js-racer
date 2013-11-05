get '/' do
  erb :index
end

post '/users' do
  # check that both players entered names
  if params[:nick1].empty? || params[:nick2].empty?
    return 'Both players must have nicknames'
  end

  users = [ params[:nick1], params[:nick2] ]

  for user in users do
    if Player.where("nickname = ?", user).count > 0
      return "#{user} invalid. pick another another name"
    end
  end

  players = []

  for user in users do
    players << Player.create(:nickname => user)
  end

  # if successful, create a new game and send players to
  # erb :racer

  # g = Game.create

  erb :racer
end

post '/winner' do
  # log winner into game row
  # log winning time into game row
end
