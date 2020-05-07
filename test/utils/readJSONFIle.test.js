const fs = require('fs');
const readJSONFile = require('../../src/utils/readJSONFile');

describe('readJSONFIle', () => {
  it('reads json data from passed file path and returns as json', () => {
    const jsonString = '{"mock":"json"}';
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => jsonString);

    const actual = readJSONFile('input.json');
    expect(fs.readFileSync).toHaveBeenCalledWith('input.json');
    expect(actual).toEqual(JSON.parse(jsonString));
  });
});
