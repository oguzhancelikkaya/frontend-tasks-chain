module.exports = function(grunt) {
	grunt.initConfig({
		sass:{
			compile: {
				files: {
					'view/css/body.css': 'view/sass/body.scss',
					'view/css/page.css': 'view/sass/page.scss'
				}
			}
		},
		cssmin: {
			compile: {
				files: {
					'build/custom.min.css': ['view/css/body.css', 'view/css/page.css']
				}
			}
		},
		uglify: {
			compile: {
				options: {
					beautify: true
				},
				files: {
					'build/custom.min.js': ['view/js/custom.js']
				}
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
				},
				files: {
					'build/index.html': 'view/index.jade'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('default', ['sass:compile','uglify:compile','cssmin:compile','jade:compile']);
};