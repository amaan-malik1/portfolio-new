import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 130
const ROWS = 74
const SPACING = 0.34

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  attribute float aRand;
  varying float vElev;
  varying float vDepth;
  varying float vMouseD;

  void main() {
    vec3 p = position;
    float t = uTime * 0.55;

    float wave =
      sin(p.x * 0.55 + t) * 0.32 +
      sin(p.z * 0.42 - t * 0.85) * 0.28 +
      sin((p.x + p.z) * 0.24 + t * 0.5) * 0.24;

    float d = distance(p.xz, uMouse);
    float ripple = exp(-d * d * 0.055) * sin(d * 2.1 - uTime * 3.2) * 0.85 * uMouseStrength;
    float lift = exp(-d * d * 0.075) * 0.65 * uMouseStrength;

    p.y += wave + ripple + lift;
    vElev = wave + ripple + lift;
    vMouseD = d;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vDepth = -mv.z;

    float size = (1.5 + vElev * 1.3) * (0.7 + aRand * 0.6);
    gl_PointSize = size * (150.0 / -mv.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorRose;
  uniform vec3 uColorIce;
  varying float vElev;
  varying float vDepth;
  varying float vMouseD;

  void main() {
    float m = smoothstep(0.5, 0.08, length(gl_PointCoord - 0.5));
    float h = smoothstep(-0.55, 1.25, vElev);
    vec3 col = mix(uColorBase, uColorRose, h);
    col = mix(col, uColorIce, smoothstep(5.0, 0.0, vMouseD) * 0.4);
    float fade = smoothstep(30.0, 9.0, vDepth);
    float a = m * fade * (0.22 + h * 0.78);
    gl_FragColor = vec4(col, a);
  }
`

function WaveField({ reduce }: { reduce: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const mouseTarget = useRef(new THREE.Vector2(0, 4))
  const strengthTarget = useRef(0)
  const { camera, pointer } = useThree()

  const { positions, rands } = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3)
    const rands = new Float32Array(COLS * ROWS)
    let i = 0
    for (let x = 0; x < COLS; x++) {
      for (let z = 0; z < ROWS; z++) {
        positions[i * 3] = (x - COLS / 2) * SPACING
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (z - ROWS / 2) * SPACING
        rands[i] = Math.random()
        i++
      }
    }
    return { positions, rands }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 4) },
      uMouseStrength: { value: 0 },
      uColorBase: { value: new THREE.Color('#4a4148') },
      uColorRose: { value: new THREE.Color('#f24d9d') },
      uColorIce: { value: new THREE.Color('#aee3f2') },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    const u = mat.current.uniforms
    if (!reduce) {
      u.uTime.value += delta

      // project the pointer onto the field plane (y = 0)
      const ray = new THREE.Raycaster()
      ray.setFromCamera(pointer, camera)
      const hit = new THREE.Vector3()
      ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit)
      if (hit) {
        mouseTarget.current.set(hit.x, hit.z)
        strengthTarget.current = 1
      }
      u.uMouse.value.lerp(mouseTarget.current, 0.08)
      u.uMouseStrength.value += (strengthTarget.current - u.uMouseStrength.value) * 0.05

      // gentle camera parallax
      camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.03
      camera.position.y += (3.1 - pointer.y * 0.5 - camera.position.y) * 0.03
      camera.lookAt(0, 0.3, 0)
    }
    state
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroScene({ reduce = false }: { reduce?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.1, 8.6], fov: 46 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduce ? 'demand' : 'always'}
      className="!absolute inset-0"
      aria-hidden
    >
      <WaveField reduce={reduce} />
    </Canvas>
  )
}
