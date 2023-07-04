/**
 * Function called when the webpage loads.
 *
 * Jeremy Lafond
 *
 */

var canvas = document.getElementById('webgl');
if(!canvas)
{
	console.log('Failed to retrieve canvas element');
}

let gl = getWebGLContext(canvas);
if(!gl)
{
	console.log('Failed to get rendering context for WebGL');
}


//let textured = createShader(gl, VSHADER_T_SOURCE, FSHADER_T_SOURCE);

let program;

let plain = createShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
program = useShader(gl, plain);

var u_modelMatrix;
var a_Position;
var u_ViewMatrix;
var u_ProjMatrix;
var a_Color;
var a_Normal;
var u_LightColor;
var u_AmbientLight;
var u_LightPosition;
var u_NormalMatrix;
var u_FogColor;
var u_Eye;
var u_FogDist;
var obj = 0;
var newV;

var colBuff;
var vertBuff;
var normBuff;

var fogColor = new Float32Array([0.137, 0.231, 0.423]);
var eye = new Float32Array([1.08, 0.25, -0.45, 1.0]);
var fogDist = new Float32Array([-5.0, 9.0]);

u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
u_FogColor = gl.getUniformLocation(gl.program, 'u_FogColor');
u_FogDist = gl.getUniformLocation(gl.program, 'u_FogDist');
u_Eye = gl.getUniformLocation(gl.program, 'u_Eye');
u_Mode = gl.getUniformLocation(gl.program, 'u_Mode');

var mode = 1;
gl.uniform1f(u_Mode, 1);
gl.uniform3fv(u_FogColor, fogColor);
gl.uniform4fv(u_Eye, eye);
gl.uniform2fv(u_FogDist, fogDist);

a_Position = gl.getAttribLocation(gl.program, 'a_Position');
a_Color = gl.getAttribLocation(gl.program, 'a_Color');
a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');

//scene variable
var s = new Scene();
var cam = new Camera();

function main()
{
	initEventHandelers();
	tick();
}