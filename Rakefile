COMPILER = "sass"
SOURCES  = "src/sassquatch"
TARGET   = "build"

task :default do
  sh "#{COMPILER} -q #{SOURCES}/sassquatch-standalone.scss #{TARGET}/sassquatch.css"
  sh "cp #{TARGET}/sassquatch.css #{TARGET}/_sassquatch.scss"
end
