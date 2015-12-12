'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  concat: {
    dist: {
      src: [
      'js/scripts/*.js'
      ],
      dest: 'js/production.js',
    }
  },

  uglify: {
    build: {
      src: 'js/production.js',
      dest: 'js/production.min.js'
    }
  },

  sass: {
    dist: {
      files: {
        'css/main.css' : 'css/scss/main.scss'
      }
    }
  },

  postcss: {
    options: {
      map: true,

      processors: [
        require('pixrem')(),
        require('autoprefixer')({browsers: 'last 2 versions'}),
        require('cssnano')()
      ]
    },
    dist: {
      files: {
        'css/main.css': ['css/main.css']
      }
    }
  },

  criticalcss: {
    custom: {
      options: {
        url: "http://localhost:4000",
        outputfile: "_includes/critical.css",
        filename: "css/main.css",
        buffer: 800*1024
      }
    }
  },

  watch: {
    options: {
      livereload: {
        port: 4000,
        key: grunt.file.read('/Users/Q/Sites/livereload.key'),
        cert: grunt.file.read('/Users/Q/Sites/livereload.crt'),
        files: ['_site/**/*'],
      }
    },
    scripts: {
      files: ['js/*.js'],
      tasks: ['concat', 'uglify'],
    },
    css: {
      files: ['css/scss/**/*.scss'],
      tasks: ['sass', 'postcss'],
    }
  }

});

grunt.registerTask('build', ['concat', 'uglify', 'sass', 'postcss', 'watch']);

grunt.registerTask('prod', ['concat', 'uglify', 'sass', 'postcss', 'criticalcss', 'watch']);

};
