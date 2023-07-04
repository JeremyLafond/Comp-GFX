/**
 * Specifies a geometric object.
 *
 * @author Jeremy Lafond
 * @this {Geometry}
 */
class Geometry 
{
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor()
  {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.normals = [];
    this.size = 0.0
    this.color = {r: 1.0, g: 1.0, b: 1.0};
    this.modelMatrix = new Matrix4();
    this.ProjMatrix = new Matrix4();
    this.ViewMatrix = new Matrix4();
    this.normalMatrix = new Matrix4();
  }

  /**
   * Sets shader for use on this shape
   * calls use shader and specifies
   * correct shader source
   */
  setShader(gType)
  {
    if(gType == 0)
    {
      return plain;
    }
  }

  normalize(v1)
  {
    var nR = new Vector3();
    var mag =  Math.sqrt( Math.pow(v1.elements[0], 2) +
                          Math.pow(v1.elements[1], 2) +
                          Math.pow(v1.elements[2], 2));
    nR.elements[0] = v1.elements[0] / mag;
    nR.elements[1] = v1.elements[1] / mag;
    nR.elements[2] = v1.elements[2] / mag;
    return nR;
  }

  setTexture(texNum)
  {
    loadImages(['external/textures/cat_diff.jpg', 'external/textures/TeapotTex.jpg', 'external/textures/checkerboard.png', 'external/textures/gridFloor.png', 'external/textures/gridSky.png'], texNum, create2DTexture);
    return texNum;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render()  
  {
    cam.updateViewMatrix();
    cam.setProjection(cameraMode, fov, near, far);
    
    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();
    sendUniformMatToGLSL(this.modelMatrix, u_ModelMatrix);
    sendUniformMatToGLSL(this.normalMatrix, u_NormalMatrix);

    var colors = [];
    for(var i = 0; i < this.vertices.length; i++)
    {
      colors.push(this.color.r, this.color.g, this.color.b);
    }
    var vColors = new Float32Array(colors);
    sendAttributeBufferToGLSL(vColors, 3, a_Color, colBuff);

    if(obj == -1)
    {
      newV = new Float32Array(this.pts);
      sendAttributeBufferToGLSL(newV, 3, a_Position, vertBuff);
    }
    else
    {
      newV = new Float32Array(this.vertices);
      sendAttributeBufferToGLSL(newV, 3, a_Position, vertBuff);
    }

    var normV = new Float32Array(this.normals);
    sendAttributeBufferToGLSL(normV, 3, a_Normal, normBuff);

    //draw attribute buffer
    tellGLSLToDrawCurrentBuffer(newV.length);
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation()
  {
    return;
  }
}