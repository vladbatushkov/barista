import { hello } from "./index";

describe("test hello function", () => {
  it("should say hello", () => {
    expect(hello('Barista')).toBe('Hello, Barista!');
  });
});