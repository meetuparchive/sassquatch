module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-hologram');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-preprocess');

	var path = {};
	path.srcHologramDweb = 'hologram/desktop';
	path.srcHologramMweb = 'hologram/mobile';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),
		'sass': {
			dist: {
				files: [
					{ "doc_desktop/sassquatch/sassquatch.css": "sass/sassquatch.scss" },
					{ "doc_mobile/sassquatch/sassquatch.css": "sass/sassquatch_mobile.scss" },
				]
			}
		},
		'hologram-desktop': {
			generate: {
				options: {
					config: path.srcHologramDweb + 'hologram_config.yaml'
				}
			}
		},
		'hologram-mobile': {
			generate: {
				options: {
					config: path.srcHologramMweb + 'hologram_config.yaml'
				}
			}
		}
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
		/*
		 *'preprocess': {
		 *   inline: {
		 *      src: [ 'docs/build/*.html' ],
		 *      options: {
		 *         inline: true,
		 *         context: {
		 *            DEBUG: false,
		 *            'VERSION': '<%= bower.version %>'
		 *         }
		 *      }
		 *   }
		 *}
		 */
	});

	grunt.registerTask('default', ['sass', 'hologram']);
	//grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
