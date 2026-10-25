# CRUD Functionalities & Operations Manual

**Course:** EC4307 Web Application Development Mini Project  
**Evaluation Rubric Alignment:**  
- **Create (4 Marks):** Adding new records through forms  
- **Read (4 Marks):** Listing, viewing details, search, filter, and sort  
- **Update (4 Marks):** Editing existing records  
- **Delete (4 Marks):** Removing records safely with safeguards  
- **Validation & Error Handling (2 Marks):** Client & server-side validation, error states  

---

## 1. Overview of Persistent Entities

PortfolioCraft implements full, persistent CRUD operations across multiple interconnected MongoDB collections managed via Mongoose ODM:

| Entity / Collection | Primary Role | CRUD Operations Supported |
| :--- | :--- | :--- |
| **`layouts`** *(Main Entity)* | Stores visual portfolio layouts, dynamic component arrays, themes, and analytics | **Full CRUD:** Create layout, Read public/private, Update components & theme, Delete layout |
| **`users`** | Creator accounts, credentials, plans, roles, and profiles | **Full CRUD:** Register, Read profile, Update account/settings, Cascading Delete |
| **`messages`** | Visitor inquiries submitted through portfolio contact forms | **Full CRUD:** Create inquiry, Read inbox/admin log, Delete message record |
| **`paymentrequests`** | Upgrade slips uploaded for plan verification | **Full CRUD:** Create slip upload, Read pending requests, Update status (Approve/Reject), Delete |
| **`careerapplications`** | Job applicant resumes and details submitted via `/careers` | **Full CRUD:** Submit application, Read candidate list, Update candidate status, Delete candidate |
| **`newsletters`** | Email newsletter subscriber lists | **CRUD:** Create subscription, Read subscriber list |

---

## 2. CREATE Operations (Rubric: 4 Marks)
*Assessment: Adding new records persistently through validated forms.*

