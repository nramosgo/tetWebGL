//global Variables (until i can find some where else to put them)

var leave = false;
var lasttimestamp = null;
var delta = 0;
var glo, canvaso, shadero;
var sizex, sizey;
var spacex, spacey;
var interval;
var activeShape;
var gameboard; 


var gameboard;
function main(){
/**
     **      Initialize WebGL Components
     **/
    
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');
		
		canvaso = canvas;
    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
	
	glo = gl;
	var shader = new Shader(gl, "vertex-shader", "fragment-shader");  
	
	shadero = shader;
	/**
     **    Initialize Misc. OpenGL state
     **/
    gl.clearColor(0, 0, 0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
	spacex = (2.0/11);
	sizex = (spacex/2) - 0.003;
		spacey = (2.0/21);
		sizey = (spacey/2) - 0.0015;
		
	//goes to intro page
	Intro(gl,canvas, shader);
		





};


function tetris(gl, canvas, shader){

	//but for know just test things
	
	
		
	gl.clear(gl.COLOR_BUFFER_BIT);
	 var testmat = new mat();
	 var rt = testmat.clone();
	 console.log(rt);
	

	
	//var delta
	var tampdelt = 0;
	
	gameboard = new board(gl , shader, canvas, 0,0);
	gameboard.tick();
	
	//for debugging 

	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	//create the fisrt tetris object
	repaint = function(timestamp){
		//update delta
		tampdelt = timestamp - lasttimestamp;
		delta = delta + tampdelt;

		if(delta > 1000){
		delta = 0;
		if(gameboard.tick()){
			return;
		}
		console.log(delta + ": delta");
		}
		lasttimestamp = timestamp;
			//console.log(timestamp + ": time"); 1000 = 1 sec in the time stamp
		
			
		gl.clear(gl.COLOR_BUFFER_BIT);
		gameboard.renderList();
		activeShape.render();
		requestAnimationFrame(repaint);
	};
	
	requestAnimationFrame(repaint);
	
	
	
};
/**
 * [Copied from UNCC  ITCS 3120 Final Project]
 * Converts 1D or 2D array of Number's 'v' into a 1D Float32Array.
 * @param {Number[] | Number[][]} v
 * @returns {Float32Array}
 */
function flatten(v)
{
    var n = v.length;
    var elemsAreArrays = false;

    if (Array.isArray(v[0])) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array(n);

    if (elemsAreArrays) {
        var idx = 0;
        for (var i = 0; i < v.length; ++i) {
            for (var j = 0; j < v[i].length; ++j) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for (var i = 0; i < v.length; ++i) {
            floats[i] = v[i];
        }
    }

    return floats;
};
