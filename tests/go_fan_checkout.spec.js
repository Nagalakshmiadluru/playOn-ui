import { test, expect } from '@playwright/test';
//From root folder to run as:  npx playwright test go_fan_checkout.spec.js --project=chromium --headed
test('goFan-checkout-validation-Greiff High School', async ({ page }) => {
  await page.goto('https://gofan.co/');
  await page.getByTestId('search-input').fill('Greiff High School');
  await page.getByTestId('search-input').press('Enter');
  await page.getByText('Greiff High School').click();
  //Select 3rd Ticket - Assuming Type of games on third row of the table
  await page.getByRole('link', { name: 'Buy tickets' }).nth(2).click();
  await page.getByTestId('product-quantity').first().click();
  await page.getByTestId('product-quantity').first().press('ControlOrMeta+a');
  await page.getByTestId('product-quantity').first().fill('1');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('lakshmi.adluru@gmail.com');
  await page.getByTestId('primary-guest-form-continue-button').click();
  await page.getByTestId('pay-credit-card-btn').click();
  //Validate Checkout process in payment section. Note that, not continuing with credit card/debit entries without test data.
  //Also this is live site that takes payments. 
  await expect(page.getByTestId('payment-section')).toContainText('Review and buy');
  await page.locator('iframe[name="__privateStripeFrame8329"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
  await page.locator('iframe[name="__privateStripeFrame8329"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('1234 1234 1234 1234');
  //This becomes negative scenario , but as we don't have valid card details for successful scenario, just added one validation
  await expect(page.locator('iframe[name="__privateStripeFrame8329"]').contentFrame()).toHaveText('Your card number is invalid.');
  });