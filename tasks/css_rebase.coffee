###
 grunt-css-paths
 https://github.com/daquirm/grunt-css-paths

 Copyright (c) 2013 DaQuirm
 Licensed under the LGPL license.
###

fs     = require 'fs'
path   = require 'path'
rework = require 'rework'

module.exports = (grunt) ->

	grunt.registerMultiTask 'css_rebase', 'Resolve paths in CSS files', ->
		# Merge task-specific and/or target-specific options with these defaults.
		options = @options {}

		process_file = (file) ->
			css = grunt.file.read file, encoding:'utf8'
			reworked = rework(css).use rework.url (url) ->
				if url? and not /base64\,/.test url
					resource_src_path = path.resolve (path.dirname file), url
					if options.resource_dest
						resource_dest_path = path.resolve options.resource_dest, (path.basename resource_src_path)
						if options.copy
							if grunt.file.exists resource_src_path
								grunt.file.copy resource_src_path, resource_dest_path
							else
								grunt.verbose.writeln "Couldn't find #{resource_src_path}"
						path.relative (path.dirname options.resource_dest), resource_dest_path
					else
						path.basename resource_src_path
				else
					url
			do reworked.toString

		is_dir = (filepath) ->
			path.extname(filepath) is ''

		@files.forEach ({dest, src}) ->
			if is_dir dest
				src.forEach (file) ->
					dest_file = path.resolve(dest, path.basename file)
					processed = process_file file
					grunt.file.write dest_file, "#{processed}\n"
			else
				processed = (src.map process_file).join '\n'
				dest_file = dest
				grunt.file.write dest_file, "#{processed}\n"
