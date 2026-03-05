# google-chrome-plugin-sample

Google's Chrome Web Plugin Sample

For a step-by-step plan to build a new extension in this repo, see **[Chrome Extension Development Plan](docs/CHROME_EXTENSION_DEVELOPMENT_PLAN.md)**. For the exact steps and commands used to create the Hello World sample (label + one API button), see **[Development Steps](docs/DEVELOPMENT_STEPS.md)**.

---

## Exporting the extension

To **export** the plugin so others can install it (e.g. as a zip file):

1. **Prepare the folder**  
   Use the extension’s root folder (the one that contains `manifest.json`). Do **not** include unnecessary files such as `.git`, `node_modules`, or local dev scripts.

2. **Create a zip**  
   - **macOS/Linux**: From the parent of the extension folder, run:
     ```bash
     zip -r my-extension.zip my-extension-folder/ -x "*.git*" -x "*node_modules*"
     ```
   - **Windows**: Right‑click the extension folder → **Send to** → **Compressed (zipped) folder**, or use your preferred zip tool.
   - Name the file clearly (e.g. `my-extension-v1.0.0.zip`).

3. **Share the zip**  
   Send the `.zip` file to peers or store it where they can download it. They will **import** it using the steps below.

---

## Importing the extension (using the zip file)

To **import** the plugin into Chrome from a zip file:

1. **Unzip the file**  
   Extract the downloaded `.zip` to a folder (e.g. `Downloads/my-extension`). The folder must contain `manifest.json` at the top level.

2. **Open Chrome’s Extensions page**  
   - In the address bar, go to: `chrome://extensions`  
   - Or: Chrome menu (⋮) → **More tools** → **Extensions**  
   - Or: Click the puzzle icon (Extensions) → **Manage Extensions**

3. **Enable Developer mode**  
   Turn on **Developer mode** (toggle in the top‑right of the Extensions page).

4. **Load the extension**  
   - Click **Load unpacked**.  
   - In the file dialog, select the **unzipped folder** (the one that contains `manifest.json`), then confirm.

5. **Confirm**  
   The extension should appear in the list. Pin it from the puzzle menu if you want it on the toolbar.
