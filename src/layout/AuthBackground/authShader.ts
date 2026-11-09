export const vertexShader = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const fragmentShader = /* glsl */ `
precision highp float;
uniform vec2 uResolution;
uniform float uDpr, uTime;
uniform float uBands, uDefinition, uFrequency, uSpeed, uExposure;
uniform float uSaturation, uContrastAmt, uAmplitude, uGrain, uFeatureScale, uSeed;
uniform vec3 uNavy, uColor1, uColor2, uColor3, uColor4, uFocus;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
// Smooth 3D value noise. Time is a continuous third coordinate, never a new
// random seed per frame. Polynomial hashing avoids per-sample trigonometry.
float hash3(vec3 p) {
  p = fract(p * .1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise3(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(
    mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
        mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
        mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float broadNoise(vec3 p) {
  return .72*noise3(p)+.28*noise3(p*1.93+vec3(7.1,3.8,9.2));
}
void main() {
  vec2 pixel = gl_FragCoord.xy / uDpr;
  vec2 size = uResolution / uDpr;
  // Figma's mask is rotated -90 degrees; retain its measured screen-space lattice.
  vec2 pitch = vec2(18.3675768,17.2058038);
  vec2 radii = vec2(3.673525,3.441174);
  vec2 cell = floor(pixel / pitch);
  vec2 local = (fract(pixel / pitch) - .5) * pitch / radii;
  float aa = 1.0 / (min(radii.x,radii.y) * uDpr);
  float dotMask = 1.0 - smoothstep(1.0-aa,1.0+aa,length(local));
  vec2 p = (cell+.5)*pitch / size.y;
  // A continuously evolving, domain-warped height field models folded fabric.
  // No directional phase ramp: contours can turn, close, stretch and separate.
  float t = uTime * uSpeed * .34 * .7;
  vec3 seed = vec3(fract(uSeed*.618),fract(uSeed*.317),fract(uSeed*.113))*19.0;
  vec2 q = (p-size/size.y*.5) * (uFeatureScale/.7);
  vec3 flowPoint = vec3(q*.65,t*.43)+seed;
  vec2 drift = vec2(
    broadNoise(flowPoint),
    broadNoise(flowPoint+vec3(13.7,5.4,8.1))) - .5;
  vec2 folded = q + drift * uAmplitude * 1.45;
  vec3 surfacePoint = vec3(folded*uFrequency*uBands*.92,t)+seed;
  // Suppress short-wavelength curvature while retaining irregular evolution.
  float height = .92*noise3(surfacePoint)
    + .08*noise3(surfacePoint*1.65+vec3(7.1,3.8,9.2));
  // A second independent scale changes fold width and allows highlights to
  // bloom and recede locally instead of travelling as a single wave train.
  float breathing = noise3(vec3(q*.55,t*.61)+seed+23.4);
  float crest = .47 + .10*(breathing-.5);
  float signedFold = height-crest;
  float distanceToFold = abs(signedFold);
  // Coverage ebbs independently of fold motion. Sparse intervals leave
  // roughly nine parts navy to one part visible gold, with fuller moments
  // between them. This is an artistic coverage target, not a pixel quota.
  float coverage = .5-.5*cos(uTime*uSpeed*.45);
  float width = mix(.015,.051,coverage)*mix(.75,1.15,breathing);
  // Fabric catches light asymmetrically: a firmer lit hem on one side,
  // a longer, softly shaded face on the other. The side varies locally.
  float litSide = mix(-1.0,1.0,smoothstep(.35,.65,breathing));
  float shoulderWidth = width*mix(.85,2.3,smoothstep(-.015,.015,signedFold*litSide));
  float feather = exp(-pow(distanceToFold/max(shoulderWidth,.01),2.0));
  float crease = exp(-pow(distanceToFold/max(width,.008),4.0));
  // Some folds have firm crease cores, others diffuse into soft shoulders.
  float creaseWeight = mix(.25,.72,smoothstep(.3,.7,breathing));
  float ridge = mix(feather*.62,crease,creaseWeight);
  float presence = smoothstep(.20,.58,breathing);
  float light = ridge*mix(.38,1.0,presence);
  light = pow(clamp(light,0.,1.),max(.85,uDefinition/7.0));
  light = pow(light,max(.8,uContrastAmt/2.52));
  // Occasional large draped sweeps, like the additional reference frames.
  // A low-frequency warped surface supplies long arcs without a repeated
  // stripe train. Blend by maximum so overlapping folds do not stack gold.
  float drapeHeight = noise3(vec3(folded*.68,t*.39)+seed+vec3(4.7,9.2,2.3));
  float drapeDistance = drapeHeight-(.48+.06*(breathing-.5));
  float drapeWidth = mix(.012,.085,smoothstep(-.01,.025,drapeDistance));
  float drapeFace = exp(-pow(drapeDistance/drapeWidth,2.0));
  float drapeHem = exp(-pow(drapeDistance/.012,2.0));
  float sweep = max(drapeFace*.58,drapeHem*.87);
  float sweepPresence = smoothstep(.30,.85,coverage)*mix(.4,1.0,presence);
  light = max(light,sweep*sweepPresence);
  // Static engraving and grain remain anchored to the surface, even as light moves.
  float grain = hash(floor(pixel*1.35)+uSeed);
  float etch = .5+.5*sin(pixel.x*2.6+pixel.y*3.8+hash(cell+uSeed)*6.2831853);
  float engraving = .52 + (grain-.5)*uGrain*3.0 + etch*.24;
  vec3 gold = mix(uColor1*.08,uColor2,light);
  float glint = pow(light,7.0)*smoothstep(.80,1.,grain)*.18;
  gold = mix(gold,mix(uColor3,uColor4,etch),glint);
  float luminance = dot(gold,vec3(.2126,.7152,.0722));
  gold = mix(vec3(luminance),gold,uSaturation/1.2)*engraving*uExposure;
  vec3 color = mix(uNavy,gold,dotMask);
  // Figma's 1100×1000 focus rectangle within the 1440×1024 reference frame.
  vec2 uv = vec2(pixel.x/size.x,1.0-pixel.y/size.y);
  vec2 focusLocal = (uv-vec2(.5,.5))*vec2(1440./1100.,1024./1000.);
  float radius = length(focusLocal)*2.0;
  float focusAlpha = radius < .55
    ? mix(.92,.75,clamp(radius/.55,0.,1.))
    : mix(.75,0.,clamp((radius-.55)/.45,0.,1.));
  color = mix(color,uFocus,focusAlpha);
  gl_FragColor = vec4(clamp(color,0.,1.),1.0);
}
`;
