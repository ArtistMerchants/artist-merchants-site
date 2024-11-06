import { Color, Vector2 } from 'three'

export const ASCIIShader = {
  uniforms: {
    uCharacters: { value: null },
    uCharactersCount: { value: 0 },
    uCellSize: { value: 8 },
    uColor: { value: new Color('#ffffff') },
    uInvert: { value: true },
    uTime: { value: 0 },
    uGradientMix: { value: 0 },
    uProgress: { value: 0.5 },
    uOpacity: { value: 0 },
    resolution: { value: new Vector2() },
  },
  vertexShader: `
      varying vec2 vUv;
      void mainUv() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
      uniform sampler2D map;
      uniform sampler2D uCharacters;
      uniform float uCharactersCount;
      uniform float uCellSize;
      uniform vec3 uColor;
      uniform bool uInvert;
      uniform vec2 resolution;

      const vec2 SIZE = vec2(16.0, 16.0);

      float greyscale(vec3 color) {
          return dot(color, vec3(0.2126, 0.7152, 0.0722));
      }

      vec3 rotatingGradient(float t, vec2 uv) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.0, 0.33, 0.67);
          
          float uvFactor = dot(uv - 0.5, uv - 0.5);
          float modifiedT = t + uvFactor * 2.0;
          
          vec3 gradient = a + b * cos(6.28318 * (c * modifiedT + d));
          vec3 radialGradient = vec3(1.0 - length(uv - 0.5) * 2.0);
          
          return mix(gradient, radialGradient, 0.5);
      }

      float sharpen(sampler2D tex, vec2 uv, vec2 texelSize) {
          float center = texture2D(tex, uv).r;
          float top = texture2D(tex, uv + vec2(0, texelSize.y)).r;
          float bottom = texture2D(tex, uv - vec2(0, texelSize.y)).r;
          float left = texture2D(tex, uv - vec2(texelSize.x, 0)).r;
          float right = texture2D(tex, uv + vec2(texelSize.x, 0)).r;
          
          // Adjust these coefficients to control sharpening intensity
          float centerWeight = 3.0;    // Decreased from 5.0 for less sharpening
          float edgeWeight = 0.5;      // Changed from 1.0 for softer edges
          
          float sharpened = centerWeight * center - edgeWeight * (top + bottom + left + right);
          return clamp(sharpened, 0.0, 1.0);
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
          vec2 cell = resolution / uCellSize;
          vec2 grid = 1.0 / cell;
          vec2 pixelizedUV = grid * (0.5 + floor(vUv / grid));
          vec4 pixelized = texture2D(map, pixelizedUV);
          float greyscaled = greyscale(pixelized.rgb);

          if (uInvert) {
              greyscaled = 1.0 - greyscaled;
          }

          float characterIndex = floor((uCharactersCount - 1.0) * greyscaled);
          vec2 characterPosition = vec2(mod(characterIndex, SIZE.x), floor(characterIndex / SIZE.y));
          vec2 offset = vec2(characterPosition.x, -characterPosition.y) / SIZE;
          vec2 charUV = mod(vUv * (cell / SIZE), 1.0 / SIZE) - vec2(0., 1.0 / SIZE) + offset;

          vec2 texelSize = 1.0 / (SIZE * uCharactersCount);
          float charIntensity = texture2D(uCharacters, charUV).r;
          
          charIntensity = smoothstep(0.4, 0.45, charIntensity);
          
          vec3 finalColor = uColor * charIntensity;
          float finalAlpha = charIntensity * pixelized.a;

          outputColor = vec4(finalColor, finalAlpha);
      }
  `,
}
