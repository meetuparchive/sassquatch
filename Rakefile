COMPILER 	= "compass"
SOURCES     	= "sass/"
TARGET      	= "css"
JEKYLL_DIR  	= "jekyll_docs"
DOC_ASSETS  	= "#{JEKYLL_DIR}/assets/css"
HR          	= "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"

# compile sass & copy files into build/
task :compile do
	# compass compile
	puts
	puts "#{HR}"
	puts "Compass compile"
	puts "#{HR}"
	sh "#{COMPILER} clean"
	sh "#{COMPILER} compile"

	# compile docs
	puts
	puts "#{HR}"
	puts "Building docs"
	puts "#{HR}"
	sh "cp #{TARGET}/sassquatch.css #{DOC_ASSETS}/sassquatch.css"
	sh "cp #{TARGET}/sassquatch_mobile.css #{DOC_ASSETS}/sassquatch_mobile.css"
	sh "jekyll build -s #{JEKYLL_DIR}"
end


# start jekyll
task :jekyll do
	puts
	puts "#{HR}"
	puts "STARTING JEKYLL..."
	puts "#{HR}"
	sh "jekyll serve -s #{JEKYLL_DIR} --watch"
end


# local dev build
task :default do

    Rake::Task['compile'].execute
    Rake::Task['jekyll'].execute

    puts
    puts "YOU BUILD IS SUCCESS"
    puts
end


desc "rebuilds LIVE github documentation page, optional branch argument"
task :push_docs do
	puts
	puts "Rebuilding SassQuatch github pages"
	puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

	Rake::Task['compile'].execute

	branch = `git rev-parse --abbrev-ref HEAD`.strip

	do_it = branch == "master" or branch == "dev"
	if !do_it
		puts "Do you want to build the docs for #{branch}? [y/n]"
		do_it = $stdin.gets.chomp == "y"
	end

	if do_it
		docs_path = branch == "master" ? "" : "branches/#{branch}"
		sh "rm -rf .sass-cache"
		sh "git checkout gh-pages"
		sh "git pull origin gh-pages"
		sh "git checkout #{branch} _site/"
		sh "cp -r _site/ ./#{docs_path}"
		sh "rm -rf _site/"
		sh "git add -A"
		sh "git commit -m \"update live docs (#{branch} branch)\""
		sh "git push origin gh-pages"
		sh "git checkout #{branch}"

		puts
		puts "#{HR}"
		puts "Succesfully updated docs in gh-pages\n"
		puts "Check http://meetup.github.io/sassquatch/#{docs_path}\n"
		puts "(sometimes github takes a few minutes to rebuild the page)\n"
		puts "#{HR}"
		puts
	end
end
