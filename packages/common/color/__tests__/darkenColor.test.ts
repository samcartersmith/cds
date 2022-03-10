import { darkenColor } from '../darkenColor';

describe('darkenColor', () => {
  it('correctly darkens an rgba string', () => {
    expect(darkenColor('rgba(255,255,255,1)')).toEqual('#b3b3b3');
  });
});
