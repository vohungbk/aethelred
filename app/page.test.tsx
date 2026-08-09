import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Curating Elegance/i }),
    ).toBeInTheDocument();
  });

  it("renders the featured acquisitions grid", () => {
    render(<Home />);
    expect(screen.getByText("Featured Acquisitions")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "The Elara Chaise" })).toBeInTheDocument();
  });

  it("renders the journal teaser", () => {
    render(<Home />);
    expect(screen.getByText("From the Journal")).toBeInTheDocument();
  });
});
