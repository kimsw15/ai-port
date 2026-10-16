import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('로그인', () => {
  test('정상 계정으로 로그인하면 상품 목록 페이지로 이동한다', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.title).toHaveText('Products');
  });

  test('잘못된 비밀번호면 에러 메시지가 표시된다', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'wrong_password');

    await expect(login.errorMessage).toContainText('do not match');
  });

  test('잠긴 계정은 로그인할 수 없다', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await expect(login.errorMessage).toContainText('locked out');
  });

  test('빈 값으로 로그인하면 사용자명 필수 에러가 표시된다', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.loginButton.click();

    await expect(login.errorMessage).toContainText('Username is required');
  });
});
