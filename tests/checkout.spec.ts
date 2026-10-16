import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('결제', () => {
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.openCart();
    await cart.checkout();
  });

  test('정보를 모두 입력하면 주문을 완료할 수 있다', async ({ page }) => {
    await checkout.fillInfo('Gildong', 'Hong', '12345');
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  test('이름을 비우면 이름 필수 에러가 표시된다', async () => {
    await checkout.fillInfo('', 'Hong', '12345');
    await expect(checkout.errorMessage).toContainText('First Name is required');
  });

  test('성을 비우면 성 필수 에러가 표시된다', async () => {
    await checkout.fillInfo('Gildong', '', '12345');
    await expect(checkout.errorMessage).toContainText('Last Name is required');
  });

  test('우편번호를 비우면 우편번호 필수 에러가 표시된다', async () => {
    await checkout.fillInfo('Gildong', 'Hong', '');
    await expect(checkout.errorMessage).toContainText('Postal Code is required');
  });
});
