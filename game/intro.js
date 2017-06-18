
var butt;
function Intro(gl,canvas, shader)
{
canvas.addEventListener(
            "mousedown",
            function (ev) {
                handleMouseDown(ev, gl, canvas);
                });

	
	
	
if(leave== false){
gl.clearColor(0.0,0,0,1);

gl.clear(gl.COLOR_BUFFER_BIT);
//i know i can create a button through html, i want to see if can do it this way
var butt = new Shape(gl, shader, canvas);

butt.vertices.push([-0.5,-0.15]);
butt.vertices.push([0.5,-0.15]);
butt.vertices.push([0.5,0.15]);
butt.vertices.push([-0.5,-0.15]);
butt.vertices.push([-0.5,0.15]);
butt.vertices.push([0.5,0.15]);
butt.color = [1.0,0.0,0.0,1.0];

butt.updateBuffers();
butt.render();



}

function handleMouseDown(ev, gl, canvas) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();
	
	 x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

	console.log("X: "+ x);
	console.log("Y: "+ y);
	// check for the leave button
	if(leave == false){
		if(butt.inside(x,y)){
		  leave == true;
		  console.log("Inside");
		  tetris(glo,canvaso, shadero);
		  // some code to render the beginning of the game
		  leave = true;
		}
	
	}
};

	
}
