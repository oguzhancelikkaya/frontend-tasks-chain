module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({
		sass:{
			compile: {
				files: [{
					expand: true,
					cwd: 'view/sass',
					src: ['*.scss', '!*.css'],
					dest: 'view/css',
					ext: '.css'
				}]				
			}
		},
		cssmin: {
			compile: {
				options: {
					beautify: true
				},
				files: {
					'build/custom.min.css': ['view/css/*.css']
				}		
			}
		},
		uglify: {
			compile: {
				options: {
					beautify: true,
					sourceMap : true
				},
				files: {
					'build/custom.min.js': ['view/js/*.js']
				}
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
				},
				files: [{
					expand: true,
					cwd: 'view',
					src: ['*.jade', '!*.html'],
					dest: 'build',
					ext: '.html'
				}]	
			}
		},    
		express: {
			all: {
				options: {
					bases: ['build'],
					port: 8383,
					hostname: "0.0.0.0",
					livereload: true
				}
			}
		},		
		watch: {
			sass: {
				files: ['view/sass/*.scss'],
				tasks: ['sass:compile']
			},
			jade: {
				files: ['view/*.jade'],
				tasks: ['jade:compile'],
			},
			css: {
				files: ['view/css/*.css'],
				tasks: ['cssmin:compile'],
				options: {livereload: true}
			},
			js: {
				files: ['view/js/*.js'],
				tasks: ['uglify:compile'],
				options: {livereload: true}
			},
			html: {
				files: ['build/*.html'],
				options: {livereload: true}
			}			

		},
		open: {
			all: {
				path: 'http://localhost:8383/index.html'
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['sass:compile','uglify:compile','cssmin:compile','jade:compile']);
	
	grunt.registerTask('server', ['express','open','watch']);

};