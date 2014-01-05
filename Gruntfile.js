module.exports = function(grunt) {
  
  // Project Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      viewr: {
        src: 'viewr.js',
        options: {
          specs: 'tests/*.js'
        }
      }
    }
  });
 
  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  // Default task(s).
  grunt.registerTask('default', ['uglify']);
 
};
