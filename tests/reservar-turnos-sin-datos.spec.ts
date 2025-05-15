
import { test, expect } from '@playwright/test';

test.skip('al querer reservar un turno sin completar todos los datos no debe dar error', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lopez@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jkhan13#');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar nuevo turno' }).click();
  await page.getByRole('combobox').selectOption('3');
  await page.locator('div').filter({ hasText: /^MédicoSeleccionarAna Rodríguez$/ }).getByRole('combobox').selectOption('3');
  await page.getByText('Reservar TurnoEspecialidadSeleccionarCardiologíaDermatologíaPediatrí').click();
  await page.getByRole('button', { name: 'Confirmar Turno' }).click();
  await page.getByText('Por favor completa todos los').click();
  await page.goto('http://localhost:3000/dashboard/reservar');
});