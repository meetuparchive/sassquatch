COMPILER    = "sass"
SOURCES     = "src/sassquatch"
TARGET      = "build"
DOC_ASSETS  = "docs/css"

HR = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"

# compile
task :default do

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

    # docs (local/master only - to update the live github pages docs, use the :ghpages task)
    puts
    puts "#{HR}"
    puts "Building (local) docs" 
    puts "#{HR}"
    sh "cp #{TARGET}/desktop/sassquatch.css #{DOC_ASSETS}/sassquatch.css" 
    sh "cp #{TARGET}/mobile/sassquatch_m.css #{DOC_ASSETS}/sassquatch_m.css" 

    puts
    puts "YOU BUILD IS SUCCESS"
    puts
end

# TODO: task to sync sassquatch docs on gh-pages with master
task :ghpages do
end
