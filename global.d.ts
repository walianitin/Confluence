declare module 'ogl' {
  export class Renderer {
    constructor(options?: { alpha?: boolean; premultipliedAlpha?: boolean });
    gl: WebGLRenderingContext;
    setSize(width: number, height: number): void;
    render(params: { scene: Mesh }): void;
  }

  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        // Use `unknown` instead of `any` to avoid the `no-explicit-any` lint rule.
        // Callers can narrow the type as needed (number, array, texture, etc.).
        uniforms?: Record<string, { value: unknown }>;
      }
    );
  // Use `unknown` here as well to avoid `any` in the declaration.
  uniforms: Record<string, { value: unknown }>;
  }

  export class Mesh {
    constructor(
      gl: WebGLRenderingContext,
      // geometry shape varies between implementations; use `unknown` and
      // let consumers narrow the type where needed.
      options: { geometry: unknown; program: Program }
    );
  }

  export class Color {
    constructor(r: number, g: number, b: number);
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }
}
