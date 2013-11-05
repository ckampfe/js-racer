get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/users' do
  # check that both players entered names
  if params[:nick1].empty? || params[:nick2].empty?
    return 'Both players must have nicknames'
  end

  if Player.create(:nickname => params[:nick1]).invalid?
    return 'Player 1 name invalid. Enter another name.'
  end

  if Player.create(:nickname => params[:nick2]).invalid?
    return 'Player 2 name invalid. Enter another name.'
  end

  erb :racer
end

post '/winner' do
  # log winner into game row
  # log winning time into game row
end
