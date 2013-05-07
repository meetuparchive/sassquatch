COMPILER = "sass"
SOURCES  = "src/sassquatch"
TARGET   = "build"

task :default do

    # desktop 
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/desktop/_sassquatch.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/desktop/sassquatch.css --style compressed"

    #mobile
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/mobile/_sassquatch_m.scss"
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/mobile/sassquatch_m.css --style compressed"

end
