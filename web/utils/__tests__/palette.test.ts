import { paletteValueToCssVar } from '../palette';

describe('paletteValueToCssVar', () => {
  it('should handle palette alias conversion', () => {
    expect(paletteValueToCssVar('blue60')).toEqual('rgb(var(--blue60))');
  });

  it('should handle palette alias with opacity conversion', () => {
    expect(paletteValueToCssVar(['blue60', 0.2])).toEqual('rgba(var(--blue60),0.2)');
  });
});
