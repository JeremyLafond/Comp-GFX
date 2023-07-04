/**
 * Specifies a tilted cube which rotates.
 *
 * @author Jeremy Lafond
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry
{
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY, centerZ, rV, gV, bV, objM)
  {
    super();
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.color = {r: rV, g: gV, b: bV};
    this.vertices = this.generateCubeVertices(this.size);
    this.scaleMat = new Matrix4();
    this.transMat = new Matrix4();
    this.shader = this.setShader(0);
    this.normals = this.generateNorms();
    this.scaleMat.setScale((1 + Math.random()) * 2, (1 + Math.random()) * 3.6, (1+ Math.random()) * 1.5);
    this.modelMatrix = this.scaleMat.multiply(this.modelMatrix);
    this.transMat.setTranslate(this.centerX, this.centerY, this.centerZ);
    this.modelMatrix = this.transMat.multiply(this.modelMatrix);
    obj = objM;
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   * @param {Number} size The size of the tilted cube.
   */
  generateCubeVertices(size) 
  {
    var scal = size / 8;
    var cube = [this.centerX - scal, this.centerY - scal, this.centerZ - scal,
                this.centerX - scal, this.centerY + scal, this.centerZ - scal,
                this.centerX + scal, this.centerY + scal, this.centerZ - scal,

                this.centerX + scal, this.centerY + scal, this.centerZ - scal,
                this.centerX + scal, this.centerY - scal, this.centerZ - scal,
                this.centerX - scal, this.centerY - scal, this.centerZ - scal,

                this.centerX + scal, this.centerY - scal, this.centerZ - scal,
                this.centerX + scal, this.centerY + scal, this.centerZ - scal,
                this.centerX + scal, this.centerY + scal, this.centerZ + scal,

                this.centerX + scal, this.centerY - scal, this.centerZ - scal,
                this.centerX + scal, this.centerY + scal, this.centerZ + scal,
                this.centerX + scal, this.centerY - scal, this.centerZ + scal,

                this.centerX + scal, this.centerY - scal, this.centerZ + scal,
                this.centerX + scal, this.centerY + scal, this.centerZ + scal,
                this.centerX - scal, this.centerY + scal, this.centerZ + scal,

                this.centerX + scal, this.centerY - scal, this.centerZ + scal,
                this.centerX - scal, this.centerY + scal, this.centerZ + scal,
                this.centerX - scal, this.centerY - scal, this.centerZ + scal,

                this.centerX - scal, this.centerY - scal, this.centerZ + scal,
                this.centerX - scal, this.centerY + scal, this.centerZ + scal,
                this.centerX - scal, this.centerY + scal, this.centerZ - scal,

                this.centerX - scal, this.centerY - scal, this.centerZ + scal,
                this.centerX - scal, this.centerY + scal, this.centerZ - scal,
                this.centerX - scal, this.centerY - scal, this.centerZ - scal,

                this.centerX - scal, this.centerY + scal, this.centerZ - scal,
                this.centerX - scal, this.centerY + scal, this.centerZ + scal,
                this.centerX + scal, this.centerY + scal, this.centerZ + scal,

                this.centerX - scal, this.centerY + scal, this.centerZ - scal,
                this.centerX + scal, this.centerY + scal, this.centerZ + scal,
                this.centerX + scal, this.centerY + scal, this.centerZ - scal,

                this.centerX - scal, this.centerY - scal, this.centerZ + scal,
                this.centerX - scal, this.centerY - scal, this.centerZ - scal,
                this.centerX + scal, this.centerY - scal, this.centerZ - scal,

                this.centerX - scal, this.centerY - scal, this.centerZ + scal,
                this.centerX + scal, this.centerY - scal, this.centerZ - scal,
                this.centerX + scal, this.centerY - scal, this.centerZ + scal];
    return cube;
  }

  generateNorms()
  {
    var norm = [
                0.0, 0.0, -1.0, //back face
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                1.0, 0.0, 0.0, //right face
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                
                0.0, 0.0, 1.0, //frontface
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,

                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                -1.0, 0.0, 0.0, //left face
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,

                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,

                0.0, 1.0, 0.0, //topface
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                0.0, -1.0, 0.0, //bottom face
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0];
                return norm;
  }

/*  render()
  {
    sendUniformVec4ToGLSL([this.r, this.g, this.b, 1.0], u_FragColor);
    sendUniformMatToGLSL(this.modelMatrix, u_ModelMatrix);
    //send attribute buffer
    var newV = new Float32Array(this.vertices);
    sendAttributeBufferToGLSL(newV, 3, a_Position);
    //draw attribute buffer
    tellGLSLToDrawCurrentBuffer(newV.length);
  }
*/
  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() 
  {
    obj = 0;
    this.render();
  }
}