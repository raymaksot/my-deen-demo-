import { apiGet } from './services/api';

async function testDatabaseConnection() {
  try {
    // Пример: запрос к health-check или тестовой таблице
    const result = await apiGet('/health'); // замените на реальный endpoint
    console.log('Database connection OK');
    console.log('Result:', result);
  } catch (error: any) {
    console.error('Database connection FAILED');
    console.error(error);
  }
}

testDatabaseConnection();
