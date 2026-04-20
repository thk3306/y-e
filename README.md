# Yohana & Emil Wedding RSVP Website

## Google Sheets RSVP Setup

The RSVP form in [index.html](index.html) is ready to send submissions to Google Sheets through a Google Apps Script web app.

### What to update

1. Open [google-apps-script.gs](google-apps-script.gs) and replace `PASTE_YOUR_SPREADSHEET_ID_HERE` with your Google Sheet ID.
2. In [index.html](index.html), replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your deployed Apps Script web app URL.

### Deploy the Apps Script

1. Create or open the target Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the contents of [google-apps-script.gs](google-apps-script.gs) into the script editor.
4. Save the project.
5. Click **Deploy > New deployment**.
6. Choose **Web app** as the deployment type.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone**.
9. Deploy and authorize the script.
10. Copy the Web app URL into [index.html](index.html).

### Test it

1. Open the RSVP page in a browser.
2. Submit a test RSVP.
3. Confirm a new row appears in the `RSVPs` tab of your Google Sheet.

### Notes

- The form uses a client-side `fetch` request with `mode: "no-cors"`, which is fine for a simple RSVP collector.
- If you share the final Web app URL, I can wire it directly into [index.html](index.html) for you.
