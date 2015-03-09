module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Task configuration
        concat: {
            dist: {
                src: ['js/*.js'],
                dest: '../dist/js/build.js'
            }
        },
        uglify: {
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '../dist/js/build.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['newer:less','cssmin'],
            },
            images: {
                files: ['images/*.{png,jpg,gif}'],
                tasks: ['newer:imagemin'],
            },
            hbs_pages: {
                files: ['pages/*.hbs'],
                tasks: ['newer:assemble'],
            },
            hbs_partials: {
                files: ['partials/*.hbs'],
                tasks: ['assemble']
            }
        },
        cssmin: {
            target: {
                files: {
                    '../dist/css/build.min.css': ['css/*.css']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/', 
                    src: ['*.{png,jpg,gif}'],
                    dest: '../dist/images'   
                }]
            }
        },
        less: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'less/', 
                    src: ['*.less'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        assemble: {
            project: {
                options: {
                    partials: "partials/**/*.hbs" 
                },
                files: [{
                    expand: true,
                    cwd: 'pages/', 
                    src: ['*.hbs'],
                    dest: '../dist/',
                    ext: '.html'
                }]
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('assemble');

    // Default task
    grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'imagemin', 'assemble']);
};