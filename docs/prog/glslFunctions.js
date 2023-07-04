/**
 * Jeremy Lafond
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
function sendUniformMatToGLSL(val, uniformName)
{
  //send uniform matrix elements to shader
  gl.uniformMatrix4fv(uniformName, false, val.elements);
}

function initBuffers()
{
   //create buffers
   colBuff = gl.createBuffer();
   vertBuff = gl.createBuffer();
   normBuff = gl.createBuffer();
}

function sendAttributeBufferToGLSL(data, dataCount, attribName, bufferName)
{ 
  //bind buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferName);
  //assign buffer data
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  //set data pointer
  gl.vertexAttribPointer(attribName, dataCount, gl.FLOAT, false, 0, 0);
  //enable buffer
  gl.enableVertexAttribArray(attribName);
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(pointCount)
{
  gl.drawArrays(gl.TRIANGLES, 0, (pointCount / 3));
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(val, uniformName)
{
  //send values to uniform
  gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]);
}

/**
 * Sends a WebGL 2D texture object (created by load2DTexture) and sends it to
 * the shaders.
 *
 * @param val The WebGL 2D texture object being passed
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 * @param {String} uniformName The name of the uniform variable where the texture's
 * textureUnit location (0 - 7) will reside
 */
function send2DTextureToGLSL(uniformName, texNum)
{
  gl.uniform1i(u_Sampler, texNum);
}

/**
 * Creates a WebGl 2D texture object.
 *
 * @param imgPath A file path/data url containing the location of the texture image
 * @param magParam texParameteri for gl.TEXTURE_MAG_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param minParam texParameteri for gl.TEXTURE_MIN_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param wrapSParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param wrapTParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param callback A callback function which executes with the completed texture
 * object passed as a parameter.
 */
/*function loadTexture(image, callback)
{
  img.src = 'external/textures/flcl.jpg'; // make a set image path function later . . .
  img.onload = callback(); //wait for load THEN execute create
}*/

function create2DTexture(images, texNum)
{
  var texture = gl.createTexture();
	//Flip your image's y-axis and bind your texture object to gl.TEXTURE_2D
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	gl.activeTexture(gl.TEXTURE0 + texNum);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	//Using multiple calls to gl.texParameteri, pass magParam, minParam, wrapSParam, and wrapTParam.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	//Set the texture's image to the loaded image using gl.texImage2D
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images[texNum]);
}