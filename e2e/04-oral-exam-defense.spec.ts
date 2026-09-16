import { test, expect } from "@playwright/test";

test.describe("Oral Defense & Mock Interview Evaluation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#roadmap");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("runs through a complete 3-question oral mock interview with score calculation", async ({ page }) => {
    // 1. Locate and click "Start Mock Interview" button
    const startBtn = page.getByRole("button", { name: /Start Mock Interview/i });
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // 2. Verify modal opens with question 1
    await expect(page.getByText(/Live Oral Interview Question/i)).toBeVisible();
    await expect(page.getByText(/QUESTION 1 OF 3/i)).toBeVisible();

    // 3. Question 1: Reveal answer and grade
    const revealBtn1 = page.getByRole("button", { name: /Reveal Staff Rubric/i });
    await expect(revealBtn1).toBeVisible();
    await revealBtn1.click();

    await expect(page.getByText(/Staff Engineer Answer & Rubric Breakdown/i)).toBeVisible();
    // Grade question 1 as Mastered
    await page.getByRole("button", { name: /Nailed It!/i }).click();

    // 4. Question 2: Verify transition to Question 2 of 3
    await expect(page.getByText(/QUESTION 2 OF 3/i)).toBeVisible();
    const revealBtn2 = page.getByRole("button", { name: /Reveal Staff Rubric/i });
    await revealBtn2.click();
    // Grade question 2 as Partial
    await page.getByRole("button", { name: /Partially/i }).click();

    // 5. Question 3: Verify transition to Question 3 of 3
    await expect(page.getByText(/QUESTION 3 OF 3/i)).toBeVisible();
    const revealBtn3 = page.getByRole("button", { name: /Reveal Staff Rubric/i });
    await revealBtn3.click();
    // Grade question 3 as Mastered
    await page.getByRole("button", { name: /Nailed It!/i }).click();

    // 6. Verify Results Summary Screen
    await expect(page.getByText(/Mock Interview Completed!/i)).toBeVisible();

    // 7. Verify score persistence in localStorage
    const savedScore = await page.evaluate(() => localStorage.getItem("interview_score_backend-first-principles"));
    expect(savedScore).not.toBeNull();
    const numericScore = parseInt(savedScore || "0", 10);
    expect(numericScore).toBeGreaterThan(0);

    // 8. Close modal
    const doneBtn = page.getByRole("button", { name: /Return to Study Guide|Done/i }).first();
    if (await doneBtn.isVisible()) {
      await doneBtn.click();
    }
  });
});
