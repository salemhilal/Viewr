module.exports = function(grunt) {
  
  // Project Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'viewr.js',
        dest: 'viewr.min.js'
      }
    },
  
    jasmine: {
      viewr: {
        src: 'viewr.js',
        options: {
          specs: 'tests/test-*.js',
          helpers: 'tests/keys.js'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        freeze: true, 
        indent: 2,
        newcap: true,
        noempty: true,
      },
      all: ['Gruntfile.js', 'package.json', 'viewr.js', 'tests/*.js']
    }
  });
 
  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Do everything.
  grunt.registerTask('default', ['jshint', 'jasmine','uglify']);
 
  // Just test
  grunt.registerTask('test', ['jasmine']);

  // Just lint
  grunt.registerTask('lint', ['jshint']);
};
