var modelViewStack;

/*
*	creates a shape class that every other shape will inherit from
*	its just whatever the person whish it to be
*
*/

var Shape = function(gl,shader,canvas)
{
	this.glp = gl;
	this.shader = shader;
	console.log("hello");
	this.color = new Float32Array(4);
	this.color = [1.0,0.0,0.0,1.0];
	this.vertices = new Array();
	//sets up the type of triangle , only here because it may need to be changed
	this.primitive =  gl.TRIANGLES;
	//error checking 
	this.vertexBuffer = gl.createBuffer();
	if (!this.vertexBuffer){
		alert('Failed to create the buffer object');
		throw ShaderException();
	}
	this.u_modelView = shader.u_modelView;
	this.matrix = new mat;
			//this.matrix.set([1,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0]); 
	
};



Shape.prototype.updateBuffers = function()
{
	gl = this.glp;
	// bind to the GL ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    // copy vertex data into ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
	
};

Shape.prototype.render = function(){

	var gl = this.glp;
	gl.useProgram(this.shader.program);
	//
	if (this.vertices.length) 
    {	                
			console.log("test on src offest bug: "+ this.matrix.arr());
		gl.uniformMatrix3fv(this.u_modelView, false, flatten(this.matrix.arr() ));  
		
        // bind the vertex buffer to the GL ARRAY_BUFFER 
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        // use the vertexBuffer for the vertex attribute variable 'a_Position'
        gl.vertexAttribPointer(this.shader.a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.a_Position);
        
        // set the various uniform variables
        gl.uniform4fv(this.shader.u_FragColor,this.color);    
		
		
       
        // draw the triangles
        gl.drawArrays(this.primitive, 0, this.vertices.length);
	}    
	
};

Shape.prototype.inside = function(x,y){
	return x <= .5 && x >= -.5 && 
			y <= .15 && y >= -.15;
}




// this returns a translated matirx of the this object
// needed to create a tetris objects
Shape.prototype.setTranslate = function(translate){
	
	
	if(translate instanceof Array)
	{
		if (translate instanceof Array){
		//settup the translatio matrix
		m_t = new mat([
			1.0,0.0,0.0,
			0.0,1.0,0.0,
			translate[0],translate[1],1.0
		]);
			
			
		//multiply the transition matrix
		this.mult(m_t);
		}
		else 
			throw new Error("Unsupported Type");
	}
	else 
		throw new Error("Unsupported")
	
};
/**
*[ M_00, M_10, M_20
   M_01, M_11, M_21 
   M_02, M_12, M_22
]
*
[M_00, M_10, M_20
   M_01, M_11, M_21  
   M_02, M_12, M_22
]
*
*/
Shape.prototype.mult = function(m_t){
	
if(m_t instanceof mat){
	var r,c;
	var matrix = new Float32Array(9);
	for(r = 0; r<=2; r++){
		for(c= 0; c<=2;c++){
			
			matrix[c*3+r] = m_t.get(r,0)*this.matrix.get(0,c) + m_t.get(r,1)*this.matrix.get(1,c) + 
						m_t.get(r,2)*this.matrix.get(2,c);
			
		}			
	}
	
		this.matrix = new mat(matrix);
	}
else 
		throw new Error(" ");
};

Shape.prototype.clonematrix = function(){
	return this.matrix.clone();
};



/**
*Create the invidividual tetris block
*/
var block = function(gl,shader, canvas){
	this.shape = new Shape(gl, shader, canvas);
	this.shape.vertices.push([-(sizex),-(sizey)]);
	this.shape.vertices.push([sizex,-(sizey)]);
	this.shape.vertices.push([sizex,sizey]);
	this.shape.vertices.push([-(sizex),-(sizey)]);
	this.shape.vertices.push([-(sizex),sizey]);
	this.shape.vertices.push([sizex,sizey]);
	
	
};

block.prototype.render = function(){
	this.shape.updateBuffers();
	this.shape.render();
};

block.prototype.translate = function(translate){
	this.shape.setTranslate(translate);
};

block.prototype.clonematrix = function(){
	return this.shape.clonematrix();
};








// actual tetries shape
/**
* This while be the 2x2 blocks
* 
*/
var squareT = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	var tempMat = this.omatrix.clone();
	
	tempMat.translate([.1,.1]);
	
	this.rightop.shape.matrix = tempMat;
	console.log(tempMat.array);
	//this.rightop.shape.matrix = this.origin.translate([spacex,spacey]); fix this so that 
	// can translate things reltive to the origin this wont work currenlty
};

squareT.prototype.render = function(){
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
}




// mat objects stuff here
var mat = function(){
	if(arguments.length ==  1 ){
		this.array = new Float32Array(9);
		this.array.set(arguments[0]);
			//moght need to add a consrtuor for arguements if its another mat object
	}
	else
	this.array = createMatI();
};

mat.prototype.set = function(r,c,val)
{
	this.array[c*3+r] =val;
};

mat.prototype.get = function(r,c)
{
	return this.array[c*3+r];
};

mat.prototype.arr = function(){
	return this.array;
};

mat.prototype.clone =  function(){
	var matrix = new Float32Array(9);
	matrix.set([this.get(0,0), this.get(1,0), this.get(2,0),
				this.get(0,1), this.get(1,1), this.get(2,1),
				this.get(0,2), this.get(1,2), this.get(2,2)]);
				var temp = new mat(matrix);
				return temp;
};

mat.prototype.mult = function(m_t){
	if(m_t instanceof mat){
	var r,c;
	var matrix = new Float32Array(9);
	for(r = 0; r<=2; r++){
		for(c= 0; c<=2;c++){
			
			matrix[c*3+r] = m_t.get(r,0)*this.get(0,c) + m_t.get(r,1)*this.get(1,c) + 
						m_t.get(r,2)*this.get(2,c);
			
		}			
	}
	
		this.array = matrix;
	}
else 
		throw new Error(" ");
	
	
};

mat.prototype.translate = function(translate){
	
	if(translate instanceof Array)
	{
		
		//settup the translatio matrix
		m_t = new mat([
			1.0,0.0,0.0,
			0.0,1.0,0.0,
			translate[0],translate[1],1.0
		]);
			
			
		//multiply the transition matrix
		this.mult(m_t);
		
		
	}
	else 
		throw new Error("Unsupported")
	
};

function createMatI(){
	 var matrix = new Float32Array(9);
	matrix.set([1,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0]);
	return matrix; 
};
