
var butt;
function Intro(gl,canvas, shader)
{
canvas.addEventListener(
            "mousedown",
            function (ev) {
                handleMouseDown(ev, gl, canvas);
                });

canvas.addEventListener(
			"keydown",
			function(ev) {
					handleKey(ev, gl, canvas);
			
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

function handleKey(ev, gl, canvas){
	console.log(ev.keyCode);
//65 = a
//83 = s
//68= d
//81 = q
//69 = e
var key = ev.keyCode;
	switch(key){
			case 65: //initiate shift rigth on active object
						if(gameboard.possible(65)){
						console.log("shift left")
						gameboard.updateBoard(65);
						activeShape.transLeft();
						}
						break;
			case 68: //initiate shift left on active object
						if(gameboard.possible(68)){
						console.log("shift rigth");
						gameboard.updateBoard(68);
						activeShape.transRight();
						}
						break;
			case 83: //initiate shift down on active object	
						console.log("shift down");
						if(gameboard.possible(83)){
							gameboard.updateBoard(83);
							activeShape.transDown();
							}
						break;
			/*case 87: //initate shift up on active object
						console.log("shift up");
						activeShape.transUp();
						break;*/
			case 81: //initiate rotate left on active oibject
						console.log("rotate left");
						if(gameboard.possible(81)){
							gameboard.updateBoard(81);
							activeShape.rotateLeft();
							}
						break;
			case 69: //iniate roate right on active object
						if(gameboard.possible(69)){
						console.log("rotate right");
						gameboard.updateBoard(69);
						activeShape.rotateRight();
						}
						break;
			default: console.log("don nothing");
	
	
	
	
	}
	
	};

	
}
