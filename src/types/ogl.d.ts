declare module 'ogl' {
  export class Renderer {
    gl: WebGL2RenderingContext & { canvas: HTMLCanvasElement };
    constructor(options?: { 
      dpr?: number; 
      alpha?: boolean; 
      antialias?: boolean;
      premultipliedAlpha?: boolean;
    });
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(
      gl: WebGL2RenderingContext | WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms?: Record<string, { value: any }>;
      }
    );
  }

  export class Mesh {
    constructor(gl: WebGL2RenderingContext | WebGLRenderingContext, options: { geometry: any; program: Program });
  }

  export class Triangle {
    constructor(gl: WebGL2RenderingContext | WebGLRenderingContext);
  }

  export class Texture {
    texture?: WebGLTexture;
    image?: Uint8Array;
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
      gl: WebGL2RenderingContext | WebGLRenderingContext,
      options?: {
        image?: Uint8Array;
        width?: number;
        height?: number;
        generateMipmaps?: boolean;
        flipY?: boolean;
      }
    );
  }
}
