module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-hologram');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-preprocess');

	var FILE_NAME_HOLOGRAM_CONFIG = 'hologram_config.yml';

	var path = {};

	path.srcHologramDweb = 'hologram/desktop/';
	path.srcHologramMweb = 'hologram/mobile/';
	path.destHologramDweb = 'doc_desktop/';
	path.destHologramMweb = 'doc_mobile/';

	path.srcSassDweb = 'sass/sassquatch.scss';
	path.srcSassMweb = 'sass/sassquatch_mobile.scss';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),
		'sass': {
			dist: {
				files: [
					{ "doc_desktop/sassquatch/sassquatch.css": path.srcSassDweb },
					{ "doc_mobile/sassquatch/sassquatch.css": path.srcSassMweb },
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
		/*
		 *'gh-pages': {
		 *   options: {
		 *      base: DIR_BUILD
		 *   },
		 *   src: ['**']
		 *}
		 */
		/*
		 *'clean': {
		 *   docs: [DIR_BUILD],
		 *   css: [DIR_DOC_SRC + 'templates/css/sassquatch.css']
		 *}
		 */
		/*
		 *'wiredep': {
		 *   'sass': {
		 *      src: ["sass/_util.scss"]
		 *   }
		 *}
		 */
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
		}
	});

	grunt.registerTask('docs', ['hologram:desktop', 'preprocess:desktop', 'hologram:mobile', 'preprocess:mobile']);
	grunt.registerTask('default', ['sass', 'docs']);
	//grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
