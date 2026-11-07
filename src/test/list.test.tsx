import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderApp } from "./renderApp";

function requestedUrls(): string[] {
  return vi.mocked(fetch).mock.calls.map(([url]) => String(url));
}

describe("search", () => {
  it("shows only the characters with the typed text in their name", async () => {
    const { user } = renderApp();
    await screen.findByText("Achilles");

    await user.type(screen.getByRole("searchbox"), "Mickey");

    await waitFor(() => expect(screen.queryByText("Achilles")).not.toBeInTheDocument());
    expect(await screen.findByText("Mickey Mouse")).toBeInTheDocument();
  });

  it("waits for typing to stop before calling the API", async () => {
    const { user } = renderApp();
    await screen.findByText("Achilles");

    await user.type(screen.getByRole("searchbox"), "Mickey");
    await screen.findByText("Mickey Mouse");

    const searches = requestedUrls().filter((url) => url.includes("name="));
    expect(searches).toEqual(["https://api.disneyapi.dev/character?page=1&name=Mickey"]);
  });

  it("says so when nothing matches", async () => {
    renderApp("/?name=zzzqqq");

    expect(await screen.findByText("No characters found")).toBeInTheDocument();
  });
});

describe("paging", () => {
  it("loads the clicked page", async () => {
    const { user } = renderApp();
    await screen.findByText("Achilles");

    await user.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => expect(screen.queryByText("Achilles")).not.toBeInTheDocument());
    expect(await screen.findByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  it("keeps the search text when moving to another page", async () => {
    const { user } = renderApp("/?name=a");

    await user.click(await screen.findByRole("button", { name: "2" }));

    await waitFor(() =>
      expect(requestedUrls()).toContain("https://api.disneyapi.dev/character?page=2&name=a"),
    );
    expect(screen.getByRole("searchbox")).toHaveValue("a");
  });
});

describe("errors", () => {
  it("shows an error when the list can't be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));
    renderApp();

    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("shows an error for a character that doesn't exist", async () => {
    renderApp("/items/999999/");

    expect(await screen.findByText("Sorry, we couldn't load this character.")).toBeInTheDocument();
  });
});
