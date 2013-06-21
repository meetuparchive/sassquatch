COMPILER    = "sass"
SOURCES     = "src/sassquatch"
TARGET      = "build"
JEKYLL_DIR  = "jekyll_docs/"
DOC_ASSETS  = "#{JEKYLL_DIR}/assets/css"
HR          = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"


# compile sass & copy files into build/
task :compile do
    # desktop 
    puts
    puts "#{HR}"
    puts "Compiling SassQuatch for desktop" 
    puts "#{HR}"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/_sassquatch.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/sassquatch.css --style compressed"

    # mobile
    puts
    puts "#{HR}"
    puts "Compiling SassQuatch for mobile" 
    puts "#{HR}"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/_sassquatch_mobile.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/sassquatch_mobile.css --style compressed"
end


# copy built css files into docs/
task :docs do
	puts
	puts "#{HR}"
	puts "Copying assets for docs" 
	puts "#{HR}"
	sh "cp #{TARGET}/desktop/sassquatch.css #{DOC_ASSETS}/sassquatch.css"
	sh "cp #{TARGET}/mobile/sassquatch_m.css #{DOC_ASSETS}/sassquatch_mobile.css"

	puts
	puts "#{HR}"
	puts "STARTING JEKYLL..."
	puts "#{HR}"
	sh "jekyll serve -s #{JEKYLL_DIR}"
end


# local dev build
task :default do

    Rake::Task['compile'].execute
    Rake::Task['docs'].execute

    puts
    puts "YOU BUILD IS SUCCESS"
    puts
end


# LAUNCH - syncs master with the gh-pages branch; 
# rebuilds LIVE github documentation page
task :launch do
	puts
	puts "Rebuilding SassQuatch github pages" 
	puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

	Rake::Task['compile'].execute
	Rake::Task['docs'].execute

	branch = `git rev-parse --abbrev-ref HEAD`

	if "#{branch}" == "master\n"
		sh "rm -rf .sass-cache"
		sh "git checkout gh-pages"
		sh "git checkout master jekyll_docs/"
		sh "cp -r jekyll_docs/ ./"
		sh "rm -rf jekyll_docs/"
		sh "git add ."
		sh "git commit -a -m \"update live docs\""
		sh "git push"
		sh "git checkout master"

		puts
		puts "#{HR}"
		puts "Succesfully updated docs in gh-pages\n"
		puts "Check http://meetup.github.io/sassquatch\n"
		puts "(sometimes github takes a few minutes to rebuild the page)\n"
		puts "#{HR}"
		puts
	else
		puts
		puts "WARNING: you're not on master."
		puts "see launch instructions at https://github.com/meetup/sassquatch"
		puts
		puts "BUILD FAILED"
		puts
	end
end
