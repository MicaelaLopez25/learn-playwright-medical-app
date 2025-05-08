import { test, expect } from '@playwright/test';

test('al intentar inciar sesion sin contraseña da error ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});