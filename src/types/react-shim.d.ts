/**
 * Editor/typecheck fallback for environments that fail to resolve React types
 * (e.g. Yarn PnP tooling not wired up).
 *
 * When TypeScript can resolve the real `react` / `@types/react`, this file is ignored.
 */

declare module "react" {
  export type ReactNode = unknown
  export type FC<P = Record<string, unknown>> = (props: P) => unknown

  export type FormEvent = {
    preventDefault(): void
  }
  export type ChangeEvent = { target: { value: string } }

  export function useState<S>(
    initialState: S | (() => S),
  ): [S, (next: S | ((prev: S) => S)) => void]
  export function useId(): string

  export function useMemo<T>(factory: () => T, deps: unknown[]): T
}

declare module "react/jsx-runtime" {
  export const Fragment: unknown
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown
  }
}

