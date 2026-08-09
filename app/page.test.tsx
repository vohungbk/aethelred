import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the Phase 0 placeholder", () => {
    render(<Home />);
    expect(screen.getByText(/Aethelred/i)).toBeInTheDocument();
  });
});
