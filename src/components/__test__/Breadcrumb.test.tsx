import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import "@testing-library/jest-dom";

// src/components/Breadcrumb.test.tsx

describe("Breadcrumb", () => {
  function renderWithRouter(initialEntries: string[]) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Breadcrumb />
      </MemoryRouter>
    );
  }

  it("renders only Home on root path", () => {
    renderWithRouter(["/"]);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Dashboard" })
    ).not.toBeInTheDocument();
  });

  it("renders Home and Dashboard on /dashboard", () => {
    renderWithRouter(["/dashboard"]);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    // Home is a link to "/"
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    // Dashboard is current, not a link
    expect(
      screen.queryByRole("link", { name: "Dashboard" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Dashboard").closest("span")).toHaveClass(
      "breadcrumb__current"
    );
  });

  it("renders Home, Dashboard (link), Settings (current) on /dashboard/settings", () => {
    renderWithRouter(["/dashboard/settings"]);
    // Home link
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    // Dashboard link
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    // Settings current
    expect(screen.getByText("Settings").closest("span")).toHaveClass(
      "breadcrumb__current"
    );
    // No link for current
    expect(
      screen.queryByRole("link", { name: "Settings" })
    ).not.toBeInTheDocument();
  });

  it("renders fallback label for unknown segment", () => {
    renderWithRouter(["/foo/bar"]);
    expect(screen.getByRole("link", { name: "foo" })).toHaveAttribute(
      "href",
      "/foo"
    );
    expect(screen.getByText("bar").closest("span")).toHaveClass(
      "breadcrumb__current"
    );
  });

  it("renders correct 'to' prop for each breadcrumb link", () => {
    renderWithRouter(["/users/reports/maintenance"]);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute(
      "href",
      "/users"
    );
    expect(screen.getByRole("link", { name: "Reports" })).toHaveAttribute(
      "href",
      "/users/reports"
    );
    expect(screen.getByText("Maintenance").closest("span")).toHaveClass(
      "breadcrumb__current"
    );
  });
});
