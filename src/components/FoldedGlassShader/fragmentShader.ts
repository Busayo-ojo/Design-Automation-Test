export const fragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform vec2 uTrailPositions[16];
uniform float uTrailAges[16];
uniform float uDpr;

// Configurable Shader Uniforms
uniform float uFoldCount;          // Default 23.0
uniform float uFoldDepth;          // Default 0.45
uniform float uFoldSharpness;      // Default 1.8
uniform float uWarmLightStrength;  // Default 1.0
uniform float uCoolLightStrength;  // Default 1.0
uniform float uNoiseStrength;      // Default 0.035
uniform float uGrainStrength;      // Default 0.014
uniform float uInteractionStrength;// Default 0.025
uniform float uAnimationStrength;  // Default 1.0

// --- Hash & Noise Utilities ---
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// 2D Value Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i + vec2(0.0, 0.0)), hash12(i + vec2(1.0, 0.0)), u.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Low-frequency FBM (3 Octaves)
float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.55;
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 3; i++) {
    val += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.45;
  }
  return val;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 st = vec2(uv.x * aspect, uv.y);

  // --- 1. PROCEDURAL 23-FACET GEOMETRY ---
  float foldCount = (uFoldCount > 0.0) ? uFoldCount : 23.0;
  float cell = uv.x * foldCount;
  float cellIndex = floor(cell);
  float localU = fract(cell);

  // Deterministic facet variation
  float facetHash = hash11(cellIndex * 17.13 + 3.71);
  float facetSlopeVariation = (facetHash - 0.5) * 0.12;
  float facetDensityVariation = 1.0 + (facetHash - 0.5) * 0.05;

  // Triangular / Sinusoidal Fold Surface
  float centeredU = localU - 0.5;
  float rawSlope = sign(centeredU) * pow(abs(centeredU) * 2.0, max(0.1, uFoldSharpness - 1.0));
  float slope = mix(centeredU * 2.0, rawSlope, 0.6) + facetSlopeVariation;

  // Surface normal
  float normalX = slope * uFoldDepth;
  float normalZ = sqrt(max(0.1, 1.0 - normalX * normalX));
  vec3 normal = normalize(vec3(normalX, 0.0, normalZ));

  // --- 2. CURSOR INTERACTION DISTURBANCE ---
  vec3 normalDisturbance = vec3(0.0);
  float cursorHighlight = 0.0;
  float trailStrength = uInteractionStrength;

  if (trailStrength > 0.0001) {
    for (int i = 0; i < 16; i++) {
      float age = uTrailAges[i];
      if (age < 0.0 || age >= 1.0) continue;

      vec2 trailPos = uTrailPositions[i];
      vec2 dST = (uv - trailPos) * vec2(aspect, 1.0);
      float distSq = dot(dST, dST);

      float radius = 0.04 + 0.08 * (1.0 - age);
      float influence = exp(-distSq / (radius * radius)) * (1.0 - age);

      vec2 normVel = normalize(uMouseVelocity + vec2(0.0001));
      float velProj = dot(dST, normVel);
      float wakeFactor = 1.0 + clamp(velProj * 4.0, 0.0, 2.0);
      influence *= wakeFactor;

      vec2 distDir = normalize(dST + vec2(0.0001));
      normalDisturbance.xy += distDir * influence * trailStrength * 1.5;
      cursorHighlight += influence * trailStrength * 0.8;
    }
  }

  // Perturb normal with cursor wake
  normal = normalize(normal + normalDisturbance);

  // --- 3. SEAM SHADOW & EDGE OCCLUSION ---
  float seamDist = min(localU, 1.0 - localU);
  float seamShadow = smoothstep(0.0, 0.06, seamDist);
  seamShadow = mix(0.70, 1.0, seamShadow);

  // --- 4. GLOBAL COLOR FIELD SYNTHESIS ---
  vec3 colAmberCore   = vec3(0.945, 0.663, 0.239); // #F1A93D (Bright upper-left)
  vec3 colAmberMid    = vec3(0.812, 0.549, 0.196); // #CF8C32 (Beam center)
  vec3 colBronze      = vec3(0.647, 0.443, 0.212); // #A57136 (Beam tail)
  vec3 colCharcoal    = vec3(0.251, 0.235, 0.259); // #403C42 (Mid transition)
  vec3 colNavyTopRight= vec3(0.015, 0.040, 0.100); // #040A1A (Upper right)
  vec3 colNavyBotRight= vec3(0.027, 0.075, 0.176); // #07132D (Lower right)
  vec3 colNavyBotLeft = vec3(0.004, 0.004, 0.020); // #010105 (Lower left near black)

  // Diagonal Light Beam Geometry
  float topY = 1.0 - uv.y;
  vec2 beamOrigin = vec2(-0.1, 1.05);
  vec2 beamDir = normalize(vec2(0.85, -0.65));
  vec2 relPos = vec2(uv.x, topY) - beamOrigin;

  float beamProj = dot(relPos, beamDir);
  float beamDist = length(relPos - beamDir * beamProj);

  float beamCrossFalloff = exp(-pow(beamDist / 0.38, 2.0));
  float beamLengthFalloff = smoothstep(1.3, 0.0, beamProj);
  float warmBeamIntensity = beamCrossFalloff * beamLengthFalloff * uWarmLightStrength;

  float radialDist = length((vec2(uv.x, topY) - vec2(0.05, 0.95)) * vec2(1.0, 1.2));
  float warmRadialIntensity = exp(-pow(radialDist / 0.50, 2.0)) * uWarmLightStrength;

  float totalWarmField = max(warmBeamIntensity, warmRadialIntensity * 0.85);

  float coolRightField = smoothstep(0.15, 0.90, uv.x) * uCoolLightStrength;
  float coolBottomRightField = smoothstep(0.3, 1.0, uv.x) * smoothstep(0.5, 0.0, topY) * uCoolLightStrength;

  float verticalDarkening = smoothstep(0.85, 0.05, topY);
  verticalDarkening = pow(verticalDarkening, 1.4);

  // --- 5. ATMOSPHERIC FBM MESH GRADIENT ---
  float animTime = uTime * 0.008 * uAnimationStrength;
  vec2 noiseUV = st * 1.5 + vec2(animTime * 0.5, animTime * 0.2);
  float atmosphericFBM = fbm(noiseUV);
  float densityPerturbation = (atmosphericFBM - 0.5) * uNoiseStrength * facetDensityVariation;

  totalWarmField = clamp(totalWarmField + densityPerturbation, 0.0, 1.0);

  // --- 6. FACET NORMAL LIGHTING MODULATION (NdotL) ---
  vec3 lightDir = normalize(vec3(-0.6, 0.5, 0.62));
  float NdotL = clamp(dot(normal, lightDir), 0.0, 1.0);
  float facetLighting = pow(NdotL, 1.25);

  float warmModulated = totalWarmField * (0.35 + 0.65 * facetLighting);

  // --- 7. COLOR FIELD BLENDING ---
  vec3 warmColor = mix(colBronze, colAmberMid, smoothstep(0.2, 0.6, warmModulated));
  warmColor = mix(warmColor, colAmberCore, smoothstep(0.6, 1.0, warmModulated));

  vec3 baseColor = mix(colNavyBotLeft, colNavyTopRight, smoothstep(0.0, 1.0, uv.x));
  baseColor = mix(baseColor, colNavyBotRight, coolBottomRightField * 0.6);

  float charcoalMask = smoothstep(0.05, 0.35, warmModulated) * (1.0 - smoothstep(0.35, 0.8, warmModulated));
  baseColor = mix(baseColor, colCharcoal, charcoalMask * 0.65);

  vec3 color = mix(baseColor, warmColor, smoothstep(0.02, 0.85, warmModulated));

  // --- 8. MATERIAL SPECTULAR & FRESNEL ---
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 4.5);
  vec3 fresnelColor = mix(vec3(0.01, 0.03, 0.08), vec3(0.2, 0.15, 0.08), totalWarmField);
  color += fresnelColor * fresnel * 0.25;

  color *= seamShadow;
  color *= mix(0.12, 1.0, verticalDarkening);

  if (cursorHighlight > 0.001) {
    vec3 localGlowColor = mix(vec3(0.1, 0.2, 0.4), warmColor * 1.2, smoothstep(0.1, 0.5, totalWarmField));
    color += localGlowColor * cursorHighlight;
  }

  float vignette = 1.0 - 0.15 * length((uv - 0.5) * 1.3);
  color *= clamp(vignette, 0.0, 1.0);

  // --- 9. HIGH-FREQUENCY TEMPORAL FILM GRAIN ---
  if (uGrainStrength > 0.0001) {
    float grainTime = (uAnimationStrength > 0.0) ? fract(uTime * 60.0) : 0.0;
    vec2 grainCoord = gl_FragCoord.xy + grainTime * 123.456;
    float grain = hash12(grainCoord) - 0.5;
    color += vec3(grain) * uGrainStrength;
  }

  color = clamp(color, 0.0, 1.0);

  fragColor = vec4(color, 1.0);
}
`;
