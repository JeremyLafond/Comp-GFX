/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author Jeremy Lafond
 * @this {Square}
 */
class Square extends Geometry
{
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY, centerZ, rV, gV, bV, normMode, objM)
  {
    super();
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.color = {r: rV, g: gV, b: bV};
    this.normMode = normMode
    this.vertices = this.generateSquareVertices(this.size, this.centerX, this.centerY, this.centerZ);
    this.transMat1 = new Matrix4();
    this.transMat2 = new Matrix4();
    this.shader = this.setShader(0);
    this.normals = this.generateNorms(normMode);
    this.angle = 1;
    obj = objM;
    //this.texture = this.setTexture(this.texNum);
    //this.uv = this.generateUVCoordinates();
  }

/*  generateUVCoordinates()
  {
    var vTex = new Float32Array([
                  0.0, 0.0,
                  0.0, 40.0,
                  40.0,40.0,
                  
                  0.0, 0.0,
                  40.0, 40.0,
                  40.0, 0.0
      ]);
    return vTex;
  }*/
  generateNorms(normMode)
  {
    if(normMode == 0)
    {
      var norm = [
                  0.0, 1.0, 0.0, //typical large square surface
                  0.0, 1.0, 0.0, //such as ground sky walls etc
                  0.0, 1.0, 0.0,

                  0.0, 1.0, 0.0,
                  0.0, 1.0, 0.0,
                  0.0, 1.0, 0.0];
      return norm;
    }
    if(normMode == 1)
    {
      var norm1 = [
                  0.0, -Math.random(), 0.0, //typical large square surface
                  0.0, -Math.random(), 0.0, //such as ground sky walls etc
                  0.0, -Math.random(), 0.0,

                  0.0, -Math.random(), 0.0,
                  0.0, -Math.random(), 0.0,
                  0.0, -Math.random(), 0.0];
      return norm1
    }
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
  }*/

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices(size, centerX, centerY, centerZ)
  {
    var step = this.size / 8;
    var squa = /*[this.centerX - step,
                this.centerY,
                this.centerZ - step,

                this.centerX - step,
                this.centerY,
                this.centerZ + step,

                this.centerX + step,
                this.centerY,
                this.centerZ - step,

                this.centerX + step,
                this.centerY,
                this.centerZ + step,

                this.centerX + step,
                this.centerY,
                this.centerZ - step,

                this.centerX - step,
                this.centerY,
                this.centerZ + step];*/

                [this.centerX + step,
                this.centerY,
                this.centerZ - step,

                this.centerX - step,
                this.centerY,
                this.centerZ - step,

                this.centerX - step,
                this.centerY,
                this.centerZ + step,

                this.centerX - step,
                this.centerY,
                this.centerZ + step,

                this.centerX + step,
                this.centerY,
                this.centerZ + step,

                this.centerX + step,
                this.centerY,
                this.centerZ - step];
  return squa;
  }

  updateAnimation()
  {
    if(this.normMode == 1)
    {
      this.transMat1.setTranslate(Math.random() * cloudChaos * Math.cos(this.angle), 
                                  Math.random() * cloudChaos  * .001 * Math.sin(this.angle), 
                                  Math.random() * cloudChaos * Math.cos(this.angle));
      this.modelMatrix = this.transMat1.multiply(this.modelMatrix);
      this.angle += 0.0001;
    }
/*    this.transMat1 = this.transMat1.setTranslate(-this.centerX, -this.centerY, -this.centerZ);
    this.modelMatrix = this.transMat1.multiply(this.modelMatrix);

    this.transMat2 = this.transMat2.setTranslate(this.centerX, this.centerY, this.centerZ);
    this.modelMatrix = this.transMat2.multiply(this.modelMatrix);

    sendUniformMatToGLSL(this.modelMatrix, u_ModelMatrix);*/
    obj = 0;
    this.render();
  }
}