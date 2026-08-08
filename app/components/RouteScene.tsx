"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero background: a convoy of glowing riders tracing a live route through a
 * dark 3D grid. Raw three.js (no R3F) for full control over the animation and
 * zero extra bundle weight. Colours are the app's lime/green brand accents.
 */
export default function RouteScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const LIME = new THREE.Color("#caf300");
    const GREEN = new THREE.Color("#62ff96");
    const BG = new THREE.Color("#0e0e0e");

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BG, 26, 68);

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 9, 26);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- The route (a winding 3D curve) -------------------------------------
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-30, 0, 10),
        new THREE.Vector3(-20, 0.4, -6),
        new THREE.Vector3(-9, 0, 6),
        new THREE.Vector3(-2, 0.6, -9),
        new THREE.Vector3(7, 0, 4),
        new THREE.Vector3(15, 0.5, -8),
        new THREE.Vector3(24, 0, 2),
        new THREE.Vector3(34, 0.3, -4),
      ],
      false,
      "catmullrom",
      0.5
    );

    const DIVISIONS = 700;
    const points = curve.getPoints(DIVISIONS);
    const positions = new Float32Array((DIVISIONS + 1) * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    // Dim full route (the plan)
    const fullGeo = new THREE.BufferGeometry();
    fullGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const fullMat = new THREE.LineBasicMaterial({
      color: LIME,
      transparent: true,
      opacity: 0.16,
    });
    const fullLine = new THREE.Line(fullGeo, fullMat);
    scene.add(fullLine);

    // Bright travelled progress (revealed up to the lead rider)
    const progGeo = new THREE.BufferGeometry();
    progGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const progMat = new THREE.LineBasicMaterial({
      color: LIME,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const progLine = new THREE.Line(progGeo, progMat);
    progGeo.setDrawRange(0, 2);
    scene.add(progLine);

    // ---- Riders (the convoy) — each is a live location pin ------------------
    type Rider = {
      pin: THREE.Sprite;
      glow: THREE.Sprite;
      baseH: number; // base pin height in world units
      offset: number; // fractional spacing behind the lead
    };
    const riders: Rider[] = [];
    const RIDER_COUNT = 6;

    // Neutral white radial glow (tinted per-rider via material.color)
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.35, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    // Draw a classic map marker (teardrop + centre dot) into a texture.
    // Tip sits near the bottom of the canvas so it can anchor onto the route.
    const PIN_W = 128;
    const PIN_H = 168;
    const PIN_TIP_Y = 152; // px from top → used to anchor the sprite
    const makePinTex = (fill: string, inner: string) => {
      const c = document.createElement("canvas");
      c.width = PIN_W;
      c.height = PIN_H;
      const ctx = c.getContext("2d")!;
      const cx = PIN_W / 2;
      const cy = 58;
      const r = 46;

      ctx.shadowColor = fill;
      ctx.shadowBlur = 12;

      // Teardrop body
      ctx.beginPath();
      ctx.moveTo(cx, PIN_TIP_Y);
      ctx.bezierCurveTo(cx - r * 0.72, cy + r * 0.78, cx - r, cy + r * 0.28, cx - r, cy);
      ctx.arc(cx, cy, r, Math.PI, 0, false);
      ctx.bezierCurveTo(cx + r, cy + r * 0.28, cx + r * 0.72, cy + r * 0.78, cx, PIN_TIP_Y);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Centre hole
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = inner;
      ctx.fill();

      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const pinTexLead = makePinTex("#caf300", "#171e00");
    const pinTexFollow = makePinTex("#62ff96", "#003a1c");
    const PIN_ASPECT = PIN_W / PIN_H;
    const tipCenterY = 1 - PIN_TIP_Y / PIN_H; // normalized anchor for the tip

    for (let i = 0; i < RIDER_COUNT; i++) {
      const isLead = i === 0;

      const pin = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: isLead ? pinTexLead : pinTexFollow,
          transparent: true,
          depthWrite: false,
        })
      );
      // Anchor the pin's tip onto the route
      pin.center.set(0.5, tipCenterY);
      const baseH = isLead ? 1.6 : 1.2;
      pin.scale.set(baseH * PIN_ASPECT, baseH, 1);
      pin.renderOrder = isLead ? 3 : 2;
      scene.add(pin);

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: isLead ? LIME : GREEN,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: isLead ? 0.75 : 0.5,
        })
      );
      const gs = isLead ? 2.4 : 1.6;
      glow.scale.set(gs, gs, 1);
      scene.add(glow);

      riders.push({ pin, glow, baseH, offset: i * 0.028 });
    }

    // ---- Ground grid --------------------------------------------------------
    const grid = new THREE.GridHelper(160, 80, 0x2a2a2a, 0x20201f);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.4;
    grid.position.y = -2;
    scene.add(grid);

    // Faint drifting stars/particles for depth
    const starCount = 220;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 1] = Math.random() * 30 - 2;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x8f9378,
        size: 0.12,
        transparent: true,
        opacity: 0.5,
      })
    );
    scene.add(stars);

    // Tilt the whole world for a bold, receding perspective
    const world = new THREE.Group();
    scene.add(world);
    [fullLine, progLine, grid, stars, ...riders.flatMap((r) => [r.glow, r.pin])].forEach(
      (o) => world.add(o)
    );
    world.rotation.x = -0.16;

    // ---- Interaction: mouse parallax ---------------------------------------
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    // ---- Resize -------------------------------------------------------------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Animation loop -----------------------------------------------------
    const clock = new THREE.Clock();
    let leadT = 0;
    let raf = 0;
    const tmp = new THREE.Vector3();

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Lead rider crawls the route, loops around
      leadT = (leadT + dt * 0.035) % 1;
      progGeo.setDrawRange(0, Math.max(2, Math.floor(leadT * DIVISIONS)));

      riders.forEach((r, i) => {
        let rt = leadT - r.offset;
        if (rt < 0) rt += 1;
        curve.getPointAt(rt, tmp);
        // gentle lane-weave per follower
        const weave = i === 0 ? 0 : Math.sin(t * 1.2 + i) * 0.5;
        // Tip of the pin sits on the route
        r.pin.position.set(tmp.x, tmp.y, tmp.z + weave);
        // Pin bob + pulse (scale keeps the tip anchored via sprite.center)
        const pulse = 1 + Math.sin(t * 3 + i) * 0.05;
        r.pin.scale.set(r.baseH * PIN_ASPECT * pulse, r.baseH * pulse, 1);
        // Glow sits at the pin's head, gently throbbing
        r.glow.position.set(tmp.x, tmp.y + r.baseH * 0.6, tmp.z + weave);
        (r.glow.material as THREE.SpriteMaterial).opacity =
          (i === 0 ? 0.6 : 0.4) + Math.sin(t * 3 + i) * 0.15;
      });

      // ease parallax
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      world.rotation.z = current.x * 0.05;
      world.rotation.x = -0.16 + current.y * 0.04;
      camera.position.x = current.x * 2.4;
      camera.position.y = 9 - current.y * 1.4;
      camera.lookAt(0, 1.5, 0);

      stars.rotation.y = t * 0.01;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      // Render a single static frame
      riders.forEach((r) => {
        let rt = 0.5 - r.offset;
        if (rt < 0) rt += 1;
        curve.getPointAt(rt, tmp);
        r.pin.position.set(tmp.x, tmp.y, tmp.z);
        r.glow.position.set(tmp.x, tmp.y + r.baseH * 0.6, tmp.z);
      });
      progGeo.setDrawRange(0, Math.floor(0.5 * DIVISIONS));
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    // ---- Cleanup ------------------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      glowTex.dispose();
      pinTexLead.dispose();
      pinTexFollow.dispose();
      scene.traverse((obj) => {
        const anyObj = obj as THREE.Mesh;
        anyObj.geometry?.dispose?.();
        const mat = anyObj.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
