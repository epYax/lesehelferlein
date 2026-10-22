import { test, expect } from "@playwright/test";
test("bespoke art loads in the clearing, atlas, books and album", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      (response.url().includes("/art/") ||
        response.url().includes("/_next/image"))
    )
      failed.push(response.url());
  });
  await page.goto("/");
  const background = page.locator(".painted-world img");
  await expect
    .poll(() =>
      background.evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(page.locator(".collect-spark .brand-icon")).toHaveCount(3);
  await page.goto("/geschichten");
  await expect(page.locator(".location-island .story-art")).toHaveCount(6);
  for (const art of await page.locator(".location-island .story-art").all()) {
    await art.scrollIntoViewIfNeeded();
    await expect
      .poll(() => art.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  }
  await page.getByRole("button", { name: "Bücher", exact: true }).click();
  await expect(page.locator(".cover .story-art")).toHaveCount(6);
  await page.goto("/album");
  await expect(page.locator(".stamp-illustration .story-art")).toHaveCount(6);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  expect(failed).toEqual([]);
});
