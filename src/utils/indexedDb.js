/**
 * Minimal IndexedDB helper for storing customers
 */
export function openDB(name = 'doubletick-db', version = 1) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, version);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('customers')) {
        db.createObjectStore('customers', { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function getAllCustomers() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('customers', 'readonly');
    const store = tx.objectStore('customers');
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

export async function saveCustomers(customers = []) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('customers', 'readwrite');
    const store = tx.objectStore('customers');
    for (const c of customers) store.put(c);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error || new Error('Transaction failed'));
  });
}

export async function clearCustomers() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('customers', 'readwrite');
    const store = tx.objectStore('customers');
    const req = store.clear();
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}
