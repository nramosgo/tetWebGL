var activeShapeNum = null;
var activeShapeArr = new Array();
var board = function(gl, shader, canvas, height, width){
	
	this.gl = gl;
	this.shader = shader;
	this.canvas =  canvas;
	//need to figure out dimensions
		this.size = new Array();
};

board.prototype.updatePieceNum = function(){
	
	this.pieceNum = activeShapeNum;
	
};

board.prototype.tick = function(){
	if(activeShape == null){
		
		this.activePiece = dropper(this.gl ,this.shader, this.canvas);
	}

	//so need to check if activeShape can move down
	if(this.ifFloor()){
			console.log("The piece is on the floor");
		
	}
	else{
		console.log(" The Piece is not on the floor ");
	}
	
	
	};
	
board.prototype.ifFloor = function(){
	//loop through the array to check if bellow the array there is a object
	for(var x = 0; x>4; x++){
		for(var y = 0; y>2; y++){
			
			if(this.size[activeShapeArr[x]][activeShapeArr[y]] > 0 ){
				return false;
			}
		}
	}
	return true;
};

function dropper(gl, shader, canvas){
	
	//var piece = Math.random();
	//piece = Math.floor(piece*7);
	var piece = 0;
	activeShapeNum = piece;
	var tet;
	console.log(piece+ ": random number");
	//switch through possible pieces
	
	switch(piece) {
		case 0:  //creates square
					tet = new squareT(gl, shader, canvas);
					//set the active piece array
					activeShapeArr.push();
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 6;
					activeShapeArr[1][1] = 20;
					activeShapeArr[2][0] = 7;
					activeShapeArr[2][1] = 19;
					activeShapeArr[3][0] = 7;
					activeShapeArr[3][1] = 20;
					//set put the activeShapeArr in the board
					
					//for(var x = 0; x<;)
					
					
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

