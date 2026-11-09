import { useEffect, useRef, useState, type FC } from 'react';
import { vertexShader } from './vertexShader';
import { fragmentShader } from './fragmentShader';
import './FoldedGlassShader.css';

export interface FoldedGlassShaderProps {
  foldCount?: number;
  foldDepth?: number;
  foldSharpness?: number;
  warmLightStrength?: number;
  coolLightStrength?: number;
  noiseStrength?: number;
  grainStrength?: number;
  interactionStrength?: number;
  animationSpeed?: number;
  showCalibrationByDefault?: boolean;
}

export const FoldedGlassShader: FC<FoldedGlassShaderProps> = ({
  foldCount = 23.0,
  foldDepth = 0.45,
  foldSharpness = 1.8,
  warmLightStrength = 1.0,
  coolLightStrength = 1.0,
  noiseStrength = 0.035,
  grainStrength = 0.014,
  interactionStrength = 0.025,
  animationSpeed = 1.0,
  showCalibrationByDefault = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Shader Uniform Parameters (State for Calibration Panel)
  const [params, setParams] = useState({
    foldCount,
    foldDepth,
    foldSharpness,
    warmLightStrength,
    coolLightStrength,
    noiseStrength,
    grainStrength,
    interactionStrength,
    animationSpeed,
  });

  const paramsRef = useRef(params);
  paramsRef.current = params;

  // Calibration Overlay State
  const [showDevPanel, setShowDevPanel] = useState(showCalibrationByDefault);
  const [refOverlayOpacity, setRefOverlayOpacity] = useState(0.0);
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Keyboard shortcut listener ('d' or 'c' to toggle calibration panel)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd' || e.key.toLowerCase() === 'c') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;
        setShowDevPanel((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // WebGL2 Renderer Setup & Animation Loop
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: false,
      depth: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('WebGL2 context unavailable. Rendering static fallback.');
      setWebglSupported(false);
      return;
    }

    // Helper: Compile Shader
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Compile Vertex & Fragment Shaders
    const vs = compileShader(gl.VERTEX_SHADER, vertexShader);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad Buffer Setup
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations Caching
    const uLocs = {
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uMouseVelocity: gl.getUniformLocation(program, 'uMouseVelocity'),
      uDpr: gl.getUniformLocation(program, 'uDpr'),

      uFoldCount: gl.getUniformLocation(program, 'uFoldCount'),
      uFoldDepth: gl.getUniformLocation(program, 'uFoldDepth'),
      uFoldSharpness: gl.getUniformLocation(program, 'uFoldSharpness'),
      uWarmLightStrength: gl.getUniformLocation(program, 'uWarmLightStrength'),
      uCoolLightStrength: gl.getUniformLocation(program, 'uCoolLightStrength'),
      uNoiseStrength: gl.getUniformLocation(program, 'uNoiseStrength'),
      uGrainStrength: gl.getUniformLocation(program, 'uGrainStrength'),
      uInteractionStrength: gl.getUniformLocation(program, 'uInteractionStrength'),
      uAnimationStrength: gl.getUniformLocation(program, 'uAnimationStrength'),
    };

    // Trail Uniform Array Locations
    const uTrailPosLocs: (WebGLUniformLocation | null)[] = [];
    const uTrailAgeLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < 16; i++) {
      uTrailPosLocs.push(gl.getUniformLocation(program, `uTrailPositions[${i}]`));
      uTrailAgeLocs.push(gl.getUniformLocation(program, `uTrailAges[${i}]`));
    }

    // Interaction State
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const prevMouse = { x: 0.5, y: 0.5 };
    const mouseVel = { x: 0.0, y: 0.0 };

    const trailPositions = Array.from({ length: 16 }, () => ({ x: -1.0, y: -1.0 }));
    const trailAges = Array.from({ length: 16 }, () => 1.0);
    let trailHeadIndex = 0;

    // Mouse & Touch Listeners
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = e.clientY / window.innerHeight;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouse.x = e.touches[0].clientX / window.innerWidth;
        targetMouse.y = e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Reduced Motion Detection
    let reducedMotion = false;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      reducedMotion = motionQuery.matches;
    };
    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    // Resize Handler
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.uniform2f(uLocs.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uLocs.uDpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Render Loop
    let animId: number;
    let startTime = performance.now();
    let lastTime = startTime;

    const render = (now: number) => {
      const elapsedTime = (now - startTime) * 0.001;
      const dt = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      // Smooth mouse position
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.15;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.15;

      // Mouse velocity
      mouseVel.x = (targetMouse.x - prevMouse.x) / (dt + 0.001);
      mouseVel.y = (targetMouse.y - prevMouse.y) / (dt + 0.001);
      prevMouse.x = targetMouse.x;
      prevMouse.y = targetMouse.y;

      // Push trail point if mouse moved
      const dx = targetMouse.x - smoothMouse.x;
      const dy = targetMouse.y - smoothMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0.002) {
        trailPositions[trailHeadIndex] = { x: targetMouse.x, y: targetMouse.y };
        trailAges[trailHeadIndex] = 0.0;
        trailHeadIndex = (trailHeadIndex + 1) % 16;
      }

      // Age trail points
      for (let i = 0; i < 16; i++) {
        if (trailAges[i] < 1.0) {
          trailAges[i] += dt * 2.5;
          if (trailAges[i] > 1.0) trailAges[i] = 1.0;
        }
      }

      // Set Shader Uniforms
      gl.useProgram(program);
      gl.uniform1f(uLocs.uTime, elapsedTime);
      gl.uniform2f(uLocs.uMouse, smoothMouse.x, smoothMouse.y);
      gl.uniform2f(uLocs.uMouseVelocity, mouseVel.x, mouseVel.y);

      const currentParams = paramsRef.current;
      gl.uniform1f(uLocs.uFoldCount, currentParams.foldCount);
      gl.uniform1f(uLocs.uFoldDepth, currentParams.foldDepth);
      gl.uniform1f(uLocs.uFoldSharpness, currentParams.foldSharpness);
      gl.uniform1f(uLocs.uWarmLightStrength, currentParams.warmLightStrength);
      gl.uniform1f(uLocs.uCoolLightStrength, currentParams.coolLightStrength);
      gl.uniform1f(uLocs.uNoiseStrength, currentParams.noiseStrength);
      gl.uniform1f(uLocs.uGrainStrength, currentParams.grainStrength);
      gl.uniform1f(uLocs.uInteractionStrength, currentParams.interactionStrength);
      gl.uniform1f(uLocs.uAnimationStrength, reducedMotion ? 0.0 : currentParams.animationSpeed);

      // Trail uniforms
      for (let i = 0; i < 16; i++) {
        if (uTrailPosLocs[i]) gl.uniform2f(uTrailPosLocs[i], trailPositions[i].x, trailPositions[i].y);
        if (uTrailAgeLocs[i]) gl.uniform1f(uTrailAgeLocs[i], trailAges[i]);
      }

      // Draw Quad
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', updateMotionPreference);

      gl.deleteBuffer(positionBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="folded-glass-fallback">
        <img src="/reference_ground_truth.png" alt="Folded Glass Material Fallback" />
      </div>
    );
  }

  return (
    <div className={`folded-glass-container ${isSplitMode ? 'split-mode' : ''}`} ref={containerRef}>
      {/* Primary WebGL2 Canvas */}
      <canvas ref={canvasRef} className="folded-glass-canvas" />

      {/* Ground Truth Reference Image Overlay (for Calibration) */}
      <div
        className="reference-overlay"
        style={{
          opacity: isSplitMode ? 1.0 : refOverlayOpacity,
          display: refOverlayOpacity > 0 || isSplitMode ? 'block' : 'none',
        }}
      >
        <img src="/reference_ground_truth.png" alt="Reference Ground Truth" />
      </div>

      {/* Floating Toggle Button for Dev Calibration Panel */}
      <button
        className="dev-panel-toggle"
        onClick={() => setShowDevPanel((prev) => !prev)}
        title="Toggle Shader Calibration Panel (Press 'D')"
      >
        ⚙️ {showDevPanel ? 'Close Calibration' : 'Calibrate Shader'}
      </button>

      {/* Developer Calibration Drawer */}
      {showDevPanel && (
        <div className="dev-calibration-panel">
          <div className="panel-header">
            <h3>Shader Calibration Panel</h3>
            <span className="key-hint">Press 'D' to toggle</span>
          </div>

          <div className="control-group">
            <label>Reference Overlay Opacity: {(refOverlayOpacity * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={refOverlayOpacity}
              onChange={(e) => setRefOverlayOpacity(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isSplitMode}
                onChange={(e) => setIsSplitMode(e.target.checked)}
              />
              Side-by-Side Comparison Mode
            </label>
          </div>

          <hr className="panel-divider" />

          <div className="control-group">
            <label>Facet Count (Default 23): {params.foldCount}</label>
            <input
              type="range"
              min="10"
              max="40"
              step="1"
              value={params.foldCount}
              onChange={(e) => setParams({ ...params, foldCount: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Fold Depth: {params.foldDepth.toFixed(2)}</label>
            <input
              type="range"
              min="0.1"
              max="1.2"
              step="0.02"
              value={params.foldDepth}
              onChange={(e) => setParams({ ...params, foldDepth: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Fold Sharpness: {params.foldSharpness.toFixed(2)}</label>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.05"
              value={params.foldSharpness}
              onChange={(e) => setParams({ ...params, foldSharpness: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Warm Light Strength: {params.warmLightStrength.toFixed(2)}</label>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.05"
              value={params.warmLightStrength}
              onChange={(e) => setParams({ ...params, warmLightStrength: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Cool Light Strength: {params.coolLightStrength.toFixed(2)}</label>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.05"
              value={params.coolLightStrength}
              onChange={(e) => setParams({ ...params, coolLightStrength: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Atmospheric FBM Strength: {params.noiseStrength.toFixed(3)}</label>
            <input
              type="range"
              min="0.0"
              max="0.12"
              step="0.005"
              value={params.noiseStrength}
              onChange={(e) => setParams({ ...params, noiseStrength: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Film Grain Strength: {params.grainStrength.toFixed(3)}</label>
            <input
              type="range"
              min="0.0"
              max="0.05"
              step="0.002"
              value={params.grainStrength}
              onChange={(e) => setParams({ ...params, grainStrength: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Cursor Interaction Strength: {params.interactionStrength.toFixed(3)}</label>
            <input
              type="range"
              min="0.0"
              max="0.08"
              step="0.002"
              value={params.interactionStrength}
              onChange={(e) => setParams({ ...params, interactionStrength: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Animation Speed: {params.animationSpeed.toFixed(2)}</label>
            <input
              type="range"
              min="0.0"
              max="3.0"
              step="0.1"
              value={params.animationSpeed}
              onChange={(e) => setParams({ ...params, animationSpeed: parseFloat(e.target.value) })}
            />
          </div>

          <button
            className="reset-btn"
            onClick={() =>
              setParams({
                foldCount: 23,
                foldDepth: 0.45,
                foldSharpness: 1.8,
                warmLightStrength: 1.0,
                coolLightStrength: 1.0,
                noiseStrength: 0.035,
                grainStrength: 0.014,
                interactionStrength: 0.025,
                animationSpeed: 1.0,
              })
            }
          >
            Reset Defaults
          </button>
        </div>
      )}
    </div>
  );
};
