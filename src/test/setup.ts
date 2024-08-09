import { serviceWorker } from "@/msw/server";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Start worker before all tests
beforeAll(() => {
  serviceWorker.listen();
});

//  Close worker after all tests
afterAll(() => {
  serviceWorker.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  serviceWorker?.resetHandlers();
});
