# Quick Testing Guide - KodeBloom Login System

## All Issues Fixed ✅

### Backend Issues Resolved:
1. ✅ Auth controller email lookup inconsistency for different models
2. ✅ Email case-sensitivity in login
3. ✅ Role-based status checks with proper field access
4. ✅ Auth middleware role validation logic
5. ✅ Missing admin routes registration

### Frontend Issues Resolved:
1. ✅ Form data extraction using unreliable array indices
2. ✅ Missing error state management
3. ✅ Missing loading states
4. ✅ Form field naming and ID attributes
5. ✅ Error display styling

---

## How to Test

### Start Backend
```bash
cd backend
npm run dev
# Expected: Server running on http://localhost:5002
# Expected: MongoDB Connected
```

### Start Frontend
```bash
cd frontend
npm run dev
# Expected: Running at http://localhost:5173
```

### Test 1: Admin Login
1. Go to http://localhost:5173/select-role
2. Click "Admin"
3. Enter admin credentials
4. Expected: Should successfully login and redirect

### Test 2: Principal Login
1. Go to http://localhost:5173/select-role
2. Click "Principal"
3. Enter: email: principal@gmail.com
4. Enter password (check DB or your records)
5. Expected: Should display errors if account not active, otherwise login successful

### Test 3: Staff Login
1. Go to http://localhost:5173/select-role
2. Click "Staff"
3. Enter staff email (from contactInfo.email in database)
4. Enter password
5. Expected: Should check staff status and login if active

---

## Testing Checklist

- [ ] Login form displays without errors
- [ ] Error messages display correctly when wrong credentials
- [ ] Loading spinner/text shows while submitting
- [ ] Token is saved to localStorage after successful login
- [ ] User data is saved to localStorage
- [ ] Role is saved to localStorage
- [ ] User redirects to appropriate dashboard
- [ ] Can access protected routes with token
- [ ] Invalid token is rejected

---

## Browser Console Checks

Open DevTools (F12) and check:
- Console: No JavaScript errors
- Network: POST /api/auth/login/[role] shows 200 or 401/404
- Application: localStorage has token, user, role

---

## Backend Console Checks

Look for messages like:
```
MongoDB Connected
Server running on http://localhost:5002
[timestamp] Request: POST /api/auth/login/admin
[timestamp] Request: POST /api/auth/login/principal
[timestamp] Request: POST /api/auth/login/staff
```

---

## Common Issues & Solutions

### "User not found"
- Check that user exists in database
- Verify email format matches exactly
- For Staff, check contactInfo.email field

### "Invalid credentials"
- Password may be incorrect
- Password field in DB might not be hashed properly
- Try creating a new user with known password

### "Account is not active"
- For Principal: Check isActive field is true
- For Staff: Check status field is "Active"
- Admin can create/approve principals

### "Server error"
- Check backend is running
- Check MongoDB connection
- Check network tab for actual error response

### Can't see error messages
- Check form has proper error state display
- Check CSS is loading correctly
- Check browser console for React errors

---

## Database Verification

### Check Admin exists:
```javascript
db.admins.findOne({ email: "your@email.com" })
```

### Check Principal exists:
```javascript
db.principals.findOne({ email: "principal@gmail.com" })
```

### Check Staff exists:
```javascript
db.staff.findOne({ "contactInfo.email": "staff@email.com" })
```

### Verify password field exists:
```javascript
db.admins.findOne({}, { password: 1 })
```

---

## Next Steps if Issues Persist

1. Check mongoDB is running
2. Verify MONGO_URI in .env
3. Verify JWT_SECRET is set in .env
4. Check all dependencies installed: `npm install`
5. Clear localStorage and refresh
6. Check Network tab for CORS issues

---

## Files Modified
- backend/controllers/authcontroller.js
- backend/middleware/authMiddleware.js
- backend/server.js
- frontend/src/pages/Login.jsx
- frontend/src/pages/PrincipalLogin.jsx
- frontend/src/pages/AdminLogin.jsx

All changes are backward compatible and improve stability!
