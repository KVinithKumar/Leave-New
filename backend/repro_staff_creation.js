
// Using global fetch


const BASE_URL = 'http://localhost:5002/api';

async function test() {
  try {
    // 1. Login as Principal
    console.log('Logging in as Principal...');
    const loginRes = await fetch(`${BASE_URL}/auth/login/principal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'principal@gmail.com',
        password: 'principal123'
      })
    });

    const loginData = await loginRes.json();
    if (!loginRes.ok) {
      console.error('Login failed:', loginData);
      return;
    }
    console.log('Login successful. Token:', loginData.token ? 'Yes' : 'No');
    const token = loginData.token;

    // 2. Create Staff
    console.log('Creating Staff...');
    const staffData = {
      fullName: "Test Teacher",
      fatherName: "Test Father",
      motherName: "Test Mother",
      dob: "1990-01-01",
      gender: "male",
      phoneNumber: "1234567890",
      email: `teacher${Date.now()}@test.com`,
      emergencyContact: "0987654321",
      currentAddress: "123 Test St",
      permanentAddress: "123 Test St",
      qualification: "B.Ed",
      experience: "5",
      subjectSpecialization: "Math",
      subjectDealing: "Math",
      teacherType: "primary",
      password: "password123",
      aadharNumber: "123456789012"
    };

    const createRes = await fetch(`${BASE_URL}/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(staffData)
    });

    const createData = await createRes.json();
    if (!createRes.ok) {
      console.error('Create Staff failed:', createData);
    } else {
      console.log('Staff created successfully:', createData);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

test();
