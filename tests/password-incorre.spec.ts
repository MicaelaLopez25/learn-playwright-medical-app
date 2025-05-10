/* cuando ya hay en la base de datos una usuario y su contraseña al iniciar con esta y poner mal la contra*/
/* tiene que dar error*/

import { test, expect } from '@playwright/test';

test('cuando ya hay en la base de datos una usuario y su contraseña al iniciar con esta y poner mal la contra, tiene que dar error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('2345689');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('Email o contraseña incorrectos').click();
});