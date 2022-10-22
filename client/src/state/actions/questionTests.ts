export const UPDATE_TESTS = "UPDATE_TESTS";

interface testInfo {
  tests: [string];
}

export const updateMatch = (testInfo: testInfo) => ({
  type: UPDATE_TESTS,
  testInfo,
});
