var Shader = function(gl,vshaderID, fshaderID)
{
	//create excpetion for Shader Exception
	function ShaderException(){
		this.name = "ShaderException";
	}
	
	/*
	*create shaders
	*/
	
	var vElem = document.getElementById(vshaderID);
	if(!vElem){
		alert("Unable to load vertex shader " + vshaderID);
		return false;
	}
	
	var fElem = document.getElementById(fshaderID);
	if(!fElem){
		alert("Unable to load vertex shader" + fshaderID);
		throw new ShaderException();
	}
	
	this.program = createProgram(gl, vElem.text, fElem.text);
	if (!this.program){
		alert('Failed to create program');
		throw new ShaderException();
	}
	/*
	* get Gl shader varaible locations
	*/
	
	this.a_Position = gl.getAttribLocation(this.program, 'a_Position');
	if (this.a_Position < 0){
		alert('Failed to get storage location of a_Position');
		throw new ShaderException();
	}
	
	this.u_modelView = gl.getUniformLocation(this.program, 'u_modelView');
    if (this.u_modelView < 0) {
        alert('Failed to get the storage location of u_modelView');
        throw new ShaderException();
    }    
	
	
	
	this.u_FragColor = gl.getUniformLocation(this.program, 'u_FragColor');
    if (!this.u_FragColor) {
        alert('Failed to get the storage location of u_FragColor');
        throw new ShaderException();
    }    
	
	
	
	
	this.gl = gl;
}


