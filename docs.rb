require 'sinatra'
require 'kalei/app'

map '/docs' do
	run Kalei::App
end
