import { setItem, getItem, removeItem } from './storage';

describe('storage', () => {
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    mockRemoveItem.mockClear();
  });

  it('sets item', () => {
    setItem('accessToken', '1234');

    expect(mockSetItem).toHaveBeenCalledWith('accessToken', '1234');
  });

  it('gets item', () => {
    getItem('accessToken');

    expect(mockGetItem).toHaveBeenCalledWith('accessToken');
  });

  it('removes item', () => {
    removeItem('accessToken');

    expect(mockRemoveItem).toHaveBeenCalledWith('accessToken');
  });
});
