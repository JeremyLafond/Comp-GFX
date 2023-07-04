//Jeremy Lafond

var VSHADER_SOURCE = `
uniform mat4 u_NormalMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;
uniform mat4 u_modelMatrix;
uniform vec3 u_LightPosition;
uniform bool u_Clicked;
uniform vec4 u_Eye;
attribute vec3 a_Normal;
attribute vec3 a_Color;
attribute vec4 a_Position;
varying vec3 v_Norm;
varying vec3 v_Color;
varying vec3 N;
varying vec3 L;
varying float v_Diffuse;
varying vec3 v_Lighting;
varying vec3 v_Position;
varying float v_Dist;
  void main() {
    mat4 modelViewMatrix = u_ViewMatrix * u_modelMatrix;
    N = normalize(u_NormalMatrix * vec4(a_Normal, 1.0)).xyz;
    L = normalize(u_LightPosition);
    v_Diffuse = dot(N, L);
    if(v_Diffuse < 0.0)
    {
      v_Diffuse *= -1.0;
    }
    gl_Position = u_ProjMatrix * u_ViewMatrix * u_modelMatrix * a_Position;
    v_Position = u_LightPosition - (u_modelMatrix * a_Position).xyz;
    v_Lighting = a_Normal;
    v_Norm = normalize( mat3(modelViewMatrix) * a_Normal);
    v_Color = a_Color;
    v_Dist = gl_Position.w;
}`;

var FSHADER_SOURCE = `
precision mediump float;
uniform vec3 u_FogColor;
uniform vec2 u_FogDist;
varying vec3 N;
varying vec3 L;
varying float v_Diffuse;
varying vec3 v_Position;
varying vec3 v_Lighting;
varying vec3 v_Color;
varying vec3 v_Norm;
varying float v_Dist;
uniform float u_Mode;

void main() {
  float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);
  vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);
  vec3 ambientLight = vec3(0.2, 0.2, 0.2) * v_Color;
  vec3 diffuseColor = vec3(1.0, 1.0, 1.0) * v_Color;
  vec3 specularColor = vec3(1, 1, 1);
  vec3 R = reflect(-L, N);
  vec3 V = normalize(v_Position);
  float specAngle = dot(R, V);
  if(specAngle < 0.0)
  {
    specAngle *= specAngle;
  }
  float specular = pow(specAngle, (v_Diffuse + 1.0) * v_Position.y);
  vec3 Lighting;
  if(u_Mode == 0.0) 
  {
     Lighting = v_Lighting;
  } 
  else 
  {
     Lighting = (color * ambientLight) + (color * diffuseColor * v_Diffuse) + (color * specular * specularColor);
  }

  gl_FragColor = vec4(v_Color * Lighting, 1.0);
}`;