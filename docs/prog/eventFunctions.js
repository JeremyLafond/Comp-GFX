/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. 
 * 
 * Jeremy Lafond
 */
//camera mode flag
var cameraMode = 0;

var shapeSize = 20;

var step = 0.4;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var keyL = false;
var keyJ = false;
var keyI = false;
var keyK = false;
var keyN = false;
var keyUp = false;
var keyDown = false;
var cloudChaos = 0.1;

var fov = 50;
var near = 0.001;
var far = 3000;
var cheese = ['You gotta be kittin me right meow', 'Meow you doin?', 'Meow money, meow problems', 'Im feline purrdy good right about meow.', 'Well . . . the cats outa the bag now']

function initEventHandelers()
{
	var cMode = document.getElementById('cMode');
 	var fovVal = document.getElementById('fovVal');
 	var nearVal = document.getElementById('nearVal');
  var farVal = document.getElementById('farVal');
	var source = document.getElementById('source');
  var cloudy = document.getElementById('cloudy');
	var imgStr = source;
  cloudy.addEventListener("change", function(){cloudChaos = parseFloat(cloudy.value); gl.uniform3f(u_AmbientLight, 0.2 + cloudChaos / 300, 0.2 + cloudChaos / 300 , 0.2 + cloudChaos / 300);});
	cMode.addEventListener("click", changeCameraMode);
	fovVal.addEventListener("change", function(){changeProjection(0, parseFloat(fovVal.value));});
	nearVal.addEventListener("change", function(){changeProjection(1, parseFloat(nearVal.value));});
	farVal.addEventListener("change",  function(){changeProjection(2, parseFloat(farVal.value));});
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);
  setWorld(imgStr);
	render();
  canvas.onmousedown = function(ev)
  {
    render();
    var xC = ev.clientX, yC = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= xC && xC < rect.right && rect.top <= yC && yC < rect.bottom)
    {
      var x_in_canvas = xC - rect.left;
      var y_in_canvas = rect.bottom - yC;
      var picked = check(x_in_canvas, y_in_canvas);
      if (picked) 
      {
        alert(cheese[Math.floor(Math.random() * cheese.length)]);
      }
    }
  }
}

function check(x, y)
{
  var picked = false;
  var pixels = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  if (pixels[0] >= 20 && pixels[1] == 0.0 && pixels[2] >= 20)
  {
    picked = true;
  }
  return picked;
}

function setWorld(imgStr)
{
  s.addGeometry(new Square(2000, 0, -4, 0.0, 0.75, 1.0, 0.0, 0, 0)); // floor
  sun = new SunCube(20, 25, 100, 0, -50, 1.0, 1.0, 0.1, 0);
  s.addGeometry(sun);// sun cube
  var world = sampleImageColor(imgStr);
  var row = 0;
  var col = 0;
  for(let i = 0; i <= world.length; i += 4)
  {
    if(world[i] == 0 && world[i + 1] == 0 && world[i + 2] == 255)//blue
    {
      s.addGeometry(new TiltedCube(6, col / 2, -0.3, row / 2, 0.0, 0.0, 1.0, 0));
      row+=8;
      if(row == 80)
      {
        row = 0;
        col+=8;
      }
    }
    if(world[i] == 255 && world[i + 1] == 255 && world[i + 2] == 255)//white
    {
      s.addGeometry(new Square(Math.random() * 13, col / 2, 5, row / 2, 1.0, 1.0, 1.0, 1, 0));
      row+=8;
      if(row == 80)
      {
        row = 0;
        col+=8;
      }
    }
    if(world[i] == 255 && world[i + 1] == 0 && world[i + 2] == 0)//red
    {
      s.addGeometry(new TiltedCube(6, col / 2, -0.3, row / 2, 1.0, 0.0, 0.0, 0));
      row+=8;
      if(row == 80)
      {
        row = 0;
        col+=8;
      }
    }
  }
  meow = new LoadedOBJ(2, -0.3, -0.5, 1.0, 0.0, 1.0, objCat, 1);
  meow1 = new LoadedOBJ(0, 0.1, 0, 1.0, 0.0, 1.0, objCat, 1);
  meow2 = new LoadedOBJ(10, -0.3, -1, 1.0, 0.0, 1.0, objCat, 1);
  s.addGeometry(meow);
  s.addGeometry(meow1);
  s.addGeometry(meow2);
  initBuffers();
  //console.log(s.geometries);
}

