requirejs.config({
	"baseUrl": '/'
});


require([],

	function() {

		"use strict";

        var canvas, scene, engine, camera, ss = false;

        var send = function(b64){
            var options = {
                url:"/saveData",
                type: "POST",
                data:{
                    b64:b64
                }
            };
            $.ajax(options)
            .done(function(){
                alert('done');
            });
        };

        var init = function(){
            canvas = document.getElementById('renderCanvas');
            engine = new BABYLON.Engine(canvas, true);
            scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0,0,0,0);
            camera = new BABYLON.TargetCamera('camera1', new BABYLON.Vector3(5, 5, -5), scene);
            camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
            camera.orthoTop = 5;
            camera.orthoBottom = -5;
            camera.orthoLeft = -5;
            camera.orthoRight = 5;
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
            var box = BABYLON.Mesh.CreateBox('box', 0.6, scene);
            var mat = new BABYLON.StandardMaterial();
            mat.diffuseColor = new BABYLON.Color3(1, 0, 0);
            box.material = mat;
            box.position.y = 1;
            camera.setTarget(box.position);
            engine.runRenderLoop(function(){
                scene.render();
                if (ss) {
                    BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, { precision: 1 }, function(data){
                        send(data);
                    });
                    ss = false;
                }
            });
            window.addEventListener('resize', function(){
                engine.resize();
            });
            setTimeout(function(){
                ss = true;
            }, 2000);

        };
        $(document).ready(init);
    }
);
