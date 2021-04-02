module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', []);

  grunt.registerTask('build', ['concat:dist', '']);

};