/**
 * Specifies a camera in 3D space. Used by scene.
 */
class Camera
{
    /**
    * Specifies a camera in 3D space. Used by scene.
    */
    constructor()
    {
        this.position = new Vector3([-22.35, 0, 23.066]); //position is the location of camera
        this.center = new Vector3([1.08, 0.25, -0.45]); //center is where the camera points
        this.up = new Vector3([0, 1, 0]);
        this.projMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
        this.upSensi = 0.1;
        this.fogX = -0.4;
        this.fogY = 0.1;
        this.fawg = [];
        this.fogMove = [];
        this.angle = 1.0;
    }

    /**
    * Move and rotate the camera.
    *
    * Takes moveVec magnitude and normalizes
    * for directional components.
    * returns normalized movement array
    *
    */
    move() 
    {
        if (keyW == true) 
        {
            var wV = new Vector3();
            wV = this.normie(this.center);
            this.position.elements[0] += (wV.elements[0] * step);
            this.position.elements[2] += (wV.elements[2] * step);
        }

        if (keyS == true)
        {
            var sV = new Vector3();
            var sV = this.normie(this.center);
            this.position.elements[0] -= (sV.elements[0] * step);
            this.position.elements[2] -= (sV.elements[2] * step);
        }

        if (keyA == true)
        {
            var aV = new Vector3();
            aV = this.normie(this.cross(this.center, this.up));
            this.position.elements[0] -= (aV.elements[0] * step);
            this.position.elements[2] -= (aV.elements[2] * step);
        }

        if (keyD == true)
        {
            var dV = new Vector3();
            dV = this.normie(this.cross(this.center, this.up));
            this.position.elements[0] += (dV.elements[0] * step);
            this.position.elements[2] += (dV.elements[2] * step);
        }

        if (keyL == true)
        {
            this.center.elements[0] += Math.cos(step) * this.upSensi;
            this.center.elements[2] += Math.sin(step) * this.upSensi;

        }

        if (keyJ == true)
        {
            this.center.elements[0] -= Math.cos(step) * this.upSensi;
            this.center.elements[2] -= Math.sin(step) * this.upSensi;
        }

        if (keyI == true)
        {
            this.center.elements[1] += Math.sin(step) * this.upSensi;
        }

        if (keyK == true)
        {
            this.center.elements[1] -= Math.sin(step) * this.upSensi;
        }
        if (keyUp == true)
        {
            this.position.elements[1] += Math.sin(step) * this.upSensi;
        }
        if (keyDown == true)
        {
            this.position.elements[1] -= Math.sin(step) * this.upSensi;
        }
        if (keyN == true)
        {
            if(mode == 1)
            {
                mode = 0;
                gl.uniform1f(u_Mode, 0);
            }
            else
            {
                mode = 1;
                gl.uniform1f(u_Mode, 1);
            }
        }
    }

    cross(v1, v2)
    {
        var cP = new Vector3();
        cP.elements[0] = ( (v1.elements[1] * v2.elements[2]) - (v1.elements[2] * v2.elements[1]) );
        cP.elements[1] = ( (v1.elements[2] * v2.elements[0]) - (v1.elements[0] * v2.elements[2]) );
        cP.elements[2] = ( (v1.elements[0] * v2.elements[1]) - (v1.elements[1] * v2.elements[0]) );
        return cP;
    }

    normie(v1)
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

    /**
    * Changes the projection. Can be orthographic or perspective.
    *
    * @param {String} perspectiveType The type of projection
    */
    setProjection(projectionType, fov, near, far) 
    {
        if(projectionType == 0)
        {
            this.projMatrix.setPerspective(fov, 16.0/9.0 * canvas.width/canvas.height, near, far);
        }

        if(projectionType == 1)
        {
            var fh = Math.tan(fov/360 * Math.PI) * near;
            var fw = fh * canvas.width/canvas.height
            this.projMatrix.setOrtho(-fw, fw, -fh, fh, near, far);
        }
        sendUniformMatToGLSL(this.projMatrix, u_ProjMatrix);
    }

    /**
    * Updates the view matrix of your camera.
    */
    updateViewMatrix() 
    {
        //this.angle++;
        this.viewMatrix.setLookAt
        (
            this.position.elements[0],
            this.position.elements[1],
            this.position.elements[2],
            this.center.elements[0] + this.position.elements[0],
            this.center.elements[1] + this.position.elements[1],
            this.center.elements[2] + this.position.elements[2],
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]
        );
        //console.log("I am here: ", this.position.elements);
        //console.log("I am looking here: ", this.center.elements);
        sendUniformMatToGLSL(this.viewMatrix, u_ViewMatrix);
        this.fogX -= 0.005;
        this.fogY -= 0.005;
        /*if(this.fogX <= this.fogY)
        {
            this.fogY += 0.003;
        }
        if(this.fogY > 20)
        {
            this.fogX = -5;
            this.fogY = 0.5;
        }*/
        this.fogMove = [this.fogX, this.fogY];
        //this.fawg = [0.05, 0.0, Math.sin(this.angle)];
        gl.uniform2fv(u_FogDist, this.fogMove);
        //gl.uniform3fv(u_FogColor, this.fawg);
    }

    getViewMatrix()
    {
        var viewMat = new Matrix4();
        viewMat.setLookAt
        (
            this.position.elements[0],
            this.position.elements[1],
            this.position.elements[2],
            this.center.elements[0],
            this.center.elements[1],
            this.center.elements[2],
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]
        );
        return viewMat;
    }
}