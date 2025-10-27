declare module "ogl" {
  export type UniformValue =
    | number
    | boolean
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | Float32Array
    | Int32Array
    | Uint32Array
    | Texture
    | null
    | undefined;

  export type UniformMap = Record<string, { value: UniformValue }>;

  export type OglContext = WebGL2RenderingContext | WebGLRenderingContext;

  export class Renderer {
    gl: (WebGL2RenderingContext & { canvas: HTMLCanvasElement }) | (WebGLRenderingContext & { canvas: HTMLCanvasElement });
    dpr: number;
    constructor(options?: {
      dpr?: number;
      alpha?: boolean;
      antialias?: boolean;
      premultipliedAlpha?: boolean;
      depth?: boolean;
      powerPreference?: WebGLPowerPreference;
    });
    setSize(width: number, height: number): void;
    render(options: { scene: Mesh }): void;
  }

  export class Program {
    uniforms: UniformMap;
    constructor(
      gl: OglContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms?: UniformMap;
      }
    );
  }

  export type Geometry = Triangle | { attributes?: Record<string, unknown> };

  export class Mesh {
    constructor(gl: OglContext, options: { geometry: Geometry; program: Program });
    program: Program;
  }

  export class Triangle {
    constructor(gl: OglContext);
  }

  export class Texture {
    texture?: WebGLTexture;
    image?: Uint8Array | TexImageSource;
    width?: number;
    height?: number;
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    flipY?: boolean;
    generateMipmaps?: boolean;
    format?: number;
    type?: number;
    needsUpdate?: boolean;
    constructor(
      gl: OglContext,
      options?: {
        image?: Uint8Array | TexImageSource;
        width?: number;
        height?: number;
        generateMipmaps?: boolean;
        flipY?: boolean;
      }
    );
  }
}
