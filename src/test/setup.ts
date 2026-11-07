import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { fakeFetch } from "./fakeApi";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(fakeFetch));
  // jsdom doesn't implement scrollTo
  vi.stubGlobal("scrollTo", vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
