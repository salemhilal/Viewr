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
          specs: 'tests/test-*.js'
        }
      }
    }
  });
 
  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  // Do everything.
  grunt.registerTask('default', ['jasmine','uglify']);
 
  // Just test
  grunt.registerTask('test', ['jasmine']);

  // Minify
  grunt.registerTask('min', ['uglify']);
};
