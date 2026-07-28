import { test, expect } from "@playwright/test";

test.describe("CareConnect Hearing - End to End User Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to base path before each test run
    await page.goto("/");
  });

  test("User can register, verify system status, login, and navigate through the app dashboard", async ({ page }) => {
    // -------------------------------------------------------------
    // 1. Sign Up Flow
    // -------------------------------------------------------------
    await page.goto("/signup");

    // Verify Sign Up renders core components
    await expect(page.getByRole("heading", { level: 1, name: /create account/i })).toBeVisible();
    await expect(page.getByLabel(/full name/i)).toBeVisible();

    // Fill in registration fields
    await page.getByLabel(/full name/i).fill("Jane Doe");
    await page.getByLabel(/email address/i).fill("patient@example.com");
    await page.getByLabel(/confirm password/i).fill("securepassword123");

    // Navigate to login from Sign Up
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);

    // -------------------------------------------------------------
    // 2. Authentication Flow (Login)
    // -------------------------------------------------------------
    await expect(page.getByRole("heading", { level: 1, name: /welcome back/i })).toBeVisible();

    // Fill credentials & verify 'Remember Me'
    await page.getByLabel(/email address/i).fill("patient@example.com");
    await page.getByLabel(/password/i).fill("securepassword123");

    const rememberMe = page.getByLabel(/remember me/i);
    await rememberMe.check();
    await expect(rememberMe).toBeChecked();

    // Submit form -> redirected to Home
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/home/);

    // -------------------------------------------------------------
    // 3. Home / Dashboard Navigation
    // -------------------------------------------------------------
    await expect(page.getByRole("heading", { level: 1, name: /welcome back!/i })).toBeVisible();

    // Target the specific card heading to avoid strict mode violations
    await page.getByRole("heading", { level: 2, name: "Active Alerts" }).click();
    await expect(page).toHaveURL(/\/alerts/);

    // -------------------------------------------------------------
    // 4. Alerts Page Interactions
    // -------------------------------------------------------------
    await expect(page.getByRole("heading", { level: 1, name: /alert history/i })).toBeVisible();
    await expect(page.getByText("Take blue pill")).toBeVisible();

    // Filter by Missed
    await page.getByRole("button", { name: /filter by missed/i }).click();
    await expect(page.getByText("Physical therapy session")).toBeVisible();
    await expect(page.getByText("Take blue pill")).not.toBeVisible();

    // Reset filter to All
    await page.getByRole("button", { name: /filter by all/i }).click();
    await expect(page.getByText("Take blue pill")).toBeVisible();

    // -------------------------------------------------------------
    // 5. Messages & Speech-To-Text Flow
    // -------------------------------------------------------------
    await page.goto("/messages");
    await expect(page.getByRole("heading", { level: 1, name: /messages/i })).toBeVisible();
    await expect(page.getByText("Idle")).toBeVisible();

    // Select conversation
    await page.getByRole("button", { name: /message from dr. martinez/i }).click();
    await expect(page.getByText("Select a conversation and press Start Listening.")).toBeVisible();

    // Toggle Microphone / Speech-to-text
    await page.getByRole("button", { name: /start listening/i }).click();
    
    // Disambiguate 'Listening...' status
    await expect(page.getByText("Listening...", { exact: true })).toBeVisible();
    await expect(page.getByText(/Listening\.\.\. transcribed text will appear here/i)).toBeVisible();

    await page.getByRole("button", { name: /stop listening/i }).click();
    await expect(page.getByText("Idle")).toBeVisible();

    // -------------------------------------------------------------
    // 6. Settings Context & Accessibility Preferences
    // -------------------------------------------------------------
    await page.goto("/settings");
    await expect(page.getByRole("heading", { level: 1, name: /settings/i })).toBeVisible();
    await expect(page.getByText("Current Setting: Enabled")).toBeVisible();

    // Toggle High Contrast mode
    const highContrastToggle = page.getByRole("checkbox", { name: /toggle high contrast/i });
    await highContrastToggle.click();
    await expect(page.getByText("Current Setting: Disabled")).toBeVisible();

    // -------------------------------------------------------------
    // 7. Emergency SOS Action
    // -------------------------------------------------------------
    await page.goto("/emergency");

    // Match exact heading rendered in the Emergency component
    await expect(page.getByRole("heading", { level: 1, name: /send emergency alert\?/i })).toBeVisible();

    // Locate the custom drag slider
    const sliderHandle = page.getByRole("slider", { name: /slide right to send emergency alert/i });
    await expect(sliderHandle).toBeVisible();

    // Perform mouse drag interaction to push slider past activation threshold (>95%)
    const sliderBox = await sliderHandle.boundingBox();
    if (sliderBox) {
      await page.mouse.move(sliderBox.x + sliderBox.width / 2, sliderBox.y + sliderBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(sliderBox.x + 600, sliderBox.y + sliderBox.height / 2);
      await page.mouse.up();
    }

    // Verify post-transmission success state
    await expect(page.getByRole("heading", { level: 1, name: /sos alert sent/i })).toBeVisible();
  });
});