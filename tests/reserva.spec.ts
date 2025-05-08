import { test, expect } from '@playwright/test';

test('Reserva de un turno', async ({ page }) => {
  // 1. Iniciar sesión
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', 'paciente1@correo.com');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');

  // 2. Ir a la página de reserva directamente
  await page.goto('http://localhost:3000/dashboard/reservar');

  // 3. Esperar a que cargue el componente
  await expect(page.locator('[data-testid="reserva-header"]')).toBeVisible({ timeout: 10000 });

  // 4. Esperar a que se carguen las especialidades
  const especialidadSelect = page.locator('select').nth(0);
  await expect(especialidadSelect).toHaveCount(1);
  await page.waitForFunction(() => {
    const el = document.querySelectorAll('select')[0];
    return el && el.options.length > 1 && el.options[1].value !== '';
  }, { timeout: 10000 });

  const especialidadValue = await especialidadSelect.locator('option:not(:first-child)').first().getAttribute('value');
  if (!especialidadValue) throw new Error('No se encontró una especialidad válida');
  await especialidadSelect.selectOption(especialidadValue);

  // 5. Esperar a que se carguen los médicos
  const medicoSelect = page.locator('select').nth(1);
  await page.waitForFunction(() => {
    const el = document.querySelectorAll('select')[1];
    return el && el.options.length > 1 && el.options[1].value !== '';
  }, { timeout: 10000 });

  const medicoValue = await medicoSelect.locator('option:not(:first-child)').first().getAttribute('value');
  if (!medicoValue) throw new Error('No se encontró un médico válido');
  await medicoSelect.selectOption(medicoValue);

  // 6. Elegir una fecha válida (mañana)
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 1);
  const fechaStr = fecha.toISOString().split('T')[0];
  await page.fill('input[type="date"]', fechaStr);

  // 7. Esperar a que se carguen los horarios
  const horarioSelect = page.locator('select').nth(2);
  await page.waitForFunction(() => {
    const el = document.querySelectorAll('select')[2];
    return el && el.options.length > 1 && el.options[1].value !== '';
  }, { timeout: 10000 });

  const horarioValue = await horarioSelect.locator('option:not(:first-child)').first().getAttribute('value');
  if (!horarioValue) throw new Error('No se encontró un horario válido');
  await horarioSelect.selectOption(horarioValue);

  // 8. Confirmar turno
  await page.click('button:has-text("Confirmar Turno")');

  // 9. Confirmar mensaje de éxito
  await expect(page.locator('text=✅ Turno reservado correctamente.')).toBeVisible({ timeout: 10000 });
});
