/**
 * Specifies a WebGL scene.
 *
 * @author Jeremy Lafond
 * @this {Scene}
 */
class Scene
{
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() 
  {
    this.geometries = []; // Geometries being drawn on canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry)
  {
    this.geometries.push(geometry);
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() 
  {
      for(var i = 0; i < s.geometries.length; i++)
      {
        this.geometries[i].updateAnimation();
      }
      render();
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render()
  {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var geoSize = this.geometries.length;
    for(var i = 0; i < geoSize; i++)
    {
      this.geometries[i].render();
    }
  }
}