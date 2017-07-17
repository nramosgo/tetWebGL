var activeShapeNum = null;
var activeShapeArr = null;
var board = function(gl, shader, canvas, height, width){
	
	this.gl = gl;
	this.shader = shader;
	this.canvas =  canvas;
	//need to figure out dimensions
		
		var tempsize = new Array(10);
		for( var i=0; i <11; i++ ){
			tempsize[i] =  new Array(21);  
				for(var j=0; j<21; j++){
					tempsize[i][j] = 0;
				}
		}
		
		
		
		this.size = tempsize;
		
	//so once the space is allocated create the acualt array
	createActiveShapeArr();
	
	
	
	
	};




board.prototype.updatePieceNum = function(){
	
	this.pieceNum = activeShapeNum;
	
};

board.prototype.tick = function(){
	if(activeShape == null){
		
		this.activePiece = this.dropper(this.gl ,this.shader, this.canvas, this.size);
	}

	//so need to check if activeShape can move down
	if(this.ifFloor()){
			//console.log("The piece is on the floor");
		
	}
	
	else{
		console.log(" The Piece is not on the floor ");
		activeShape.transDown();
		this.updateBoard(83);
	}
	
	
	};
	


// by defualt set the origin piece of all shapes to [0][y]
board.prototype.dropper = function(gl, shader, canvas){
	
	//var piece = Math.random();
	//piece = Math.floor(piece*7);
	var piece = 0;//just for test purposes
	var tet;
	console.log(piece+ ": random number");
	//switch through possible pieces
	
	switch(piece) {
		case 0:  //creates square
					tet = new squareT(gl, shader, canvas);
					//set the active piece array
					activeShapeArr[0][0] = 6;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 6;
					activeShapeArr[1][1] = 18;
					activeShapeArr[2][0] = 7;
					activeShapeArr[2][1] = 18;
					activeShapeArr[3][0] = 7;
					activeShapeArr[3][1] = 19;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						
							
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -1;//im retarded
						
						
					}
					
					//set active shape num
					activeShapeNum = -1;
					
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
	this.pieceNum = activeShapeNum;		
	return tet;		
				
};

board.prototype.possible = function(direction){
	//if its going piece is trying to go down
	if(direction == 83){
		
		if(this.ifFloor()){return false};
		 return true;
		
	}
	else if(direction == 81){
		if(this.ifRotateLeft()){return true};
		return false;
	}
	else;
		
	
	return true;
};

board.prototype.ifFloor = function(){
	//loop through the array to check if bellow the array there is a object
	
	for(var x = 0; x<4; x++){
		i = activeShapeArr[x][0];
		j = activeShapeArr[x][1]-1;
		if(j == -1){return true;}
		//if(j == 0){return true;}
		
		var testobj = this.size[i][j] ;
				
		console.log(" num of space bieng test for floor: "+ testobj);
			
			if( testobj > 0 ){ //im retarded
				return true;
		}
	}
	return false;
};

/**
Checks to see if it possible to rotate by -90 degrees

*/
board.prototype.ifRotateRight = function(){
	var a;
	var b;
	activeShapeArr[0][0] = xo; activeShapeArr[0][1] = yo;
	
	for(var i = 1; i<4;i++){
		a = activeShapeArr[i][0];
		b = activeShapeArr[i][1];
		
		ao = a -xo; bo = b-yo;
		a = bo + xo; b = -1*ao + yo;
		
		//checks to see if the cordinates are inside the board space
		if( a>-1 && b>-1 && a<11 && b<21){
			if(this.size[a][b] > 0 ){return false;}
		}
		else{return false;}
	}
return true;
	
};

/**
Checks to see if its possible to rotate by 90 degrees

*/
board.prototype.ifRotateLeft = function(){
	var a;
	var b;
	var xo = activeShapeArr[0][0]; var yo = activeShapeArr[0][1];
	
	for(var i = 1; i<4;i++){
		a = activeShapeArr[i][0];
		b = activeShapeArr[i][1];
		
		ao = a -xo; bo = b-yo;
		a = -1*bo + xo; b = ao + yo;
		
		//checks to see if the cordinates are inside the board space
		if( a>-1 && b>-1 && a<11 && b<21){
			if(this.size[a][b] > 0 ){return false;}
		}
		else{return false;}
	}
return true;
	
	
};

board.prototype.updateBoard = function(direction){
	
	switch(direction){
						case 83:			
							//so clear the current piece in the board
							
							for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = 0;
							}
							
							//update the activePiece array
							for(var x = 0;x<4;x++){
								var temp = activeShapeArr[x][1]-1;
								console.log(temp);
								activeShapeArr[x][1] = temp;
							}
					
							//fionally put the piece back in the board
							for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = activeShapeNum;
							}	
						break;
						
						case 81: //rotate left
							//so clear the current piece in the board
							
							for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = 0;
							}
							//update the active piece array
							var a;
							var b;
							var xo = activeShapeArr[0][0]; var yo = activeShapeArr[0][1];
	
							for(var i = 1; i<4;i++){
							a = activeShapeArr[i][0];
							b = activeShapeArr[i][1];
		
							ao = a -xo; bo = b-yo;
							a = -1*bo + xo; b = ao + yo;
							activeShapeArr[i][0] = a;
							activeShapeArr[i][1] = b;
							}
							
							//finally put the piece back on the board
							for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = activeShapeNum;
								console.log(activeShapeArr[x][0]+ "::::"+ activeShapeArr);
							}	
						
						
						break;
						
						case 69:
						
						break;
						
						default: console.log("This shouldnt happen....");
	}
	
	
};

function createActiveShapeArr(){
	
activeShapeArr = new Array(4);
for(var i =0; i <4; i++ ){
	activeShapeArr[i] = new Array(2);
}	
	};