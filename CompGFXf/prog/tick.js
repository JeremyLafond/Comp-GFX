/**
 * Responsible for animating the Scene.
 */

function tick()
{
  setTimeout(function()
  {
    resize(gl.canvas);
  	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  	requestAnimationFrame(tick);
    s.updateAnimation();
  }, 1000 / 60);
}

function resize()
{
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth || canvas.height != displayHeight)
  {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}