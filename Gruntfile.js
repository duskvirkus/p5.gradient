module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   dist: {
    //     src: ['src/**/*.js'],
    //     dest: 'dist/<%= pkg.name %>.js',
    //   },
    // },
    browserify: {
      files: {
        'dist/<%= pkg.name %>.js': ['src/**/*.js'],
      },
    },
    uglify: {
      min: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', []);

  grunt.registerTask('build', ['browserify', 'uglify:min']);

};