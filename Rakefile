require 'colorize'

COMPILER               = "sass"
SOURCES                = "sass/"
DOC_SRC_DESKTOP        = "hologram/desktop/"
DOC_SRC_MOBILE         = "hologram/mobile/"
CSS_TARGET_DESKTOP     = "#{DOC_SRC_DESKTOP}sassquatch/sassquatch.css"
CSS_TARGET_MOBILE      = "#{DOC_SRC_MOBILE}sassquatch/sassquatch.css"
COMPILED_DESKTOP_DOCS  = "doc_desktop/"
COMPILED_MOBILE_DOCS   = "doc_mobile/"
HR                     = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"

desc "compiles sass"
task :sass do

	# desktop
	puts
	puts "#{HR}"
	puts "Compiling Sassquatch for desktop".yellow
	puts "#{HR}"
	sh "#{COMPILER} -q #{SOURCES}/sassquatch.scss #{CSS_TARGET_DESKTOP} --style=expanded" do |ok, status|
		if ! ok
			fail "Could not compile Sassquatch (status = #{status.exitstatus})".red
		end
	end

	# mobile
	puts
	puts "#{HR}"
	puts "Compiling Sassquatch for mobile".yellow
	puts "#{HR}"
	sh "#{COMPILER} -q #{SOURCES}/sassquatch_mobile.scss #{CSS_TARGET_MOBILE} --style=expanded" do |ok, status|
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


desc "compiles hologram docs"
task :hologram do
	
	# desktop
	Dir.chdir("#{DOC_SRC_DESKTOP}") do
		puts
		puts "#{HR}"
		puts "Building Hologram docs for desktop...".yellow
		puts "#{HR}"
		sh "hologram" do |ok, status|
			if ! ok
				puts "#{status}"
				fail "Could not build desktop hologram docs (status = #{status.exitstatus})"
			end
		end
	end

	# mobile
	Dir.chdir("#{DOC_SRC_MOBILE}") do
		puts
		puts "#{HR}"
		puts "Building Hologram docs for mobile...".yellow
		puts "#{HR}"
		sh "hologram" do |ok, status|
			if ! ok
				puts "#{status}"
				fail "Could not build mobile hologram docs (status = #{status.exitstatus})"
			end
		end
	end

end


desc "local dev build (compile sass and hologram docs)"
task :default do

    Rake::Task['sass'].execute
    Rake::Task['hologram'].execute

    puts
    puts "BUILD COMPLETE".green
    puts
end


desc "rebuilds LIVE github documentation page, optional branch argument"
task :push_docs do
	puts
	puts "Rebuilding SassQuatch github pages"
	puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

	branch = `git rev-parse --abbrev-ref HEAD`.strip

	do_it = branch == "master" or branch == "dev"

	#if !do_it
		#puts "do you want to build the docs for #{branch}? [y/n]".yellow
		#do_it = $stdin.gets.chomp == "y"
	#end

	#if branch == "master"
	if true

		docs_path = branch == "master" ? "" : "branches/#{branch}"

		sh "git pull origin #{branch}"
		sh "git checkout gh-pages"
		sh "git pull origin gh-pages"

		sh "git checkout #{branch} hologram/"

		Rake::Task['sass'].execute
		Rake::Task['hologram'].execute

		sh "git add -A"
		sh "git commit -m \"update live docs (#{branch} branch)\""
		sh "git push origin gh-pages"
		sh "git checkout #{branch}"

		puts
		puts "#{HR}"
		puts "Succesfully updated docs in gh-pages\n".green
		puts "http://meetup.github.io/sassquatch/doc_desktop\n".yellow
		puts "http://meetup.github.io/sassquatch/doc_mobile\n".yellow
		puts "(sometimes github takes a few minutes to rebuild the page)\n"
		puts "#{HR}"
		puts

	else
		puts "You can only push to gh-pages docs from master".red
	end

end
