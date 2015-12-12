'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  var gruntConfig = {

    config: {
      src: 'src'
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: '<%= config.dist %>/js/production.min.js'
      }
    },

    uglify: {
      build: {
        src: '<%= config.dist %>/js/production.min.js',
        dest: '<%= config.dist %>/js/production.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          '<%= config.src %>/css/build/main.css' : '<%= config.src %>/css/scss/main.scss'
        }
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates,css/scss,js}/{,*/}*.{md,hbs,yml,scss,js}'],
        tasks: ['build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/{,*/}*.scss',
          '<%= config.dist %>/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: '<%= config.dist %>/css/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 2 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        files: {
          '<%= config.dist %>/css/main.css': ['<%= config.src %>/css/build/main.css']
        }
      }
    },

    connect: {
      options: {
        port: 9001,
        livereload: 35729,

        hostname: 'localhost'
      },
        livereload: {
          options: {
            open: true,
            base: [
              '<%= config.dist %>'
          ]
        }
      }
    },

    copy: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images/',
          src: ['**/*.{png,jpg,svg}'],
          dest:'<%= config.dist %>/mimages/'
        }]
      },

      scripts: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/js/vendor',
          src: ['**/*.js'],
          dest:'<%= config.dist %>/js/vendor/'
        }]
      }
    }
  }

  // run universal design to any mall `grunt server --company=ColonieMgmt --mall=yorktown`
  grunt.registerTask('upload', 'Upload code to specified mall.', function(n) {
    var company = grunt.option('company');
    var mall = grunt.option('mall');
    gruntConfig.config.dist = '../../../' + company + '/mall-' + mall;
    grunt.file.write('src/css/scss/_vars.scss', '@import "../../../../../../' + company + '/mall-'  + mall + '/css/vars/vars";');
  });

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
    ]);

  grunt.registerTask('build', [
    'upload',
    'concat',
    'uglify',
    'sass',
    'postcss',
    'copy'
    ]);

  grunt.registerTask('default', [
    'build'
    ]);

  grunt.initConfig(gruntConfig);

};

