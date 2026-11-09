/** Extracted through Figma Desktop Bridge, 2026-10-27.
 * Component 10310:262840 → animated-shader 10310:262844.
 * Figma's proprietary SHADER fill exposes parameters, not its GLSL source.
 * The native renderer reconstructs the effect using these settings.
 */
export const authShaderSettings = {
  bands: 1.2,
  definition: 7,
  frequency: 1.37,
  speed: 0.55,
  exposure: 1.41,
  saturation: 1.2,
  contrastAmt: 2.52,
  amplitude: 0.62,
  grain: 0.11,
  featureScale: 0.7,
  seed: 542,
} as const;

export interface AuthShaderSettings {
  bands: number;
  definition: number;
  frequency: number;
  speed: number;
  exposure: number;
  saturation: number;
  contrastAmt: number;
  amplitude: number;
  grain: number;
  featureScale: number;
  seed: number;
}
