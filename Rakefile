COMPILER = "sass"
SOURCES  = "src/sassquatch"
TARGET   = "build"

task :default do

    # desktop 
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch.scss #{TARGET}/desktop/sassquatch.css"
    sh "cp #{TARGET}/desktop/sassquatch.css #{TARGET}/desktop/_sassquatch.scss"

    #mobile
    sh "#{COMPILER} -q #{SOURCES}/_sassquatch_m.scss #{TARGET}/mobile/sassquatch_m.css"
    sh "cp #{TARGET}/mobile/sassquatch_m.css #{TARGET}/mobile/_sassquatch_m.scss"

end
