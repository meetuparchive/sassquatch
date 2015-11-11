module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-hologram');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-preprocess');

	var FILE_NAME_HOLOGRAM_CONFIG = 'hologram_config.yml';

	var path = {};

	path.build = 'build/';

	path.srcHologramDweb = 'hologram/desktop/';
	path.srcHologramMweb = 'hologram/mobile/';
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
			desktop: {
				src: [ path.destHologramDweb + '*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= bower.version %>'
					}
				}
			},
			mobile: {
				src: [ path.destHologramMweb + '*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= bower.version %>'
					}
				}
			}
		},
		'gh-pages': {
			options: {
				base: path.build
			},
			src: ['**']
		}
		/*
		 *'wiredep': {
		 *   'sass': {
		 *      src: ["sass/_util.scss"]
		 *   }
		 *}
		 */
	});

	grunt.registerTask('docs', ['hologram:desktop', 'preprocess:desktop', 'hologram:mobile', 'preprocess:mobile']);
	grunt.registerTask('default', ['clean', 'sass', 'docs']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
