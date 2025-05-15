import { test, expect } from '@playwright/test';

test.skip('al no poner nada en gmail o contraseña sale error en los dos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('EmailIngrese un email válido').click();
  await page.getByText('ContraseñaLa contraseña es').click();
});