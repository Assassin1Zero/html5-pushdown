'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * <%= pkg.title || pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * \n' +
            ' * @author <%= pkg.author %> \n' +
            ' * @since <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
            ' * @version v<%= pkg.version %>\n' +
            ' */\n',
        // Task configuration.
        clean: {
            pre: {
                src: ['build']
            },
            post: {
                src: ['build/html5-pushdown/main.js']
            }
        },
        copy: {
            build: {
                files: [{
                    src: 'template.html',
                    dest: 'build/html5-pushdown/index.html'
                }, {
                    expand: true,
                    src: 'css/**',
                    dest: 'build/html5-pushdown/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'js/**',
                    dest: 'build/html5-pushdown/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'images/**',
                    dest: 'build/html5-pushdown/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'media/**',
                    dest: 'build/html5-pushdown/',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },
        uglify: {
            build: {
                src: 'build/html5-pushdown/main.js',
                dest: 'build/html5-pushdown/main.min.js'
            }
        },
        browserify: {
            build: {
                files: {
                    'build/html5-pushdown/main.js': ['lib/pushdown.js'],
                    'build/enabler.js': ['lib/enabler.js']
                },
                // options: {
                //     require: ['ad-utils'],
                // }
            }
        },
        watch: {
            files: ['lib/**', 'css/**', 'images/**', 'js/**', 'template.html'],
            tasks: ['default']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['clean:pre', 'browserify', 'uglify', 'copy', 'clean:post']);
};
