require 'colorize'
require 'json'
require 'nokogiri'

COMPILER               = "sass"
SOURCES                = "sass/"
DOC_SRC_DESKTOP        = "hologram/desktop/"
DOC_SRC_MOBILE         = "hologram/mobile/"
CSS_TARGET_DESKTOP     = "#{DOC_SRC_DESKTOP}sassquatch/sassquatch.css"
CSS_TARGET_MOBILE      = "#{DOC_SRC_MOBILE}sassquatch/sassquatch.css"
COMPILED_DESKTOP_DOCS  = "doc_desktop/"
COMPILED_MOBILE_DOCS   = "doc_mobile/"
HR                     = "\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~\~"
Pkg                    = JSON.parse( File.read('bower.json') )

def prettyPrint( message )
	puts ["", "#{HR}", message.yellow, "#{HR}"]
end

def doSass( platform, source, target )
	prettyPrint( "Compiling Sassquatch for #{platform}" )

	if platform.eql? "mobile"
		basefile = "sassquatch_mobile.scss"
	else
		basefile = "sassquatch.scss"
	end

	sh "#{COMPILER} -q #{source}/#{basefile} #{target} --style=expanded" do |ok, status|
		if ! ok
			fail "Could not compile Sassquatch #{platform} (status = #{status.exitstatus})".red
		end
	end
end

def doHologram( platform, source, target )

	Dir.chdir(source) do
		prettyPrint( "Building Hologram docs for #{platform}..." )

		sh "hologram" do |ok, status|
			if ! ok
				puts "#{status}"
				fail "Could not build #{platform} hologram docs (status = #{status.exitstatus})"
			end
		end

	end

	Dir.chdir(target) do
		FileList.new('*.html').each do |file|
			doc = Nokogiri::HTML(open(file))
			doc.css('.version').xpath('text()').each do |el|
				el.content = "#{Pkg['version']}"
			end
			doc.write_to(open(file, 'w'))
		end
	end

	sh "cp -r #{source}pages/. #{target}"
end


desc "compiles sass"
task :sass do
	doSass( "desktop", SOURCES, CSS_TARGET_DESKTOP )
	doSass( "mobile", SOURCES, CSS_TARGET_MOBILE )
end


desc "compiles hologram docs"
task :hologram do
	doHologram( "desktop", DOC_SRC_DESKTOP, COMPILED_DESKTOP_DOCS )
	doHologram( "mobile", DOC_SRC_MOBILE, COMPILED_MOBILE_DOCS )
end


desc "local dev build (compile sass and hologram docs)"
task :default do

    Rake::Task['sass'].execute
    Rake::Task['hologram'].execute

    puts ["", "BUILD COMPLETE".green, ""]
end


desc "rebuilds LIVE github documentation page"
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

	if branch == "master"

		docs_path = branch == "master" ? "" : "branches/#{branch}"

		sh "git pull origin #{branch}"
		sh "git checkout gh-pages"
		sh "git pull origin gh-pages"

		sh "git checkout #{branch} -- sass/"
		sh "git checkout #{branch} -- hologram/"

		sh "cp hologram/index.html ./index.html"

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
