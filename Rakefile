require 'colorize'

COMPILER    = "sass"
SOURCES     = "sass/"
DOC_ASSETS  = "templates/"
TARGET      = "#{DOC_ASSETS}/style/"
HR          = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"


# compile sass & copy files into build/
task :compile do
	
	Dir.mkdir(TARGET) unless Dir.exists?(TARGET)

	# desktop
	puts
	puts "#{HR}"
	puts "Compiling Sassquatch for desktop".yellow
	puts "#{HR}"
	sh "#{COMPILER} -q #{SOURCES}/sassquatch.scss #{TARGET}/sassquatch.css --style=compressed" do |ok, status|
		if ! ok
			fail "Could not compile Sassquatch (status = #{status.exitstatus})".red
		end
	end

	# mobile
	puts
	puts "#{HR}"
	puts "Compiling Sassquatch for mobile".yellow
	puts "#{HR}"
	sh "#{COMPILER} -q #{SOURCES}/sassquatch_mobile.scss #{TARGET}/sassquatch_mobile.css --style=compressed" do |ok, status|
		if ! ok
			fail "Could not compile Sassquatch Mobile (status = #{status.exitstatus})"
		end
	end

	## tests
	#puts
	#puts "#{HR}"
	#puts "Compiling tests"
	#puts "#{HR}"
	#sh "#{COMPILER} -q #{SOURCES}/sassquatch_tests.scss #{DOC_ASSETS}/sassquatch_tests.css"
end


# start jekyll
task :docs do
	puts
	puts "#{HR}"
	puts "Building Hologram Docs...".yellow
	puts "#{HR}"
	sh "hologram" do |ok, status|
		if ! ok
			puts "#{status}"
			fail "Could not build hologram docs (status = #{status.exitstatus})"
		end
	end
end


# local dev build
task :default do

    Rake::Task['compile'].execute
    Rake::Task['docs'].execute

    puts
    puts "BUILD COMPLETE".green
    puts
end


# LAUNCH - syncs master with the gh-pages branch;
# rebuilds LIVE github documentation page
#task :push_docs do
	#puts
	#puts "Rebuilding SassQuatch github pages"
	#puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

	#Rake::Task['compile'].execute

	#branch = `git rev-parse --abbrev-ref HEAD`

	#if "#{branch}" == "master\n"
		#sh "rm -rf .sass-cache"
		#sh "git checkout gh-pages"
		#sh "git pull"
		#sh "git checkout master _site/"
		#sh "cp -r _site/ ./"
		#sh "rm -rf _site/"
		#sh "git add ."
		#sh "git commit -a -m \"update live docs\""
		#sh "git push"
		#sh "git checkout master"

		#puts
		#puts "#{HR}"
		#puts "Succesfully updated docs in gh-pages\n"
		#puts "Check http://meetup.github.io/sassquatch\n"
		#puts "(sometimes github takes a few minutes to rebuild the page)\n"
		#puts "#{HR}"
		#puts
	#else
		#puts
		#puts "WARNING: you're not on master."
		#puts "see launch instructions at https://github.com/meetup/sassquatch"
		#puts
		#puts "BUILD FAILED"
		#puts
	#end
#end
