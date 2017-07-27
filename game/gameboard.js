var activeShapeNum = null;
var debug = true;
var activeShapeArr = null;
var board = function(gl, shader, canvas, height, width){
	this.lineStack = [];
	this.gl = gl;
	this.shader = shader;
	this.canvas =  canvas;
	//need to figure out dimensions
		
		var tempsize = new Array(11);
		for( var i=0; i <11; i++ ){
			tempsize[i] =  new Array(24);  
				for(var j=0; j<24; j++){
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
			if(this.ifLost()){
				return true;
			}
			this.lock();
			this.delLines();
			activeShape = null;
			this.activePiece = this.dropper(this.gl ,this.shader, this.canvas, this.size);
	}
	
	else{
		console.log(" The Piece is not on the floor ");
		activeShape.transDown();
		this.updateBoard(83);
	}
	return false;
	
	};
	


// by defualt set the origin piece of all shapes to [0][y]
board.prototype.dropper = function(gl, shader, canvas){
	
	var piece = Math.random();
	piece = Math.floor(piece*7);
	//var piece = 3;//just for test purposes
	var tet;
	console.log(piece+ ": random number");
	//switch through possible pieces
	
	switch(piece) {
		case 0:  //creates square
					tet = new squareT(gl, shader, canvas);
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 5;
					activeShapeArr[1][1] = 18;
					activeShapeArr[2][0] = 6;
					activeShapeArr[2][1] = 18;
					activeShapeArr[3][0] = 6;
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
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 6;
					activeShapeArr[1][1] = 19;
					activeShapeArr[2][0] = 5;
					activeShapeArr[2][1] = 18;
					activeShapeArr[3][0] = 4;
					activeShapeArr[3][1] = 18;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -2;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -2;
					
					break;
		case 2: //creates rightZ
					tet = new rightZ(gl, shader, canvas);
					
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 4;
					activeShapeArr[1][1] = 19;
					activeShapeArr[2][0] = 5;
					activeShapeArr[2][1] = 18;
					activeShapeArr[3][0] = 6;
					activeShapeArr[3][1] = 18;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -3;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -3;
					break;
		case 3://creates line
					tet = new line(gl, shader, canvas);
					
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 6;
					activeShapeArr[1][1] = 19;
					activeShapeArr[2][0] = 7;
					activeShapeArr[2][1] = 19;
					activeShapeArr[3][0] = 8;
					activeShapeArr[3][1] = 19;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -4;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -4;
					
					break;
		case 4:// creates rgihtL
					tet = new rightL(gl, shader, canvas);
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 5;
					activeShapeArr[1][1] = 20;
					activeShapeArr[2][0] = 6;
					activeShapeArr[2][1] = 19;
					activeShapeArr[3][0] = 7;
					activeShapeArr[3][1] = 19;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -5;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -5;
					
					break;
		case 5:// creates leftL
					tet = new leftL(gl, shader, canvas);
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 6;
					activeShapeArr[1][1] = 19;
					activeShapeArr[2][0] = 7;
					activeShapeArr[2][1] = 19;
					activeShapeArr[3][0] = 7;
					activeShapeArr[3][1] = 20;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -6;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -6;
					
					break;
		case 6://creates upsideT 
					tet = new upsideT(gl, shader, canvas);
					//set the active piece array
					activeShapeArr[0][0] = 5;
					activeShapeArr[0][1] = 19;
					activeShapeArr[1][0] = 5;
					activeShapeArr[1][1] = 20;
					activeShapeArr[2][0] = 4;
					activeShapeArr[2][1] = 19;
					activeShapeArr[3][0] = 6;
					activeShapeArr[3][1] = 19;
					//put the activeShapeArr in the board
					
					for(var x = 0; x < 4; x++){
						this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = -7;//im retarded
					}
					
					//set active shape num
					activeShapeNum = -7;
					
					
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
	
	switch(direction){
		
	case 83:	
			if(this.ifFloor()){return false};
			return true;
			break;
	
	case 81:
			if(this.ifRotateLeft()){return true};
			return false;
			break;
	case 69:
			if(this.ifRotateRight()){return true};
			return false;
			break;
			
	case 65:
			if(this.ifLeftSide()){return false};
			return true;
			break;
	case 68:
			if(this.ifRightSide()){return false};
			return true;
			break;
	default: console.log("This shouldnt happen");	
			
	}
	
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

board.prototype.ifLeftSide = function(){
	for(var x =0;x<4;x++){
		
		i = activeShapeArr[x][0]-1 ;
		j = activeShapeArr[x][1];
		if(i==-1){  return true;}
		
		var testobj = this.size[i][j];
		
		if(testobj > 0 ){
			return true;
		}
	}
	return false;
};

board.prototype.ifRightSide = function(){
	for(var x =0;x<4;x++){
		
		i = activeShapeArr[x][0]+1 ;
		j = activeShapeArr[x][1];
		if(i==11){  return true;}
		
		var testobj = this.size[i][j];
		
		if(testobj > 0 ){
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
	var xo = activeShapeArr[0][0]; var yo = activeShapeArr[0][1];
	
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
								//console.log(temp);
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
								//console.log(activeShapeArr[x][0]+ "::::"+ activeShapeArr);
							}	
						
						
						break;
						
				case 69:
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
							a = bo + xo; b = -1*ao + yo;
							activeShapeArr[i][0] = a;
							activeShapeArr[i][1] = b;
							}
							
							//finally put the piece back on the board
							for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = activeShapeNum;
								//console.log(activeShapeArr[x][0]+ "::::"+ activeShapeArr);
							}	
						break;
						
				case 65:
						//clear the piece
						for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = 0;
							}
						//update the pice array
						for(var x = 0;x<4;x++){
								var temp = activeShapeArr[x][0]-1;
								//console.log(temp);
								activeShapeArr[x][0] = temp;
							}
						//put the pice back in
						for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = activeShapeNum;
							}	
					break;
					
				case 68:
					//clear the piece
						for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = 0;
							}
						//update the pice array
						for(var x = 0;x<4;x++){
								var temp = activeShapeArr[x][0]+1;
								//console.log(temp);
								activeShapeArr[x][0] = temp;
							}
						//put the pice back in
						for(var x = 0; x < 4; x++){
								this.size[activeShapeArr[x][0]][activeShapeArr[x][1]]   = activeShapeNum;
							}	
					break;
						
				
				default: console.log("This shouldnt happen....");
				
						
	}
	
	
};
board.prototype.lock = function(){
	temp = activeShapeNum*-1;
	for(var x = 0; x < 4; x++){
					this.size[activeShapeArr[x][0]][activeShapeArr[x][1]] = temp;					
							}
	//need to signal to add a new piece
	
};


