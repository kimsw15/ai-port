import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('상품 목록', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('상품이 6개 표시된다', async () => {
    await expect(inventory.items).toHaveCount(6);
  });

  test('이름 A-Z 정렬이 동작한다', async () => {
    await inventory.sortBy('az');
    const names = await inventory.getNames();
    expect(names).toEqual([...names].sort());
  });

  test('이름 Z-A 정렬이 동작한다', async () => {
    await inventory.sortBy('za');
    const names = await inventory.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('가격 낮은 순 정렬이 동작한다', async () => {
    await inventory.sortBy('lohi');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('가격 높은 순 정렬이 동작한다', async () => {
    await inventory.sortBy('hilo');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('장바구니에서 상품을 삭제할 수 있다', async ({ page }) => {
    const cart = new CartPage(page);

    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await inventory.openCart();
    await expect(cart.items).toHaveCount(2);

    await cart.removeItem('Sauce Labs Backpack');
    await expect(cart.items).toHaveCount(1);
  });
});
