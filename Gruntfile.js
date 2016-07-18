module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: 'localhost', //Required to specify livereload script domain
          port: 1337, //Port for connect server to run on
          livereload: true, //Inject livereload script to html
          base: './www-root', //Base of server
          keepalive: false, //If true, no other tasks get run
          open: true //Open connect server in browser
        },
      },
    },
    watch: {
      options: {
        livereload: true, //Trigger livereload server on filechange
        cwd: {
          files: './www-root', //Current working directory for files
        },
      },
      scripts: {
        files: ['./js/orig/**/*.js'],
        tasks: ['uglify']
      },
      html: {
        files: ['**/*.html'],
        tasks: []
      },
      sass: {
        files: ['./css/orig/sass/**/*.scss', './css/sass/**/*.sass'],
        tasks: ['sass']
      },
      css: {
        files: ['./css/orig/css/**/*.css'],
        tasks: ['cssmin']
      },
    },
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          './css/orig/sass': ['**/*.scss', '**/*.sass']
        },
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          './js/orig/js': ['**/*.js']
        },
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['./css/orig/css/**/*.css'],
          dest: '../',
          ext: '.css'
        }]
      },
    },
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('server', ['connect', 'watch']);

};
