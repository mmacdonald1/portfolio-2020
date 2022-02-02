import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-dot-ball",
  templateUrl: "./dot-ball.component.html",
  styleUrls: ["./dot-ball.component.scss"],
})
export class DotBallComponent implements OnInit {
  @ViewChild("canvas", { static: false }) canvas: ElementRef;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  group = new THREE.Object3D();

  constructor() {}

  ngOnInit() {
    const bgColor = 0xf0f1f2;

    this.scene.fog = new THREE.FogExp2(bgColor, 0.005);

    this.camera.position.set(0, 0, 250);

    this.renderer.setClearColor(bgColor);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas").appendChild(this.renderer.domElement);

    var radius = 180;
    var separation = 10;

    for (var s = 0; s <= 180; s += separation) {
      var radianS = (s * Math.PI) / 180;
      var pZ = radius * Math.cos(radianS);

      for (var t = 0; t < 360; t += separation) {
        var radianT = (t * Math.PI) / 180;
        var pX = radius * Math.sin(radianS) * Math.cos(radianT);
        var pY = radius * Math.sin(radianS) * Math.sin(radianT);

        var geometory = new THREE.SphereGeometry(1.5, 6, 6);
        var material = new THREE.MeshBasicMaterial({
          color: 0x888888,
        });
        var mesh = new THREE.Mesh(geometory, material);
        mesh.position.x = pX;
        mesh.position.y = pY;
        mesh.position.z = pZ;
        this.group.add(mesh);
      }
    }

    this.scene.add(this.group);

    this.update();
  }

  resizeCanvasToDisplaySize = () => {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // set render target sizes here
    }
  };

  update = () => {
    this.resizeCanvasToDisplaySize();

    var rotateX = this.group.rotation.x + 0.0005;
    var rotateY = this.group.rotation.y + 0.00125;
    var rotateZ = this.group.rotation.z + 0.0025;
    this.group.rotation.set(rotateX, rotateY, rotateZ);

    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update);
  };
}