function onKeyDown(event)
{
  var keyCode = event.keyCode;
  if(keyCode == 87) // w
  {
      keyW = true;
  }
  if(keyCode == 65) // a
  {
      keyA = true;
  }
  if(keyCode == 83) // s
  {
      keyS = true;
  }
  if(keyCode == 68) // d
  {
      keyD = true;
  }
  if(keyCode == 74)
  {
      keyJ = true;
  }
  if(keyCode == 76)
  {
      keyL = true;
  }
  if(keyCode == 73)
  {
      keyI = true;
  }
  if(keyCode == 75)
  {
      keyK = true;
  }
  if(keyCode == 187)
  {
    keyUp = true;
  }
  if(keyCode == 189)
  {
    keyDown = true;
  }
  if(keyCode == 78)
  {
    keyN = true;
  }
  cam.move();
}

function onKeyUp(event) 
{
  var keyCode = event.keyCode;
  if(keyCode == 87) // w
  {
      keyW = false;
  }
  if(keyCode == 65) // a
  {
      keyA = false;
  }
  if(keyCode == 83) // s
  {
      keyS = false;
  }
  if(keyCode == 68) // d
  {
      keyD = false;
  }
  if(keyCode == 74)
  {
      keyJ = false;
  }
  if(keyCode == 76)
  {
      keyL = false;
  }
  if(keyCode == 73)
  {
  	keyI = false;
  }
  if(keyCode == 75)
  {
  	keyK = false;
  }
  if(keyCode == 187)
  {
    keyUp = false;
  }
  if(keyCode == 189)
  {
    keyDown = false;
  }
  if(keyCode == 78)
  {
    keyN = false;
  }
}

/**
 * Renders the scene on the HTML canvas.
 */
function render()
{
	s.render(); //calls scene render
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changeshapeSize(size)
{
  shapeSize = size;
}

function changeCameraMode()
{
  if(cameraMode == 1)
  {
    cameraMode = 0;
    sendTextToHTML("&#8734 Perspective &#8734", cMode);
    cam.setProjection(0, fov, near, far);
    return;
  }
  if(cameraMode == 0)
  {
    cameraMode = 1;
    sendTextToHTML("&#128528 Orthographic &#128528", cMode);
    cam.setProjection(1, fov, near, far);
    return;
  }
}

function changeProjection(val, valC)
{
  if(cameraMode == 0)
  {
    if(val == 0)
    {
      fov = 180-valC;
    }
    if(val == 1)
    {
      near = valC;
    }
    if(val == 2)
    {
      far = valC;
    }
    cam.setProjection(0, fov, near, far);
  }
  else
  {
    if(val == 0)
    {
      fov = valC;
    }
    if(val == 1)
    {
      near = valC;
    }
    if(val == 2)
    {
      far = valC;
    }
    cam.setProjection(1, fov, near, far);
  }
}

function loadImage(url, callback) //onImageLoad is callback
{
  	var image = new Image();
  	image.src = url;
  	image.onload = callback;
  	return image;
    //onImageLoad
}


function loadImages(urls, texNum, callback)//callback is createTex
{
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished
  // loading.
  var onImageLoad = function() 
  {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad == 0) 
    {
      callback(images, texNum);
    }
  };

  for (var j = 0; j < imagesToLoad; ++j) 
  {
    var image = loadImage(urls[j], onImageLoad);
    images.push(image);
  }
}