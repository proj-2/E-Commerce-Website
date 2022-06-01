const { cur_convert } = require('../utils/helpers');

test('cur_convert() returns currency converted price', () => {
    const price = 110;
    const cur = 'CAD';
    
    expect(cur_convert(cur)).toBe('5/26/2022');
})