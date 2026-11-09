import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './authShader';
import { authShaderSettings } from './shaderSettings';
import type { AuthShaderSettings } from './shaderSettings';
import './AuthBackground.css';

export interface AuthBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Pause illumination; geometry and texture always remain fixed. */
  paused?: boolean;
  /** Named SHADER-fill properties extracted from the Figma component. */
  shaderSettings?: Partial<AuthShaderSettings>;
}

/** Primary/900 auth backdrop with a native, Figma-informed dotted gold shader. */
export const AuthBackground: React.FC<AuthBackgroundProps> = ({
  children, className = '', style, paused = false, shaderSettings, ...props
}) => {
  const host = useRef<HTMLDivElement>(null);
  const settings = useRef({ paused, values: { ...authShaderSettings, ...shaderSettings } });
  useEffect(() => {
    settings.current = { paused, values: { ...authShaderSettings, ...shaderSettings } };
  }, [paused, shaderSettings]);

  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      element.dataset.fallback = 'true';
      return;
    }
    element.appendChild(renderer.domElement);
    const css = getComputedStyle(element);
    // Use raw display-space colors: GLSL emits final colors without Three.js color chunks.
    const color = (token: string) => {
      const result = new THREE.Color();
      const value = css.getPropertyValue(token).trim();
      const channels = value.match(/^rgb\(([^)]+)\)$/)?.[1].split(',').map(Number);
      if (channels?.length === 3) return result.setRGB(channels[0] / 255, channels[1] / 255, channels[2] / 255);
      result.setStyle(value, THREE.SRGBColorSpace);
      return result.convertLinearToSRGB();
    };
    const uniforms: Record<string, THREE.IUniform> = {
      uResolution: { value: new THREE.Vector2() }, uDpr: { value: 1 }, uTime: { value: 0 },
      uNavy: { value: color('--color-primary-900') },
      uColor1: { value: color('--auth-shader-color1') },
      uColor2: { value: color('--color-fmdq-gold') },
      uColor3: { value: color('--auth-shader-color3') },
      uColor4: { value: color('--auth-shader-color4') },
      uFocus: { value: color('--auth-shader-focus') },
    };
    for (const [key, value] of Object.entries(authShaderSettings)) {
      uniforms[`u${key[0].toUpperCase()}${key.slice(1)}`] = { value };
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(new THREE.Mesh(geometry, material));
    let dirty = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(Math.max(1, element.clientWidth), Math.max(1, element.clientHeight));
      renderer.getDrawingBufferSize(uniforms.uResolution.value);
      uniforms.uDpr.value = dpr;
      dirty = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    // Paint an initial frame even when a browser defers animation in a background window.
    renderer.render(scene, camera);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last = 0, drawn = -Infinity, elapsed = 0, previousSettings = '';
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      const delta = last ? Math.min((now - last) / 1000, .1) : 0;
      last = now;
      if (document.hidden) return;
      const { paused: isPaused, values } = settings.current;
      const animated = !isPaused && !reducedMotion.matches && values.speed !== 0;
      if (animated) elapsed += delta;
      const snapshot = JSON.stringify(values);
      if (snapshot !== previousSettings) { previousSettings = snapshot; dirty = true; }
      if (!dirty && (!animated || now - drawn < 1000 / 30)) return;
      for (const [key, value] of Object.entries(values)) {
        uniforms[`u${key[0].toUpperCase()}${key.slice(1)}`].value = value;
      }
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      dirty = false;
      drawn = now;
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`fmdqui-auth-page ${className}`} style={style} {...props}>
      <div className="fmdqui-auth-page__shader" ref={host} aria-hidden="true" />
      {children && <div className="fmdqui-auth-page__content">{children}</div>}
    </div>
  );
};
