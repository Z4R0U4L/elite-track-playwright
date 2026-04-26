import { test, expect } from '@playwright/test';
import { faker, tr } from '@faker-js/faker';

test('Test sign up merchant ', async ({ page }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await expect(page.getByTestId('role-merchant')).toBeVisible();
    await expect(page.getByTestId('role-driver')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Test User'); 
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('1234567890');   
    await page.getByPlaceholder('votre@email.com').fill(email);        
    await page.getByPlaceholder('Min. 6 caractères').fill(password);  
    await page.getByPlaceholder('Répéter le mot de passe').fill(password)
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Test sign up driver ', async ({ page }) => {
    const email = faker.internet.email();   
    const password = faker.internet.password();
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await expect(page.getByTestId('role-driver')).toBeVisible();
    await page.getByTestId('role-driver').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Test Driver');
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('0987654321');
    await page.getByPlaceholder('votre@email.com').fill(email);
    await page.getByPlaceholder('Min. 6 caractères').fill(password);
    await page.getByPlaceholder('Répéter le mot de passe').fill(password);
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    await expect(page.getByRole('heading', { name: 'Mes livraisons' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/driver');
});
test('Test sign up with existing email', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Existing User');
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('1234567890');
    await page.getByPlaceholder('votre@email.com').fill('existing@example.com');
    await page.getByPlaceholder('Min. 6 caractères').fill('Password123');
    await page.getByPlaceholder('Répéter le mot de passe').fill('Password123');
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
   
});
test('Test sign up with mismatched passwords', async ({ page }) => {
    const email = faker.internet.email();
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Mismatched User');
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('1234567890');
    await page.getByPlaceholder('votre@email.com').fill(email);
    await page.getByPlaceholder('Min. 6 caractères').fill('Password123');
    await page.getByPlaceholder('Répéter le mot de passe').fill('Password321');
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    await expect(page.getByText('Les mots de passe ne correspondent pas')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});
test('Test sign up with invalid email format', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Invalid Email User');
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('1234567890');
    await page.getByPlaceholder('votre@email.com').fill('invalid-email');
    await page.getByPlaceholder('Min. 6 caractères').fill('Password123');
    await page.getByPlaceholder('Répéter le mot de passe').fill('Password123');
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    const isValid = await page.getByPlaceholder('votre@email.com').evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
    
});

test('Test sign up with short password', async ({ page }) => {
    const email = faker.internet.email();
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByPlaceholder('Votre nom').fill('Short Password User');
    await page.getByPlaceholder('+212 6XX XXX XXX').fill('1234567890');
    await page.getByPlaceholder('votre@email.com').fill(email);
    await page.getByPlaceholder('Min. 6 caractères').fill('Pass');
    await page.getByPlaceholder('Répéter le mot de passe').fill('Pass');
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    await expect(page.getByText('Mot de passe trop court')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
    
});

test('Test sign up with empty fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByRole('button', { name: 'Créer mon compte →' }).click();
    const passValid = await page.getByPlaceholder('Min. 6 caractères').evaluate(el => el.validity.valid);
    expect(passValid).toBe(false);
    const emailValid = await page.getByPlaceholder('votre@email.com').evaluate(el => el.validity.valid);
    expect(emailValid).toBe(false);
    const nameValid = await page.getByPlaceholder('Votre nom').evaluate(el => el.validity.valid);
    expect(nameValid).toBe(false);
    const phoneValid = await page.getByPlaceholder('+212 6XX XXX XXX').evaluate(el => el.validity.valid);
    expect(phoneValid).toBe(true);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeHidden();
});
test('test login button in register page', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByTestId('role-merchant').click();
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();
    await page.getByRole('link', { name: 'Se connecter' }).click();
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/login');
});

test('test back to home button in register page', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.getByText('Créer un compte')).toBeVisible();
    await page.getByRole('link', { name: '← Retour à l\'accueil' }).click();
    await expect(page.getByRole('heading', { name: 'Gérez vos livraisons' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/');
});