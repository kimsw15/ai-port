import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('장바구니', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('상품을 담으면 장바구니 배지 숫자가 올라간다', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.addToCart('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');
  });
});
