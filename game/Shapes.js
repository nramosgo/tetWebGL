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
* X,X
* X,X
*/
var squareT = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 1, 1, 0.0,1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 1, 1, 0.0,1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 1, 1, 0.0,1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 1, 1, 0.0,1.0];
	
};

squareT.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([0,-spacey]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([spacex,-spacey]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
}
/**
* This is the left z shape
*
*/

var leftZ = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	
	//2x2 block
	this.botMid = new block(gl, shader, canvas);
	
	
};

leftZ.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([0,-spacey]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([-spacex,-spacey]);
	this.botMid.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botMid.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botMid.render();
}
/**
* This the rightZ
*
*
*/
var rightZ = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 0.0, 1, 0.0,1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 0.0, 1, 0.0,1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 0.0, 1, 0.0,1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 0.0, 1, 0.0,1.0];
	
};

rightZ.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([-spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([0,-spacey]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([spacex,-spacey]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
};

/**
* Line piece
*/
var line = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 0, .5, 1, 1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 0.0, .5, 1, 1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 0, .5, 1, 1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 0, .5, 1,1.0];
	
};

line.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([2*spacex,0]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([3*spacex,0]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
};

/**
* This is the right L shape
*/

var rightL = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 0, 0.0, 1, 1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 0.0, 0.0, 1, 1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 0, 0.0, 1, 1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 0, 0.0, 1,1.0];
	
};

rightL.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([0,spacey]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([spacex,0]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([2*spacex,0]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
};

/**
* Left L shape
*/
var leftL = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 1.0, .5, 0.0, 1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 1.0, .5, 0.0, 1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 1.0, .5, 0.0, 1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 1.0, .5, 0.0,1.0];
	
};

leftL.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([2*spacex,0]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([2*spacex,spacey]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
};

/**
*The middle finger shape
*/
var upsideT = function(gl, shader, canvas){
	//the origin will be the top right block
	this.origin = new block(gl, shader, canvas);
	this.origin.shape.color = [ 0.7, 0.0, 1, 1.0];
	//set the pieces relative to origin
	this.omatrix = this.origin.clonematrix() ;
		
	//1x2 block
	this.rightop = new block(gl, shader, canvas);
	this.rightop.shape.color = [ 0.7, 0.0, 1, 1.0];	
	
	
		
	//2x1 block
	this.botLeft = new block(gl, shader, canvas);
	this.botLeft.shape.color = [ 0.7, 0.0, 1, 1.0];
	//2x2 block
	this.botRight = new block(gl, shader, canvas);
	this.botRight.shape.color = [ 0.7, 0.0, 1,1.0];
	
};

upsideT.prototype.render = function(){
	//go thorugh and render the aligned pieces	
	this.omatrix = this.origin.clonematrix();
	var onebytwo = this.omatrix.clone();	
	onebytwo.translate([-spacex,0]);
	this.rightop.shape.matrix = onebytwo;
	
	var twobyone = this.omatrix.clone();
	twobyone.translate([spacex,0]);
	this.botLeft.shape.matrix = twobyone;
	
	var twobytwo = this.omatrix.clone();
	twobytwo.translate([0,spacey]);
	this.botRight.shape.matrix = twobytwo;
	
	//this is the final step
	this.origin.shape.updateBuffers();
	this.rightop.shape.updateBuffers();
	this.botLeft.shape.updateBuffers();
	this.botRight.shape.updateBuffers();
	
	this.origin.render();
	this.rightop.render();
	this.botLeft.render();
	this.botRight.render();
};




upsideT.prototype.transLeft = function(){
	this.origin.translate([-spacex,0]);
};

upsideT.prototype.transRight = function(){
	this.origin.translate([spacex,0]);
};

upsideT.prototype.transDown = function(){
	this.origin.translate([0,-spacey]);
}

upsideT.prototype.transUp = function(){
	this.origin.translate([0,spacey]);
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