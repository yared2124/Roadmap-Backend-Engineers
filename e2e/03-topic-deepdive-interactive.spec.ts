import { test, expect } from "@playwright/test";

test.describe("Topic Deep Dive & Interactive Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#roadmap");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("switches between Go, TypeScript, and Python code implementations", async ({ page }) => {
    // Locate the Multi-Language Code tabs in TopicViewer
    const goBtn = page.getByRole("button", { name: "Go" });
    const tsBtn = page.getByRole("button", { name: "TypeScript" });
    const pyBtn = page.getByRole("button", { name: "Python" });

    await expect(goBtn).toBeVisible();
    await expect(tsBtn).toBeVisible();
    await expect(pyBtn).toBeVisible();

    // Click TypeScript button
    await tsBtn.click();
    // Verify TypeScript code snippet rendered
    await expect(page.locator("pre").filter({ hasText: /interface|class|export/i }).first()).toBeVisible();

    // Verify localStorage preference saved
    let storedLang = await page.evaluate(() => localStorage.getItem("backend_roadmap_preferred_lang"));
    expect(storedLang).toBe("typescript");

    // Switch to Python
    await pyBtn.click();
    await expect(page.locator("pre").filter({ hasText: /def |import |class /i }).first()).toBeVisible();
    storedLang = await page.evaluate(() => localStorage.getItem("backend_roadmap_preferred_lang"));
    expect(storedLang).toBe("python");
  });

  test("reveals architectural hints and model solution in the hands-on lab challenge", async ({ page }) => {
    // Locate Hints button
    const hintsBtn = page.getByRole("button", { name: /View Hints/i });
    await expect(hintsBtn).toBeVisible();

    // Click to reveal hints
    await hintsBtn.click();
    await expect(page.getByText(/Architectural Hints/i)).toBeVisible();

    // Locate Reveal Model Solution button
    const solutionBtn = page.getByRole("button", { name: /Reveal Model Solution/i });
    await expect(solutionBtn).toBeVisible();

    // Click to reveal solution
    await solutionBtn.click();
    await expect(page.getByText(/Senior Implementation Solution/i)).toBeVisible();
  });

  test("toggles topic completion status and updates progress", async ({ page }) => {
    // Topic completion toggle button in TopicViewer
    const completeBtn = page.getByRole("button", { name: /Mark Complete|Mark as Complete/i }).first();
    await expect(completeBtn).toBeVisible();

    // Toggle complete
    await completeBtn.click();

    // Verify button text updates to completed state
    await expect(page.getByRole("button", { name: /Completed|Mark Incomplete/i }).first()).toBeVisible();

    // Verify progress updated in localStorage (backend_roadmap_progress_v1)
    const storedProgress = await page.evaluate(() => localStorage.getItem("backend_roadmap_progress_v1"));
    expect(storedProgress).not.toBeNull();
    const parsed = JSON.parse(storedProgress || "{}");
    expect(parsed.completedTopics).toContain("backend-first-principles");
  });
});
