/**
 * Generate mock customer data
 * @param {number} count - Number of customers to generate
 * @returns {Array} Array of customer objects
 */
export const generateCustomers = (count) => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Thomas', 'Linda', 'Charles', 'Barbara', 'Daniel', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'doubletick.com'];
  const addedByList = ['Kartikey Mishra','Keshav Singh','Anjali Verma','Rohit Kumar','Sneha Patel'];
  
  const customers = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domains[Math.floor(Math.random() * domains.length)]}`;
    
    // Age between 20 and 40 inclusive
    const age = 20 + Math.floor(Math.random() * 21);

    // random last message time within past year
    const now = Date.now();
    const maxOffset = 365 * 24 * 60 * 60 * 1000; // 365 days in ms
    const offset = Math.floor(Math.random() * maxOffset);
    const lastMessageDate = new Date(now - offset);

    customers.push({
      id: i,
      name,
      phone: `+917600${String(i).padStart(6, '0')}`,
      email,
      age,
      lastMessageAt: lastMessageDate.toISOString(),
      addedBy: addedByList[Math.floor(Math.random() * addedByList.length)],
      avatar: '/test_user.svg'
    });
  }
  
  return customers;
};
