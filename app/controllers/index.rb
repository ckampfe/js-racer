get '/' do
  erb :index
end

post '/users' do
  # check that both players entered names
  if params[:nick1].empty? || params[:nick2].empty?
    return 'Both players must have nicknames'
  end

  users = { :player1 => params[:nick1].chomp,
            :player2 => params[:nick2].chomp }

  @player1 = users[:player1]
  @player2 = users[:player2]

  puts users.inspect

#  users.each_pair do |player, player_name|
#    if Player.where("nickname = ?", users[player]).count > 0
#      puts player_name
#      return "#{player_name} invalid. pick another another name"
#    end
#  end

  # if successful, create a new game and send players to
  # erb :racer

  game = Game.create
  @game_id = game.id

  users.each_pair do |player, player_name|

    puts Player.find_by_nickname(player_name)

    begin
      game.players << Player.create(:nickname => player_name)
    rescue
      game.players << Player.find_by_nickname(player_name)
    end
  end

  erb :racer
end

post '/winner' do
  if request.xhr?
    @winner = params["#{params[:winner]}"]
    winner_id = Player.where("nickname = ?", @winner)[0].id
    @winner_games = Player.find(winner_id).games.count
    game_id = params[:gameId].to_i
    game = Game.find(game_id)
    game.winner_id = winner_id
    game.save

    erb :_stats, :layout => false
  end
end
