'use strict';

module.exports = function(grunt) {

	var pkg, taskName;

	pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		// 出力フォルダ(デフォルトは dev/ 以下)
		dir: 'dev',
		// Bowerでインストールしたライブラリの配置
		bower: {
			lib: {
				options: {
					targetDir: '<%= dir %>/lib/',
					layout: function(dir, component, source) {
						return component + '/' + dir;
					}
				}
			}
		},
		// SCSSのビルド
		sass: {
			options: {
				sourcemap: 'none',
				unixNewlines: true,
				style: 'expanded',
				bundleExec: true,
				loadPath: []
			},
			assets: {
				files: [{
					expand: true,
					cwd: 'src/scss/',
					src: '**/*.scss',
					dest: '<%= dir %>/assets/css/',
					ext: '.css'
				}]
			}
		},
		// SCSSのLinter
		scsslint: {
			options: {
				bundleExec: true,
				config: 'src/scss/.scss-lint.yml',
				reporterOutput: null,
				colorizeOutput: true
			},
			assets: ['src/scss/*.scss']
		},
		// ベンダープレフィックス
		postcss: {
			autoprefixer: {
				options: {
					map: false,
					processors: [
						require('autoprefixer')({
							browsers: [
								'Android 2.3',
								'Android >= 4',
								'Chrome >= 20',
								'Firefox >= 24',
								'Explorer >= 8',
								'iOS >= 6',
								'Opera >= 12',
								'Safari >= 6'
							]
						})
					]
				},
				expand: true,
				cwd: '<%= dir %>/assets/css/',
				src: ['**/*.css'],
				dest: '<%= dir %>/assets/css/',
				ext: '.css'
			}
		},
		// CSSのプロパティソート
		csscomb: {
			options: {
				config: 'src/scss/.csscomb.json'
			},
			assets: {
				expand: true,
				cwd: '<%= dir %>/assets/css/',
				src: ['**/*.css'],
				dest: '<%= dir %>/assets/css/',
				ext: '.css'
			}
		},
		// CSSのminify
		cssmin: {
			options: {
				compatibility: 'ie9',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			assets: {
				files: [
					{
						expand: true,
						cwd: '<%= dir %>/assets/css/',
						src: ['**/*.css', '!**/*.min.css'],
						dest: '<%= dir %>/assets/css/',
						ext: '.css'
					}
				]
			}
		},
		// JavaScript構文チェック (eslint)
		eslint: {
			assets: ['src/js/*.js']
		},
		// JavaScriptのminify
		uglify: {
			options: {
				compress: {
					warnings: false
				},
				mangle: true,
				preserveComments: 'some'
			},
			assets: {
				files: [
					{
						expand: true,
						cwd: '<%= dir %>/assets/js',
						src: ['**/*.js', '!**/*.min.js'],
						dest: '<%= dir %>/assets/js/',
						ext: '.js'
					}
				]
			}
		},
		// 画像最適化
		image: {
			assets: {
				files: [{
					expand: true,
					cwd: '<%= dir %>/assets/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '<%= dir %>/assets/img/'
				}]
			}
		},
		copy: {
			js: {
				expand: true,
				cwd: 'src/js/',
				src: ['**/*'],
				dest: '<%= dir %>/assets/js/'
			},
			img: {
				expand: true,
				cwd: 'src/img/',
				src: ['**/*'],
				dest: '<%= dir %>/assets/img/'
			},
			lib: {
				expand: true,
				cwd: 'src/lib/',
				src: ['**/*', '!**/.gitkeep'],
				dest: '<%= dir %>/lib/'
			},
			dist: {
				expand: true,
				cwd: 'dev/',
				src: ['**/*', '!assets/**/*', '!lib/**/*'],
				dest: 'dist/'
			}
		},
		// Clean
		clean: {
			bower: {
				src: ['bower_components/**/*']
			},
			assets: {
				src: ['<%= dir %>/assets/**/*']
			},
			lib: {
				src: ['<%= dir %>/lib/**/*']
			},
			dist: {
				src: ['dist/**/*']
			}
		},
		// watch task
		watch: {
			scss: {
				files: ['src/scss/**/*.scss'],
				tasks: ['scsslint:assets', 'build-css']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['eslint:assets', 'build-js']
			},
			img: {
				files: ['src/img/**/*.{png,jpg,gif,svg}'],
				tasks: ['build-img']
			},
			lib: {
				files: ['src/lib/**/*'],
				tasks: ['copy:lib']
			},
			configFiles: {
				files: [
					'Gruntfile.js',
					'package.json',
					'src/scss/.csscomb.json',
					'src/scss/.scss-lint.yml',
					'src/js/.eslintrc'
				],
				options: {
					reload: true
				}
			}
		}
	});

	for (taskName in pkg.devDependencies) {
		if (taskName.substring(0, 6) === 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	// 出力フォルダをdistに切り替えるタスク
	// まったく同じタスクを dev/ と dist/ で書く手間がなくなる
	grunt.task.registerTask('release', 'Switch release mode', function() {
		grunt.config.merge({
			dir: 'dist'
		});
	});

	grunt.registerTask('default', []);

	// Inital
	grunt.registerTask('init', ['clean:bower', 'clean:assets', 'clean:lib']);

	// Test Task
	grunt.registerTask('test', ['scsslint:assets', 'eslint:assets']);

	// Library Install
	grunt.registerTask('lib', ['bower:lib', 'copy:lib']);

	// Optimize Task
	grunt.registerTask('opt-assets', ['cssmin:assets', 'uglify:assets', 'image:assets']);

	// Build
	// CSS
	grunt.registerTask('build-css', ['sass:assets', 'postcss:autoprefixer', 'csscomb:assets']);
	// JavaScript
	grunt.registerTask('build-js', ['copy:js']);
	// Image
	grunt.registerTask('build-img', ['copy:img']);
	// Bundle Build Task
	grunt.registerTask('build', ['build-css', 'build-js', 'build-img']);

	// Develop
	grunt.registerTask('dev', ['init', 'lib', 'build', 'watch']);

	// Release
	grunt.registerTask('dist', ['release', 'init', 'test', 'lib', 'build', 'opt-assets', 'copy:dist']);


	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
