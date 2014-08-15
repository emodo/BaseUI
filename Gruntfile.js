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
			dist: ['dist'],
			svg:['less/svg']
		},
		less: {
			compileCore: {
				options: {
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
		jshint: {
			options: {
				jshintrc: 'scripts/.jshintrc'
			},
			src: ['scripts/base.funs.js','scripts/base.events.js']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			baseui: {
				src: [
					'scripts/jquery-1.11.1.js',
					'scripts/base.funs.js',
					'scripts/base.events.js'
				],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			baseui: {
				src: '<%= concat.baseui.dest %>',
				dest: 'dist/js/<%= pkg.name %>.min.js'
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
			src: {
				files: '<%= jshint.src %>',
				tasks: ['jshint:src']
			},
			less: {
				files: ['less/*.less', 'less/template/*.less'],
				tasks: ['less', 'cssmin']
			}
		},
		svgcompactor: {
		  all: {
		    source: 'img',
		    target: 'less/svg',
		    outputname: 'baseui'
		  }
		}
	})

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});
	require('time-grunt')(grunt);

	// CSS distribution task.
	grunt.registerTask('dist-css', ['less:compileCore', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);

	// JS distribution task.
	grunt.registerTask('test', ['csslint', 'jshint']);
	grunt.registerTask('dist-js', ['concat', 'uglify']);
	grunt.registerTask('svg', ['clean:svg','svgcompactor']);
	// Full distribution task.
	grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts','dist-js','test', 'watch' ]);

	// Default task.
	grunt.registerTask('default', ['dist']);
}