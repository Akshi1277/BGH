"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uSpeed;
uniform float uDisplacementStrength;
uniform float uNoiseScale;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

varying vec2 vUv;

// Simplex 3D Noise 
// by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  // object-fit: cover calculation
  vec2 s = uResolution;
  vec2 i = uImageResolution;
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 coverUv = vUv * s / new + offset;

  // Center UVs for noise scaling to keep it uniform
  vec2 centeredUv = coverUv - 0.5;
  vec2 noiseUv = vec2(centeredUv.x * (s.x / s.y), centeredUv.y);

  // Time scaled by speed
  float t = uTime * uSpeed;

  // Calculate 3D noise for X and Y displacement
  // Using different offsets in the Z (time) coordinate to get independent noise
  float noiseX = snoise(vec3(noiseUv * uNoiseScale, t));
  float noiseY = snoise(vec3(noiseUv * uNoiseScale + 10.0, t + 5.0));

  // Combine noise into a displacement vector
  vec2 displacement = vec2(noiseX, noiseY) * uDisplacementStrength;

  // Parallax layers simulation based on brightness
  vec4 baseColor = texture2D(uTexture, coverUv);
  float brightness = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // Apply displacement, scaling by a base amount + brightness for depth effect
  vec2 finalUv = coverUv + displacement * (0.6 + brightness * 0.4);
  
  // Slightly zoom to hide edges pulled in by displacement
  vec2 zoomedUv = (finalUv - 0.5) * 0.98 + 0.5;
  
  vec4 color = texture2D(uTexture, zoomedUv);

  // Subtle breathing highlight
  float breathing = snoise(vec3(noiseUv * 0.5, t * 0.2)) * 0.5 + 0.5; // 0 to 1
  color.rgb += color.rgb * breathing * 0.12; // More noticeable brightening

  gl_FragColor = color;
}
`;

const Material = ({ texture }: { texture: THREE.Texture }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const imageResolution = useMemo(() => {
    // @ts-expect-error - texture.image exists but types might not strictly map it in this version
    return new THREE.Vector2(texture.image?.width || 1920, texture.image?.height || 1080);
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uSpeed: { value: prefersReducedMotion ? 0.02 : 0.08 }, 
      uDisplacementStrength: { value: 0.035 }, // More noticeable displacement
      uNoiseScale: { value: 1.5 },
      uResolution: { value: new THREE.Vector2(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080) },
      uImageResolution: { value: imageResolution },
    }),
    [texture, prefersReducedMotion, imageResolution]
  );

  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const targetSpeed = prefersReducedMotion ? 0.02 : 0.08;
      materialRef.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uSpeed.value,
        targetSpeed,
        0.05
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

const Scene = () => {
  const baseTexture = useTexture("/images/brahm_abstract_hero.png");
  
  const texture = useMemo(() => {
    const tex = baseTexture.clone();
    tex.wrapS = THREE.MirroredRepeatWrapping;
    tex.wrapT = THREE.MirroredRepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }, [baseTexture]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <Material texture={texture} />
    </mesh>
  );
};

export default function LivingBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-80 mix-blend-multiply">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
