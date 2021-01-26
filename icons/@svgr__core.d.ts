/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@svgr/core' {
  export default (
    svg: Buffer,
    config1: Record<string, unknown>,
    config2: Record<string, unknown>
  ) => Promise<string>();
}
