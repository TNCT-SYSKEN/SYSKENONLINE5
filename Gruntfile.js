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
					targetDir: '<%= dir %>/assets/',
					layout: function(dir, component, source) {
						return dir;
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
				sourceMap: true,
				root: '<%= dir %>',
				noAdvanced: true
			},
			assets: {
				files: [
					{
						expand: true,
						cwd: '<%= dir %>/assets/css/',
						src: ['**/*.css', '!**/*.min.css'],
						dest: '<%= dir %>/assets/css/',
						ext: '.min.css'
					}
				]
			}
		},
		// jslint
		jshint: {
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
						ext: '.min.js'
					}
				]
			}
		},
		copy: {
			js: {
				expand: true,
				cwd: 'src/js/',
				src: ['**/*'],
				dest: '<%= dir %>/assets/js/'
			}
		},
		// Clean
		clean: {
			css: {
				src: ['<%= dir %>/assets/css/**/*']
			},
			js: {
				src: ['<%= dir %>/assets/js/**/*']
			}
		}
	});

	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) === 'grunt-') {
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

	// CSS Build
	grunt.registerTask('build-css', ['scsslint:assets', 'clean:css', 'sass:assets', 'csscomb:assets', 'cssmin:assets']);

	// JavaScript Build
	grunt.registerTask('build-js', ['jshint:assets', 'clean:js', 'copy:js', 'uglify:assets']);

	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
