import { test, expect } from '@playwright/test';

test('al entrar con usuario ya regristrado y tocar en exit vuelve a la pagina de login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Salir' }).click();
});