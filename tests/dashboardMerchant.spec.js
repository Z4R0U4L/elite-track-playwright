import {test , expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';

test('access dashboard', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await page.goto('http://localhost:3000/register');
  await registerPage.registerMerchant({ name: "test", phone: "1234567890", email: faker.internet.email(), password: faker.internet.password() });
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});
test('test switching between tabs', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Commandes' }).click();
    await expect(page.getByRole('heading', { name: 'Commandes' })).toBeVisible();
    await page.getByRole('button', { name: 'Carte GPS' }).click();
    await expect(page.getByRole('heading', { name: 'Carte GPS — Livreurs en temps réel' })).toBeVisible();
    await page.getByRole('button', { name: 'Livreurs' }).click();
    await expect(page.getByRole('heading', { name: 'Livreurs' })).toBeVisible();
    await page.getByRole('button', { name: 'Dashboard' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
test('test creating a new order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const clientName = faker.person.fullName();
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: '+ Nouvelle commande' }).click();
    await expect(page.getByRole('heading', { name: 'Nouvelle commande' })).toBeVisible();
    const NomDeClientInput = page.locator('input').nth(0);
    const TelephoneInput = page.locator('input').nth(1);
    const EmailInput = page.locator('input').nth(2);
    const AdresseInput = page.locator('input').nth(3);
    const NotesInput = page.locator('textarea');
    await NomDeClientInput.fill(clientName);
    await TelephoneInput.fill('1234567890');
    await EmailInput.fill('testclient@example.com');
    await AdresseInput.fill('123 Rue de Test, Ville');
    await NotesInput.fill('Livraison urgente, appeler à l\'arrivée');
    await page.getByRole('button', { name: 'Créer la commande' }).click();
    const row = page.locator('tr', { hasText: clientName });
    const status = row.locator('td').nth(4);
    const Livreur = row.locator('td').nth(3);
    const Adresse = row.locator('td').nth(2);
    const clientPlusTelephone = row.locator('td').nth(1);
    const id = row.locator('td').nth(0);
    await expect(id).toHaveText(/CMD-/);
    await expect(clientPlusTelephone).toHaveText(`${clientName}1234567890`);
    await expect(Adresse).toHaveText('123 Rue de Test, Ville');
    await expect(Livreur).toHaveText('—');
    await expect(status).toHaveText('En attente');
});
test('test assigning a delivery person to an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Commandes' }).click();
    await expect(page.getByRole('heading', { name: 'Commandes' })).toBeVisible();

    // 1. Find a candidate row and grab its unique ID
    const initialRow = page.locator('tbody tr').filter({ 
        has: page.getByRole('button', { name: 'Assigner' }) 
    }).first();
    
    // Extract the ID (e.g., CMD-106070) to "lock" onto this specific row
    const orderId = await initialRow.locator('td').first().innerText();

    // 2. Create a stable locator based on that ID
    const row = page.locator('tbody tr').filter({ hasText: orderId });
    const assignButton = row.getByRole('button', { name: 'Assigner' });

    await assignButton.click();
    await expect(page.getByRole('heading', { name: /Assigner un livreur/ })).toBeVisible();

    const livreurOption = page.getByRole('button', { name: 'Noureddine zaroual' });
    await livreurOption.click();

    // 3. Assertions now correctly target the updated row
    const Livreur = row.locator('td').nth(3);
    const status = row.locator('td').nth(4);

    await expect(Livreur).toHaveText('Noureddine zaroual');
    await expect(status).toHaveText('Assignée');
});
test('test canceling an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Commandes' }).click();
    await expect(page.getByRole('heading', { name: 'Commandes' })).toBeVisible();
    const row = page.locator('tr').nth(1);
    const cancelButton = row.getByRole('button', { name: 'Annuler' });
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
    await cancelButton.click();
    const status = row.locator('td').nth(4);
    await expect(status).toHaveText('Annulé');
});

test('test status filtering', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Commandes' }).click();
    await expect(page.getByRole('heading', { name: 'Commandes' })).toBeVisible();
    const filterselect = page.locator('select');
    await filterselect.selectOption('En attente');
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
        const status = rows.nth(i).locator('td').nth(4);
        await expect(status).toHaveText('En attente');
    }
});
test('test adding a new delivery person', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const name = faker.person.fullName();
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Livreurs' }).click();
    await expect(page.getByRole('heading', { name: 'Livreurs' })).toBeVisible();
    await page.getByRole('button', { name: '+ Ajouter livreur' }).click();
    await expect(page.getByRole('heading', { name: 'Ajouter un livreur' })).toBeVisible();
    const nameInput = page.locator('input').nth(0);
    const emailInput = page.locator('input').nth(1);
    const phoneInput = page.locator('input').nth(2);
    const passwordInput = page.locator('input[type="password"]');
    await nameInput.fill(name);
    await emailInput.fill(faker.internet.email());
    await phoneInput.fill(faker.phone.number());
    await passwordInput.fill(faker.internet.password());
    await page.getByRole('button', { name: 'Créer le livreur' }).click();
    await expect(page.getByRole('heading', { name: 'Livreurs' })).toBeVisible();
    await expect(page.getByText(name)).toBeVisible();
});

test('test logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/login');
    await loginPage.login('zakiilyass12@gmail.com', 'zaroual123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Déconnexion' }).click();
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:3000/login');
});














