import { test, expect } from "@playwright/test";

test.describe("Roadmap Workspace & Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly into roadmap view
    await page.goto("/#roadmap");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("renders syllabus sidebar with collapsible phases and default active topic", async ({ page }) => {
    // Sidebar should be present
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    // Verify default active topic (Module 01)
    await expect(page.getByText(/Backend from First Principles/i).first()).toBeVisible();

    // Verify Phase 1 accordion can be clicked
    const phase1Btn = page.getByRole("button", { name: /Phase 01/i }).first();
    await expect(phase1Btn).toBeVisible();
    await phase1Btn.click();

    // Verify topic items inside Phase 1 become visible
    await expect(page.getByText(/High-Level Understanding/i).first()).toBeVisible();
  });

  test("filters syllabus topics using search in command palette", async ({ page }) => {
    // Click quick search trigger button in header
    const searchTrigger = page.getByRole("button", { name: /Quick search topics, capstones, books/i });
    await expect(searchTrigger).toBeVisible();
    await searchTrigger.click();

    // In command palette, input search term
    const searchInput = page.getByPlaceholder(/Search 31 topics, capstones/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Database Basics");

    // Results matching Database Basics should appear
    const matchItem = page.getByText(/Database Basics & PostgreSQL Deep Dive/i).first();
    await expect(matchItem).toBeVisible();

    // Click matching result to jump directly to that module
    await matchItem.click();

    // Verify topic view updated to Database Basics module
    await expect(page.getByText(/Database Basics & PostgreSQL Deep Dive/i).first()).toBeVisible();
  });

  test("navigates sequential topics via Next and Previous buttons", async ({ page }) => {
    // Locate Next Module button at the bottom of the content canvas
    const nextBtn = page.getByRole("button", { name: /Next/i }).last();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Active topic should now be Module 02
    await expect(page.getByText(/High-Level Understanding: What is a Backend/i).first()).toBeVisible();

    // Locate Previous Module button
    const prevBtn = page.getByRole("button", { name: /Previous/i }).first();
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    // Should return to Module 01
    await expect(page.getByText(/Backend from First Principles/i).first()).toBeVisible();
  });

  test("navigates back to the portfolio landing page", async ({ page }) => {
    const homeBtn = page.getByTitle(/Return to Home/i).first();
    await expect(homeBtn).toBeVisible();
    await homeBtn.click();

    // Should return to portfolio home view
    await expect(page.getByRole("button", { name: /Start Learning Now/i })).toBeVisible();
  });
});
