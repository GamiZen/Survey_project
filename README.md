## Survey Project – Take-Home Assignment

This project was built as part of a technical assignment for an IT Assistant position.  
The goal was to create a simple but fully functional survey deployed on a VPS — including frontend, backend, and devops tasks.

---

## Features

- Landing page with responsive design
- 3-step survey with:
  - Income range
  - Employment status
  - US phone number (validated and formatted)
- Animated transitions between steps
- Progress bar showing survey completion
- Data stored in browser (`localStorage`) and sent to backend API
- `/api/survey` endpoint that accepts POST data
- Success page with summary and submit
- Admin dashboard with:
  - Password-protected access
  - Table with all responses
  - CSV export
  - Bar chart (Recharts) to visualize income data
  - Filtering by income and employment

---

## Live Demo

Hosted on a VPS with:
- Free DuckDNS domain
- SSL via Let's Encrypt
- Reverse proxy via Nginx
- App running on Node.js + PM2

https://survey-project.duckdns.org

---

## 🧪 Technologies Used

| Area         | Tech                            |
|--------------|---------------------------------|
| Framework    | **Next.js** (React-based)       |
| Language     | JavaScript (ES6+), HTML, CSS    |
| Styling      | TailwindCSS                     |
| Animations   | Framer Motion                   |
| Charts       | Recharts                        |
| State Mgmt   | React Context API               |
| Deployment   | VPS, PM2, Nginx, GitHub Actions |
| Design       | Figma (mockups created manually)|
| Security     | Password-protected `/admin`     |

---

## Running Locally

1. Clone the repo  
2. Install dependencies  
   ```bash
   npm install
3. Run locally
   npm run dev
4. Open http://localhost:3000

---

## Admin Access

Visit /admin route and enter the password:
admin

You can customize the password via .env file:
NEXT_PUBLIC_ADMIN_PASSWORD=admin

---

## Deployment Setup

This app is deployed to a remote VPS with:

✅ Node.js + PM2 to keep the app running

✅ Nginx as a reverse proxy (serves HTTPS with valid SSL)

✅ GitHub Actions for auto-deployment:

    Pulls repo on push to main

    Builds project and restarts PM2


---

## Testing & Debugging

During development and deployment, the project was tested using:

✅ Multiple browsers (Chrome, Firefox, Edge)

✅ Mobile and desktop screen sizes

✅ Postman to test /api/survey

✅ curl for direct POST request testing

✅ SSH and PM2 for logs (pm2 logs app)

✅ Manually tested GitHub Action workflow

---

## Optional Tasks Completed

Optional Task	Status
Free domain with SSL	✅
Redirect /google	✅
GitHub repo setup	✅
GitHub Actions deploy to VPS	✅
Frontend input validation	✅
Responsive mobile/desktop UI	✅
Survey design mockup (Figma)	✅
Send survey data to /api/survey	✅
Save user progress with cookies/storage	✅

---

## Additional Enhancements

✅ Phone input auto-formats to US standard: (123) 456-7890

✅ Admin can filter + export responses

✅ Chart included to show distribution

✅ Progress bar persists and animates across steps

---

## Author

Created by Gabrielius
As part of a technical assessment challenge.
Thank you for reviewing this project!