import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderApp } from "./renderApp";

// One test per acceptance criterion in PRD.md
describe("acceptance criteria", () => {
  it("shows a list of disney characters when the app opens", async () => {
    renderApp();

    expect(await screen.findByText("Mickey Mouse")).toBeInTheDocument();
    expect(screen.getByText("Achilles")).toBeInTheDocument();
  });

  it('shows "Pick a character" before anything is clicked', async () => {
    renderApp();

    expect(await screen.findByText("Pick a character")).toBeInTheDocument();
  });

  it("shows movie appearances, tv show appearances and allies after clicking a character", async () => {
    const { user } = renderApp();

    await user.click(await screen.findByText("Mickey Mouse"));

    expect(await screen.findByRole("heading", { level: 2, name: "Mickey Mouse" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fantasia" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Mickey Mouse Club" })).toBeInTheDocument();
    expect(screen.getByText("Goofy")).toBeInTheDocument();
  });

  it("shows the characters of a movie after clicking its name inside a character", async () => {
    const { user } = renderApp("/items/4703/");

    await user.click(await screen.findByRole("link", { name: "Mickey's House of Villains" }));

    expect(
      await screen.findByRole("heading", { level: 2, name: "Characters in Mickey's House of Villains" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mickey Mouse")).toBeInTheDocument();
    expect(screen.getByText("Baloo")).toBeInTheDocument();
    expect(screen.queryByText("Achilles")).not.toBeInTheDocument();
  });

  it("shows the characters of a tv show after clicking its name inside a character", async () => {
    const { user } = renderApp("/items/4703/");

    await user.click(await screen.findByRole("link", { name: "House of Mouse" }));

    expect(
      await screen.findByRole("heading", { level: 2, name: "Characters in House of Mouse" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mickey Mouse")).toBeInTheDocument();
    expect(screen.getByText("Baloo")).toBeInTheDocument();
    expect(screen.queryByText("Achilles")).not.toBeInTheDocument();
  });
});
