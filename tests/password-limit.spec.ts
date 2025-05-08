import { test, expect } from '@playwright/test';

test('al intentar crear un usuario con una contraseña menor a 6 caracters da error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre completo' }).fill('bartolomeo');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('barto@gmail.com');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('12345678');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('1234');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('1234');
  await page.getByRole('button', { name: 'Registrarse' }).click();
});