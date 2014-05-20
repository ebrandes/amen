module.exports = function(grunt) {

  grunt.initConfig({
  	serverFile: 'app.js',
    shell: {
      node: {
        command: 'node <%= serverFile %>',        
        options: {
          stdout: true,
          stderr: true          
        }
      }      
    },
    watch: {
	  src: {	    
	    files: [
	      'public/**/*.{css,js}',
	      'views/**/*.jade'
	    ],
	    options: {
	       livereload: {
	        port: 8080	             
	      },
	      reload: true
	    }
	  }
	},
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell:node']);
 
};