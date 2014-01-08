module.exports = function(grunt) {
  
  // Project Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Minification
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'viewr.js',
        dest: 'viewr.min.js'
      }
    },
  
    // For code testing
    jasmine: {
      viewr: {
        src: 'viewr.js',
        options: {
          specs: 'tests/test-*.js',
          helpers: 'tests/keys.js'
        }
      }
    },

    // Make sure our code is well linted
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        freeze: true, 
        indent: 2,
        newcap: true,
        noempty: false
      },
      all: ['Gruntfile.js', 'package.json', 'viewr.js', 'tests/*.js']
    },

    // Get rid of...
    clean: {
      // any pre-commit hooks
      hooks: ['./git/hooks/pre-commit']
    },

    // Run shell commands
    shell: {
      // Add git hooks
      hooks: {
        command: 'cp git-hooks/pre-commit .git/hooks/'
      }
    }
  });
 
  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');


  // Do everything.
  grunt.registerTask('default', ['jshint', 'jasmine','uglify']);
 
  // Just test
  grunt.registerTask('test', ['jasmine']);

  // Just lint
  grunt.registerTask('lint', ['jshint']);

  // Set up git pre-commit hooks
  grunt.registerTask('hooks', ['clean:hooks', 'shell:hooks']);
};
