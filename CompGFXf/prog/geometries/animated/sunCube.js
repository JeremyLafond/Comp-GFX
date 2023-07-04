/**
 * Specifies a tilted cube which rotates.
 *
 * @author Jeremy Lafond
 * @this {TiltedCube}
 */
class SunCube extends Geometry
{
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, sunHeight, centerX, centerY, centerZ, r, g, b, objM)
  {
    super();
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.r = r;
    this.g = g;
    this.b = b;
    this.sunLand = this.centerX;
    this.sunHeight = sunHeight;
    this.vertices = this.generateCubeVertices(this.size);
    this.transMat1 = new Matrix4();
    this.transMat2 = new Matrix4();
    this.spinMat = new Matrix4();
    this.angle = -0.3;
    this.shader = this.setShader(0);
    this.normals = this.generateNorms();
    obj = objM;
  }

  generateNorms()
  {
    var norm = [
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,

                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,

                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0];
                return norm;
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
    //console.log("shape here: ", cube[0], cube[1], cube[2]);
    return cube;
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() 
  {
    gl.clearColor(0.05, 0.0, Math.sin(this.angle), 1.0);
    gl.uniform3f(u_LightPosition, this.sunLand * Math.cos(this.angle),
                                  this.centerY * Math.sin(this.angle),
                                  0);
    this.transMat1.setTranslate(this.sunLand * Math.cos(this.angle),
                                this.sunHeight * Math.sin(this.angle),
                                0);
    this.modelMatrix = this.transMat1.multiply(this.modelMatrix);
    this.angle+=0.05;
    obj = 0;
    this.render();
  }
}