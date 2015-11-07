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
		}
	});

	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	// 出力フォルダをdistに切り替えるタスク
	// まったく同じタスクを dev/ と dist/ で書く手間がなくなる
	grunt.task.registerTask('release', 'Switch release mode', function() {
		grunt.config.merge({
			dir: "dist"
		});
	});

	grunt.registerTask('default', []);

	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
