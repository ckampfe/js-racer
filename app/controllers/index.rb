get '/' do
  erb :index
end

post '/users' do
  # check that both players entered names
  if params[:nick1].empty? || params[:nick2].empty?
    return 'Both players must have nicknames'
  end

  users = { :player_1 => params[:nick1],
            :player_2 => params[:nick2] }

  users.each_pair do |player, player_name|
    if Player.where("nickname = ?", player_name).count > 0
      return "#{user} invalid. pick another another name"
    end
  end

  # if successful, create a new game and send players to
  # erb :racer

  @g = Game.create

  for user in users do
    g.players << Player.create(:nickname => user)
  end

  erb :racer
end

post '/winner' do
  # log winner into game row
  @g[:winner_id] = Player.find_by_nickname(params[:winner]).id
  puts @g
  # log winning time into game row
  @g[:winning_time] = params[:winning_time]
  puts @g
end
