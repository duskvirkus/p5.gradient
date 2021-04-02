module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', []);

  grunt.registerTask('build', ['concat:dist', 'uglify:min']);

};