### 2.1. Creating a New Portfolio Layout
- **Endpoint:** `POST /api/layouts`
- **Controller File:** `backend/routes/layout.js`
- **Mechanism:** When a user registers or selects a new template, a complete default layout structure is generated with initialized components (Hero Banner, About Me, Projects Grid, Skills Cloud, Contact Section) and written to MongoDB:
```javascript
// Excerpt from backend/routes/layout.js
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { title, handle, templateId, theme, components } = req.body;
  const newLayout = new Layout({
    userId: req.user._id,
    title: title || `${req.user.username}'s Portfolio`,
    handle: (handle || req.user.username).toLowerCase().trim(),
    theme: theme || { fontFamily: 'Inter', primaryColor: '#6366f1' },
    components: components || defaultComponents,
    isPublished: false
  });
  await newLayout.save();
  res.status(201).json({ success: true, layout: newLayout });
});
```

### 2.2. Adding a Section Component to an Existing Layout
- **Frontend Form:** `EditorSidebar.jsx` -> `AVAILABLE_COMPONENTS.map(...)`
- **Redux Action:** `addComponent({ type, title, defaultProps })`
- **Persistence:** Persisted to MongoDB upon auto-save or manual "Save Draft" / "Publish".

### 2.3. User Registration
- **Endpoint:** `POST /api/auth/register`
- **Form:** `Register.jsx` (Email, Username, Password, Role)
- **Validation:** Bcrypt hashing, email format regex, duplicate username check.

### 2.4. Submitting a Contact Message
- **Endpoint:** `POST /api/messages`
- **Form:** `ContactSection.jsx` and `ContactPage.jsx`
- **Payload:** `{ recipientUserId, senderName, senderEmail, subject, message }`

### 2.5. Submitting Payment Verification Requests
- **Endpoint:** `POST /api/payment/submit` (Multipart form-data)
- **Form:** `PaymentForm.jsx` (National ID number, country, phone, payment slip image)

---

## 3. READ Operations (Rubric: 4 Marks)
*Assessment: Listing records, viewing details, searching, filtering, and sorting.*

### 3.1. Public Portfolio Retrieval by Unique Handle
- **Endpoint:** `GET /api/layouts/public/:handle`
- **Routing:** `/p/:handle` (e.g. `/p/alex-morgan`)
- **Details Viewed:** Populates user details, decodes component hierarchy, verifies publication status (`isPublished: true`), and registers cookieless visitor analytics.

### 3.2. Template Explorer with Category Filtering
- **Page:** `Templates.jsx`
- **Capabilities:**
  - **Category Tabs Filter:** `All Templates`, `Developer & Tech`, `Design & 3D`, `Minimalist`, `Executive & Agency`.
  - **Live Preview:** Modal and dedicated preview `/preview/:templateId` enabling full viewport testing before selection.

### 3.3. Showcase Gallery with Live Search & Tag Filtering
- **Page:** `Showcase.jsx`
- **Capabilities:**
  - **Text Search:** Filter creators by full name, handle, or bio keywords.
  - **Category Filters:** Filter by `Engineering`, `Product Design`, `3D & Motion`, `Full Stack`.
  - **Sorting:** Sort portfolios by newest, featured, and view count.

### 3.4. Administrative Dashboard Data Tables
- **Page:** `AdminDashboard.jsx`
- **Endpoints:**
  - `GET /api/admin/users`: Lists all registered users with search by email and role filters.
  - `GET /api/admin/payment-requests`: Lists pending, approved, and rejected manual payments with sorting by date.
  - `GET /api/messages/admin/log`: Lists contact inquiries across the platform with privacy-safe metadata.
  - `GET /api/careers/admin/all`: Lists candidate job applications with resume links.

---

## 4. UPDATE Operations (Rubric: 4 Marks)
*Assessment: Modifying existing records safely with immediate reflection.*

### 4.1. Layout CMS Updating (Components, Theme, SEO)
- **Endpoint:** `PUT /api/layouts/:id`
- **Frontend Controller:** `layoutSlice.js` (`saveUserLayout`)
- **Operations Supported:**
  - **Reordering Components:** Changing section indices via visual Move Up/Down buttons (`reorderComponents`).
  - **Toggling Visibility:** `updateComponentVisibility({ componentId, isVisible })`.
  - **Editing Component Properties:** Live attribute modification in `ComponentInspector.jsx` (titles, bio, project items, links, image URLs).
  - **Theme Updating:** Granular hex color changes (`updateTheme`), font family switching (`fontFamily`), and resume download button toggle (`showResumeDownload`).
  - **Publishing State:** Toggle between Draft and Live Published modes (`isPublished`).

### 4.2. User Profile & Account Settings
- **Endpoint:** `PUT /api/auth/profile`
- **Page:** `ProfileSettings.jsx`
- **Fields Updated:** Full name, professional headline, bio, location, website, GitHub/LinkedIn links, and password.

### 4.3. Payment Request Status Updating (Admin Approval)
- **Endpoint:** `PUT /api/admin/payment-request/:id/approve`
- **Mechanism:** Admin reviews uploaded bank slip; upon approval, system automatically sets `request.status = 'approved'` and elevates user's subscription to `pro` or `studio`, notifying the user via transactional email.

---

## 5. DELETE Operations (Rubric: 4 Marks)
*Assessment: Removing records safely with safeguards and cascading cleanup.*

### 5.1. Deleting a Portfolio Layout (With Safety Constraint)
- **Endpoint:** `DELETE /api/layouts/id/:layoutId`
- **Safety Safeguard:** A user cannot delete their only portfolio. The backend validates total portfolio count before allowing deletion:
```javascript
// Excerpt from backend/routes/layout.js
router.delete('/id/:layoutId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userLayouts = await Layout.find({ userId: req.user._id });
  if (userLayouts.length <= 1) {
    return res.status(400).json({ 
      success: false, 
      message: 'Cannot delete your only portfolio. You must maintain at least one active layout.' 
    });
  }
  await layout.deleteOne();
  res.status(200).json({ success: true, message: 'Portfolio layout deleted successfully' });
});
```

### 5.2. Deleting an Individual Component from a Layout
- **Redux Action:** `removeComponent(componentId)`
- **Safety Safeguard:** User is prompted with a confirmation dialog before removal; state can be instantly restored using **Undo (`Ctrl + Z`)**.

### 5.3. Cascading User Account Deletion (GDPR "Right to be Forgotten")
- **Endpoint:** `POST /api/auth/delete-account`
- **Safety Safeguard:** Requires user to re-enter their current password for authorization.
- **Cascading Cleanup:** Safely deletes:
  1. All portfolio layouts owned by the user (`Layout.deleteMany({ userId })`).
  2. All contact messages sent to the user (`Message.deleteMany({ recipientUserId })`).
  3. The user record itself (`User.findByIdAndDelete`).

### 5.4. Deleting Inquiries & Applications in Admin
- `DELETE /api/messages/:id`: Removes message log entry.
- `DELETE /api/careers/admin/:id`: Removes candidate application record.

---

## 6. Validation and Error Handling (Rubric: 2 Marks)

### 6.1. Client-Side Validation
- **Form Validation:** Real-time checking of required fields, valid email structures, minimum password length (6 characters), and URL regex.
- **Interactive Feedback:** Input field error borders, animated alert banners, and disabled submit buttons during in-flight network requests.
- **Undo / Redo Buffer:** Prevents user data loss from accidental edits or component deletions.

### 6.2. Server-Side Validation & Stability
- **Mongoose Schema Constraints:** Strict data types, required fields, enum validation on component types and plans, and unique index enforcement (`email`, `handle`).
- **Express Rate Limiting:** Brute-force protection on authentication routes (`/login`, `/register`, `/forgot-password`) limiting requests to prevent automated attacks.
- **HTTP Status Codes:** Explicit semantic response codes:
  - `200 OK` / `201 Created` on successful operations.
  - `400 Bad Request` on invalid payload or constraint violation.
  - `401 Unauthorized` on missing or expired JWT tokens.
  - `403 Forbidden` on role violations or plan tier limits.
  - `404 Not Found` on non-existent handles or layouts.
  - `500 Internal Server Error` with sanitized error messages.
