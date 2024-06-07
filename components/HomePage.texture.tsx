import { shaderMaterial } from '@react-three/drei'

export const WaveMaterial: any = shaderMaterial(
  {
    uTexture: null,
    uMouse: [-0.5, -0.5],
    uAspect: 2 / 2.5,
    uIntensity: 0,
  },
  // vertex shader
  /*glsl*/ `
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float uAspect;
    uniform float uIntensity;

    float circle(vec2 uv, vec2 circlePosition, float radius) {
      vec2 adjustedUV = uv;
      adjustedUV.x *= uAspect;
    
      vec2 adjustedCirclePosition = circlePosition;
      adjustedCirclePosition.x *= uAspect;
    
      float dist = distance(adjustedCirclePosition, adjustedUV);
      return 1.0 - smoothstep(0.0, radius, dist);
    }

    void main() {
      vUv = uv;
      vec3 newPosition = position;
    
      // Elevation
      vec2 mousePositions = uMouse * 0.5 + 0.5;
      float circleShape = circle(uv, mousePositions, 0.58);
      float intensity = uIntensity;
      newPosition.z += circleShape * intensity;
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform float uAspect;
    uniform float uIntensity;

    float circle(vec2 uv, vec2 circlePosition, float radius) {
      vec2 adjustedUV = uv;
      adjustedUV.x *= uAspect;
    
      vec2 adjustedCirclePosition = circlePosition;
      adjustedCirclePosition.x *= uAspect;
    
      float dist = distance(adjustedCirclePosition, adjustedUV);
      return 1.0 - smoothstep(0.0, radius, dist);
    }

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      vec2 mousePositions = uMouse * 0.5 + 0.5;
      float circleInfluence = circle(vUv, mousePositions, 0.5);
      vec3 brightenedColor = texColor.rgb + texColor.rgb * circleInfluence * uIntensity * 3.;
      
      gl_FragColor = vec4(texColor.rgb, 1.);
    
      #include <colorspace_fragment>
    }
  `
)
