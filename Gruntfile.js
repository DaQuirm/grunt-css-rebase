/*
 * grunt-css-paths
 * https://github.com/daquirm/grunt-css-paths
 *
 * Copyright (c) 2013 DaQuirm
 * Licensed under the LGPL license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		clean: {
			tests: ['tmp'],
		},

		coffee: {
			build: {
				'tasks/css_paths.js': 'tasks/css_paths.coffee'
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Configuration to be run (and then tested).
		css_paths: {
			single_path: {
				options: {},
				files: [
					{
						src: 'test/fixtures/single-path.css',
						dest: 'tmp/single-path.processed.css',
					}
				],
			},
			dest_path: {
				options: {
					resource_dest: 'tmp/dest/resources'
				},
				files: [
					{
						src: 'test/fixtures/dest-path.css',
						dest: 'tmp/dest/dest-path.processed.css',
					}
				],
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'css_paths', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['coffee', 'jshint', 'test']);

};
