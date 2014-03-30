COMPILER    = "sass"
SOURCES     = "sass/"
TARGET      = "kss/public/stylesheets"
HR          = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"

# compile sass & copy files into build/
task :compile do

	# desktop
	puts
	puts "#{HR}"
	puts "Compiling SassQuatch for desktop"
	puts "#{HR}"
	sh "#{COMPILER} #{SOURCES}/sassquatch.scss #{TARGET}/sassquatch.css --style expanded"

	# mobile
	puts
	puts "#{HR}"
	puts "Compiling SassQuatch for mobile"
	puts "#{HR}"
	sh "#{COMPILER} #{SOURCES}/sassquatch_mobile.scss #{TARGET}/sassquatch_mobile.css --style=expanded"

	# tests
	puts
	puts "#{HR}"
	puts "Compiling tests"
	puts "#{HR}"
	sh "#{COMPILER} #{SOURCES}/sassquatch_tests.scss #{TARGET}/sassquatch_tests.css"

end


# start jekyll
task :localdev do
	puts
	puts "#{HR}"
	puts "STARTING SINATRA..."
	Dir.chdir('.git') do
		bundle exec doc.rb
	end
	puts "#{HR}"
	sh ""
end


# local dev build
task :default do

    Rake::Task['compile'].execute

    puts
    puts "YOU BUILD IS SUCCESS"
    puts
end


#desc "rebuilds LIVE github documentation page, optional branch argument"
#task :push_docs do
	#puts
	#puts "Rebuilding SassQuatch github pages"
	#puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

	#Rake::Task['compile'].execute

	#branch = `git rev-parse --abbrev-ref HEAD`.strip

	#do_it = branch == "master" or branch == "dev"
	#if !do_it
		#puts "Do you want to build the docs for #{branch}? [y/n]"
		#do_it = $stdin.gets.chomp == "y"
	#end

	#if do_it
		#docs_path = branch == "master" ? "" : "branches/#{branch}"
		#sh "rm -rf .sass-cache"
		#sh "git checkout gh-pages"
		#sh "git pull origin gh-pages"
		#sh "git checkout #{branch} _site/"
		#sh "cp -r _site/ ./#{docs_path}"
		#sh "rm -rf _site/"
		#sh "git add -A"
		#sh "git commit -m \"update live docs (#{branch} branch)\""
		#sh "git push origin gh-pages"
		#sh "git checkout #{branch}"

		#puts
		#puts "#{HR}"
		#puts "Succesfully updated docs in gh-pages\n"
		#puts "Check http://meetup.github.io/sassquatch/#{docs_path}\n"
		#puts "(sometimes github takes a few minutes to rebuild the page)\n"
		#puts "#{HR}"
		#puts
	#end
#end
