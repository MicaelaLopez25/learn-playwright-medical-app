import { test, expect } from '@playwright/test';

test('si me quiero registrar sin poner nada en el formulario debe dar error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByText('El nombre debe tener al menos').click();
  await page.getByText('Ingrese un email válido').click();
  await page.getByText('Ingrese un número de teléfono').click();
  await page.getByText('La contraseña debe tener al').click();
  await expect(page.getByText('El nombre debe tener al menos 2 caracteres')).toBeVisible();
  await expect(page.getByText('Ingrese un email válido')).toBeVisible();
  await expect(page.getByText('Ingrese un número de teléfono')).toBeVisible();
  await expect(page.getByText('La contraseña debe tener al menos 6 caracteres')).toBeVisible();

});