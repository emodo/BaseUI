module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
			' * krui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
			' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
			' */\n',
		clean: {
			dist: ['dist']
		},
		less: {
			compileCore: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/<%= pkg.name %>.css': 'less/krui.less',
					'dist/css/starter-template.css': 'less/template/starter-template.less'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},
			core: {
				options: {
					map: true
				},
				src: 'dist/css/<%= pkg.name %>.css'
			}
		},
		csslint: {
			options: {
				csslintrc: 'less/.csslintrc'
			},
			src: [
				'dist/css/krui.css'
			]
		},
		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			core: {
				files: {
					'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
				}
			}
		},
		usebanner: {
			options: {
				position: 'top',
				banner: '<%= banner %>'
			},
			files: {
				src: 'dist/css/*.css'
			}
		},
		csscomb: {
			options: {
				config: 'less/.csscomb.json'
			},
			dist: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css/'
			}
		},
		copy: {
			fonts: {
				expand: true,
				src: 'fonts/*',
				dest: 'dist/'
			}
		},
		watch: {
			less: {
				files: ['less/*.less','less/template/*.less'],
				tasks: ['less','cssmin']
			}
		}
	})
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
	require('time-grunt')(grunt);
	// CSS distribution task.
	grunt.registerTask('less-compile', ['less:compileCore']);
	grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);
	// Full distribution task.
	grunt.registerTask('dist', ['clean', 'dist-css', 'copy:fonts','watch']);

	// Default task.
	grunt.registerTask('default', ['dist']);
}