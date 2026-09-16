import { test, expect } from "@playwright/test";

test.describe("Landing Page & Global Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start with clean state
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("renders landing page with brand header and hero elements", async ({ page }) => {
    await expect(page).toHaveTitle(/Backend Engineering Master Roadmap/i);
    const brand = page.getByRole("button", { name: "Backend Engineer Hub" });
    await expect(brand).toBeVisible();

    // Verify main CTA buttons
    const startLearningBtn = page.getByRole("button", { name: /Start Learning Now/i });
    await expect(startLearningBtn).toBeVisible();
    const roadmapNavBtn = page.getByRole("button", { name: "Roadmap" });
    await expect(roadmapNavBtn).toBeVisible();
  });

  test("switches between portfolio tabs seamlessly", async ({ page }) => {
    // 1. Click 'Docs' tab
    const docsTab = page.getByRole("button", { name: /Docs/i }).first();
    await docsTab.click();
    await expect(page.getByText(/Student Documentation & Study Methodology/i)).toBeVisible();

    // 2. Click 'Curriculum' tab
    const curriculumTab = page.getByRole("button", { name: /Curriculum/i });
    await curriculumTab.click();
    await expect(page.getByText(/The 7 Architectural Mastery Phases/i)).toBeVisible();

    // 3. Click 'Oral Exams' tab
    const oralExamsTab = page.getByRole("button", { name: /Oral Exams/i });
    await oralExamsTab.click();
    await expect(page.getByText(/Senior Technical Whiteboard & Oral Exam Simulator/i)).toBeVisible();

    // 4. Click 'Capstones' tab
    const capstonesTab = page.getByRole("button", { name: /Capstones/i });
    await capstonesTab.click();
    await expect(page.getByText(/7 Industry-Grade Engineering Projects/i)).toBeVisible();

    // 5. Click brand header to return to Home
    await page.getByRole("button", { name: "Backend Engineer Hub" }).click();
    await expect(page.getByRole("button", { name: /Start Learning Now/i })).toBeVisible();
  });

  test("toggles theme between dark and light modes with persistence", async ({ page }) => {
    const htmlEl = page.locator("html");

    // Click theme toggle button in header (aria-label="Toggle Theme")
    const themeBtn = page.getByRole("button", { name: "Toggle Theme" }).first();
    await expect(themeBtn).toBeVisible();

    const initiallyDark = await htmlEl.evaluate((el) => el.classList.contains("dark"));
    await themeBtn.click();

    // Verify dark class toggled
    if (initiallyDark) {
      await expect(htmlEl).not.toHaveClass(/dark/);
      const storedTheme = await page.evaluate(() => localStorage.getItem("backend_roadmap_theme"));
      expect(storedTheme).toBe("light");
    } else {
      await expect(htmlEl).toHaveClass(/dark/);
      const storedTheme = await page.evaluate(() => localStorage.getItem("backend_roadmap_theme"));
      expect(storedTheme).toBe("dark");
    }

    // Toggle back to verify two-way behavior
    await themeBtn.click();
    const finalDark = await htmlEl.evaluate((el) => el.classList.contains("dark"));
    expect(finalDark).toBe(initiallyDark);
  });

  test("transitions into the Roadmap Workspace on CTA click", async ({ page }) => {
    const startLearningBtn = page.getByRole("button", { name: /Start Learning Now/i });
    await startLearningBtn.click();

    // In roadmap workspace, the main syllabus sidebar and content viewer appear
    await expect(page.locator("#main-content-scroll")).toBeVisible();
    await expect(page.getByText(/Backend from First Principles/i).first()).toBeVisible();
  });
});
