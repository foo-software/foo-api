export const setMockResponse = (mocked: any, mockResponse: any) =>
  mocked.mockImplementation(
    (): Promise<any> =>
      Promise.resolve({
        json() {
          return Promise.resolve(mockResponse);
        },
      })
  );
