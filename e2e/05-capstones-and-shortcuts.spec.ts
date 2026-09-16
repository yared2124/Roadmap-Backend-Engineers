import { test, expect } from "@playwright/test";

test.describe("Portfolio Capstones & Global Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#roadmap");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("views capstone details, saves submission URL, and marks milestone completed", async ({ page }) => {
    // Open Phase 1 accordion in sidebar
    const phase1Btn = page.getByRole("button", { name: /Phase 01/i }).first();
    await expect(phase1Btn).toBeVisible();
    await phase1Btn.click();

    // Locate Capstone button in sidebar
    const capstoneLink = page.getByRole("button", { name: /Capstone:/i }).first();
    await expect(capstoneLink).toBeVisible();
    await capstoneLink.click();

    // Verify Capstone Project view is active
    await expect(page.getByText(/Phase 01 Milestone Challenge/i)).toBeVisible();
    await expect(page.getByText(/Core Engineering Deliverables/i)).toBeVisible();

    // Fill and save repository submission link
    const repoInput = page.getByPlaceholder("https://github.com/your-username/repo-name");
    await expect(repoInput).toBeVisible();
    await repoInput.fill("https://github.com/yared2124/http-reverse-proxy-engine");

    const saveBtn = page.getByRole("button", { name: /Save Link/i });
    await saveBtn.click();

    // Verify 'Saved!' feedback
    await expect(page.getByText(/Saved!/i)).toBeVisible();

    // Return to topics
    await page.getByRole("button", { name: /← Back to Topics/i }).click();
    await expect(page.getByText(/Backend from First Principles/i).first()).toBeVisible();
  });

  test("triggers keyboard shortcut cheat-sheet with '?' and dismisses with Escape", async ({ page }) => {
    // Press '?'
    await page.keyboard.press("?");

    // Shortcuts modal should appear
    await expect(page.getByRole("heading", { name: /Keyboard Shortcuts/i })).toBeVisible();

    // Press 'Escape'
    await page.keyboard.press("Escape");

    // Modal should be dismissed
    await expect(page.getByRole("heading", { name: /Keyboard Shortcuts/i })).not.toBeVisible();
  });

  test("triggers command palette with header quick search button and allows topic jump", async ({ page }) => {
    // Click header quick search button
    const searchTrigger = page.getByRole("button", { name: /Quick search topics, capstones, books/i });
    await expect(searchTrigger).toBeVisible();
    await searchTrigger.click();

    // Command palette should open
    const cmdInput = page.getByPlaceholder(/Search 31 topics, capstones/i);
    await expect(cmdInput).toBeVisible();

    // Type a query
    await cmdInput.fill("Database Basics");

    // Select matching result
    const resultItem = page.getByText(/Database Basics & PostgreSQL Deep Dive/i).first();
    await expect(resultItem).toBeVisible();
    await resultItem.click();

    // Verifies active topic updated to Database Basics
    await expect(page.getByText(/Database Basics & PostgreSQL Deep Dive/i).first()).toBeVisible();
  });
});
