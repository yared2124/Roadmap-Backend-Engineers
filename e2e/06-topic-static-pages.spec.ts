import { test, expect } from "@playwright/test";

test.describe("Deep-linked Static Topic Pages (/topics/[id])", () => {
  test("loads dedicated gRPC topic page with metadata and structured data", async ({ page }) => {
    await page.goto("/topics/grpc-protocol-buffers");

    // Title should contain the topic title and number
    await expect(page).toHaveTitle(/gRPC & Protocol Buffers/i);

    // Breadcrumb navigation should be visible
    await expect(page.getByText(/Phase 2: Core API Architecture/i)).toBeVisible();
    await expect(page.getByText(/gRPC & Protocol Buffers/i).first()).toBeVisible();

    // Verify JSON-LD script is present and valid
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    const jsonLdContent = await jsonLdScript.textContent();
    expect(jsonLdContent).toContain("gRPC & Protocol Buffers");
    expect(jsonLdContent).toContain("TechArticle");

    // Verify multi-language code snippets render
    const tsBtn = page.getByRole("button", { name: "TypeScript" });
    await expect(tsBtn).toBeVisible();
    await tsBtn.click();
    await expect(page.locator("pre").filter({ hasText: /proto|grpc/i }).first()).toBeVisible();

    // Verify link back to full roadmap works
    const roadmapLink = page.getByRole("link", { name: /Full Roadmap/i });
    await expect(roadmapLink).toBeVisible();
  });

  test("loads Kafka streaming topic page and supports next/prev navigation", async ({ page }) => {
    await page.goto("/topics/distributed-message-streaming-kafka");

    await expect(page).toHaveTitle(/Apache Kafka/i);

    // Verify Next module navigation
    const nextBtn = page.getByRole("button", { name: /Next Module/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await expect(page).toHaveURL(/\/topics\/transactional-emails-event-triggers/);
  });

  test("handles 404 for invalid topic id", async ({ page }) => {
    const response = await page.goto("/topics/non-existent-topic-slug");
    expect(response?.status()).toBe(404);
  });
});
