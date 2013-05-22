COMPILER    = "sass"
SOURCES     = "src/sassquatch"
TARGET      = "build"
DOC_ASSETS  = "docs/css"
HR          = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"


# compile sass & copy files into build/
task :compile do
    # desktop 
    puts
    puts "#{HR}"
    puts "Compiling SassQuatch for desktop" 
    puts "#{HR}"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/desktop/_sassquatch.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/desktop/sassquatch.css --style compressed"

    # mobile
    puts
    puts "#{HR}"
    puts "Compiling SassQuatch for mobile" 
    puts "#{HR}"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/mobile/_sassquatch_m.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/mobile/sassquatch_m.css --style compressed"
end


# copy built css files into docs/
task :docs do
    puts
    puts "#{HR}"
    puts "Copying assets for docs" 
    puts "#{HR}"
    sh "cp #{TARGET}/desktop/sassquatch.css #{DOC_ASSETS}/sassquatch.css" 
    sh "cp #{TARGET}/mobile/sassquatch_m.css #{DOC_ASSETS}/sassquatch_m.css" 
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
task :ghpages do
    puts
    puts "Rebuilding SassQuatch github pages" 
    puts "\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\=\="

    Rake::Task['compile'].execute
    Rake::Task['docs'].execute

    branch = `git rev-parse --abbrev-ref HEAD`

    if "#{branch}" == "master\n"
        sh "git checkout gh-pages"
        sh "git checkout master docs/"
        sh "mv docs/css/ ./css/"
        sh "mv docs/index.html index.html"
        sh "rm -r docs/"
        sh "git add ."
        sh "git commit -a -m \"update live docs\""
        sh "git push"
        sh "git checkout master"

        puts
        puts "#{HR}"
        puts "Succesfully updated docs in gh-pages\n"
        puts "Check http://meetup.github.io/sassquatch\n"
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
