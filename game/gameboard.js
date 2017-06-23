var activeShapeNum = null;
var board = function(gl, shader, canvas, height, width){
	
	this.gl = gl;
	this.shader = shader;
	this.canvas =  canvas;
	//need to figure out dimensions
		this.size = new Array(width/11, height/21);
	//create dropper
		
};

board.prototype.updatePieceNum = function(){
	
	this.pieceNum = activeShapeNum;
	
}

board.prototype.tick = function(){
	if(activeShape == null){
		
		this.activePiece = dropper(this.gl ,this.shader, this.canvas);
	}
};

function dropper(gl, shader, canvas){
	
	var piece = Math.random();
	piece = Math.floor(piece*7);
	activeShapeNum = piece;
	var tet;
	console.log(piece+ ": random number");
	//switch through possible pieces
	
	switch(piece) {
		case 0:  //creates square
					tet = new squareT(gl, shader, canvas);
					break;
		case 1: //creates lefttZ
					tet = new leftZ(gl, shader, canvas);
					break;
		case 2: //creates rightZ
					tet = new rightZ(gl, shader, canvas);
					break;
		case 3://creates line
					tet = new line(gl, shader, canvas);
					break;
		case 4:// creates rgihtL
					tet = new rightL(gl, shader, canvas);
					break;
		case 5:// creates leftL
					tet = new leftL(gl, shader, canvas);
					break;
		case 6://creates upsideT 
					tet = new upsideT(gl, shader, canvas);
					break;
		default: console.log("lmao this shouldnt happen");
					return;
					
	}
	
	activeShape = tet;
			
	return tet;		
				
};

