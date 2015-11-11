module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-hologram');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-exec');

	var FILE_NAME_HOLOGRAM_CONFIG = 'hologram_config.yml';

	var path = {};

	path.build = 'build/';

	path.hologram = 'hologram/'
	path.srcHologramDweb = path.hologram + 'desktop/';
	path.srcHologramMweb = path.hologram + 'mobile/';
	path.destHologramDweb = path.build + 'doc_desktop/';
	path.destHologramMweb = path.build + 'doc_mobile/';

	path.srcSassDweb = 'sass/sassquatch.scss';
	path.srcSassMweb = 'sass/sassquatch_mobile.scss';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),
		'sass': {
			dist: {
				files: [
					{ "build/doc_desktop/sassquatch/sassquatch.css": path.srcSassDweb },
					{ "build/doc_mobile/sassquatch/sassquatch.css": path.srcSassMweb },
				]
			}
		},
		'hologram': {
			desktop: {
				options: {
					config: path.srcHologramDweb + FILE_NAME_HOLOGRAM_CONFIG
				}
			},
			mobile: {
				options: {
					config: path.srcHologramMweb + FILE_NAME_HOLOGRAM_CONFIG
				}
			}
		},
		'clean': {
			all: [path.build]
		},
		'preprocess': {
			all: {
				src: [ path.build + '*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= bower.version %>'
					}
				}
			}
		},
		'exec': {
			copy_index: {
				command: 'cp ' + path.hologram + 'index.html ' + path.build + 'index.html',
				stdout: false,
				stderr: false
			}
		},
		'gh-pages': {
			options: {
				base: path.build
			},
			src: ['**']
		},
		'wiredep': {
			'sass': {
				src: ["sass/_utils.scss"]
			}
		}
	});

	grunt.registerTask('docs', ['hologram:desktop', 'hologram:mobile', 'exec:copy_index', 'preprocess']);
	grunt.registerTask('default', ['wiredep', 'clean', 'sass', 'docs']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
