import { shaderMaterial } from '@react-three/drei'

export const WaveMaterial: any = shaderMaterial(
  {
    uTexture: null,
    uMouse: [-0.5, -0.5],
    uAspect: 2 / 2.5,
    uIntensity: 0,
    uOpacity: 0.0,
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
      float circleShape = circle(uv, mousePositions, 0.8);
      float intensity = uIntensity;
      // newPosition.z += circleShape * intensity;

      // Calculate spiral distortion
      vec2 direction = uv - mousePositions;
      float distanceFromCenter = length(direction);
      float angle = atan(direction.y, direction.x) + distanceFromCenter * intensity * 10.; // Adjust the multiplier for spiral tightness

      float s = sin(angle);
      float c = cos(angle);

      // Calculate spiral position
      vec3 spiralPosition = newPosition;
      spiralPosition.x = direction.x * c - direction.y * s;
      spiralPosition.y = direction.x * s + direction.y * c;

      // Translate back to original position
      spiralPosition.x += mousePositions.x;
      spiralPosition.y += mousePositions.y;

      // Mix the normal position with the spiral position based on intensity
      newPosition = mix(newPosition, spiralPosition, intensity);
    
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
    uniform float uOpacity;

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

      vec4 invertedColor = vec4(0.8 - texColor.r, 0.8 - texColor.g, 0.8 - texColor.b, 1.0);

      // Define brightness and contrast adjustment values
      float brightnessAdjustment = 0.05;
      float contrastAdjustment = 1.08;

      invertedColor.rgb += brightnessAdjustment;

      invertedColor.rgb = (invertedColor.rgb - 0.5) * contrastAdjustment + 0.5;

      invertedColor.rgb = clamp(invertedColor.rgb, 0.0, 1.0);
      
      vec4 darkenedColor = vec4(0.0, 0.0, 0.0, 1.0);

      vec4 finalColor = mix(darkenedColor, invertedColor, uOpacity);
      
      gl_FragColor = vec4(finalColor.rgb, uOpacity);
    
      #include <colorspace_fragment>
    }
  `
)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: any
    }
  }
}
