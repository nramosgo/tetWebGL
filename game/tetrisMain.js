//global Variables (until i can find some where else to put them)

var leave = false;
var lasttimestamp = null;
var glo, canvaso, shadero;
var sizex, sizey;
var spacex, spacey;
var interval;
var activeShape;

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
	sizex = 0.049;
	spacex = 0.1;
		sizey = 0.0245;
		spacey = 0.05;
	//goes to intro page
	Intro(gl,canvas, shader);
		





}


function tetris(gl, canvas, shader){
	
	//but for know just test things
	
	
		var testSquare = new upsideT(gl, shader, canvas);
	gl.clear(gl.COLOR_BUFFER_BIT);
	 var testmat = new mat();
	 var rt = testmat.clone();
	 console.log(rt);
	
	testSquare.render();
	activeShape = testSquare;
	//var delta
	
	//create the fisrt tetris object
	repaint = function(timestamp){
		if(lasttimestamp !== null){
		
		
		
		}
		lasttimestamp = timestamp;
		
		gl.clear(gl.COLOR_BUFFER_BIT);
		activeShape.render();
		requestAnimationFrame(repaint);
	};
	
	requestAnimationFrame(repaint);
	
	
	
}
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
}
