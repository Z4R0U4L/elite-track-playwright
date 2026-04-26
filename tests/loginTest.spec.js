import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test('Test login with invalid credentials', async ({ page }) => {
  const email = faker.internet.email(); // runs once
  const password = faker.internet.password();
  await page.goto('http://localhost:3000/login');
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
  await page.getByPlaceholder('Email').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByText('Bienvenue, Noureddine Boss!')).toBeHidden();

});

test('Test login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
  await page.getByPlaceholder('Email').fill('zakiilyass12@gmail.com');
  await page.locator('input[type="password"]').fill('zaroual123');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByText('Bienvenue, Noureddine Boss!')).toBeVisible();
});