board.prototype.renderList = function(){
var obj;
var visited = [];
var visit = [];
visit.push([0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]);
	//breadht fisrt search
	while(visit.length > 0){
		//check the space in question
		var space = visit.pop();
		visited.push(space) ;
		//console.log("visit LEngth: "+ visit.length + ". Space: " +space[0]);
		//console.log(this.size);
		if(this.size[space[0]][space[1]] > 0){
		//console.log(visited + "Visited array");
		
		obj = new block(this.gl, this.shader, this.canvas);
		obj.translate([-1+(spacex/2)+space[0]*(spacex), -1+(spacey)+space[1]*spacey]);//needs to be updated
		obj.render();
												//add to list and put in visited
		//checks to see if it shoudl include above it
		var above = [space[0],space[1]+1];
			if(above[1]<23){
			if( !has(visited,above) && !has(visit,above) && (this.size[above[0]][above[1]] > 0)){ visit.push(above); }
		//checks to see if it should include below
			}
		
		var below = [space[0],space[1]-1];
			if(below[1]>-1){
				if( !has(visited,below) && !has(visit,below) && (this.size[below[0]][below[1]] > 0)){ visit.push(below); }
			}
		//checks to see if should go left
		var left = [space[0]-1,space[1]];
			if(left[0]>-1){
				if( !has(visited,left) && !has(visited,left) && (this.size[left[0]][left[1]] > 0)){ visit.push(left); }
		    }
		//checks to see if it should go right
		var right = [space[0]+1, space[1]] ;
			if(right[0]<11){
				if(!has(visited,right)&& !has(visited,right) && (this.size[right[0]][right[1]] > 0)){ visit.push(right); }
		    }
		}
	}

	//end of breadth first search
	
	
	

};

board.prototype.ifLost = function(){
	for(var x =0; x<11;x++){
	if(this.size[x][18]>0){ return true;}
	}
	return false;
};
//if array 1 has array 2 .....
function has(ma, coord){
	var len = ma.length;
	for(var x =0; x<len; x++){
		if(ma[x][0] == coord[0]){
			if(ma[x][1] == coord[1])
				return true;
		}
		else;
	}
	return false;
};

board.prototype.delLines = function(){
	for(var y=0;y<18;y++){
			//no wgo by row
			var  done = true;
			for(var x=0; x<11; x++){
				console.log("X,Y: "+x+","+y+"  size: "+ this.size[x][y]);
				if(this.size[x][y] <= 0){done = false;
										
										break;}
			}
	
		if(done){
			
			for(var x=0; x<11; x++){ this.size[x][y] = 0;}
			//now translate all the blocks down
			var level = y+1;
			for(;level<17;level++){
				for(var x=0; x<11;x++){
					//translate the block down
					this.size[x][level-1] = this.size[x][level];
				}
				
			}
			
			for(var x=0;x<11;x++){ this.size[x][17];}
		
		
		}
	
	}
}; 

function createActiveShapeArr(){
	
activeShapeArr = new Array(4);
for(var i =0; i <4; i++ ){
	activeShapeArr[i] = new Array(2);
}	
	};