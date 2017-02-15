/* tslint:disbale no-unused-variable */

const {calcLineEndSkip} = require('../article');

describe('#isLineEnd', () => {
  it('should return 2 if current char is blank and next is blank', () => {
    expect(calcLineEndSkip('  ')).toEqual(2);
  });
  it('should return 4 if current char is / and next three is \'n/n\'', () => {
    expect(calcLineEndSkip('/n/n')).toEqual(4);
  });
});


