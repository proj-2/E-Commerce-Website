const { format_date } = require('../utils/helpers');

test('format_date() should return date in string format', () => {
    const date = new Date('2022-06-11 16:48:12');

    expect(format_date(date)).toBe('6/11/2022 16:48:12');
});
