# Contributing to the UI Component Showcase ✨

First off, thank you for considering contributing! We're thrilled you're here. This project is a celebration of open source and creativity, especially for those participating in **Hacktoberfest 2025**.

This document provides all the guidelines you need to contribute effectively. Let's build something amazing together! 🚀

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. We do not tolerate harassment of participants in any form. By participating in this project, you agree to abide by our **Code of Conduct**. Please be respectful and considerate in all your interactions.

## 🤔 How to Contribute

We've designed a straightforward, three-step process to make contributing as easy as possible.

---

### **Step 1: Create Your UI Component Locally**

1.  **Fork the Repository**

    - Click the "Fork" button at the top-right corner of this page to create your personal copy.

2.  **Clone Your Fork**

    - Clone the repository to your local machine using git.

    ```bash
    git clone [https://github.com/YOUR_USERNAME/Hacktoberfest2025.git](https://github.com/YOUR_USERNAME/Hacktoberfest2025.git)
    cd Hacktoberfest2025
    ```

3.  **Choose a Category & Create Your Folder**

    - Navigate to the `projects` directory.
    - Choose a component category (e.g., `buttons`, `loaders`, `checkboxes`).
    - Inside that category, create a **new folder named with your GitHub username**.
    - Example: `projects/buttons/your_username`

4.  **Set Up the File Structure**

    - Inside your `[your_username]` folder, you **must** create the following file structure. This is essential for your project to be displayed correctly.

    ```
    your_username/
    ├── assets/
    │   └── images/  (for any images you use)
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── index.html
    ```

5.  **Build Your Component**
    - Get creative! Code your unique UI component within the files you just created. Ensure it's a self-contained project that runs perfectly from its own `index.html`.

---

### **Step 2: Deploy Your Component to Netlify**

To showcase a live version of your work, you need to deploy **only your component's folder** to Netlify.

1.  **Log in to Netlify:**

    - Go to [netlify.com](https://www.netlify.com/) and log in or sign up (it's free!).

2.  **Deploy Manually:**

    - From your Netlify dashboard, go to the "Sites" tab, click on **"Add new site"**, and select **"Deploy manually"**.
    - Drag and drop your **personal username folder** (e.g., the `your_username` folder from `projects/buttons/`) into the upload area.

3.  **Get Your Live URL:**
    - Once uploaded, Netlify will give you a live URL. You can customize the site name in **Site settings** to make it more memorable.
    - Copy this URL (e.g., `your-component.netlify.app`). You'll need it for the next step.

---

### **Step 3: Add Your Details & Create a Pull Request**

1.  **Update `contributors.json`**

    - In the root of the main project, open the `contributors.json` file.
    - Add a new JSON object with your details at the **end** of the list. Make sure to add a comma `,` after the previous entry.

    **Use this exact format:**

    ```json
    {
      "name": "Your Name",
      "occupation": "Your Occupation (e.g., Web Developer)",
      "place": "Your City, Country",
      "bio": "A short, fun bio about yourself!",
      "github_profile_url": "[https://github.com/your_username](https://github.com/your_username)",
      "project_netlify_link": "[https://your-component.netlify.app](https://your-component.netlify.app)"
    }
    ```

2.  **Commit and Push Your Changes**

    - Stage your changes, commit them with a descriptive message, and push them to your forked repository.

    ```bash
    git add .
    git commit -m "feat: Add [Your Component Name] by [Your Username]"
    git push origin main
    ```

3.  **Open a Pull Request**

    - Go to your forked repository on GitHub. Click the **"Contribute"** button, then **"Open pull request"**.
    - Provide a clear title and a brief description of the component you've added.
    - Our team will review your PR. Once it's approved and merged, your component will be live on our showcase!

    **Important Note:** Please add your data object at the **end of the list** inside the `contributors.json` file. Do not add your details in the middle or at the beginning of the file. Your new entry should be placed after the last existing entry, separated by a comma.

    For example:

    ```txt
    [
        ...
        {
            // some one else's data
        },
        {
            // Add your data object here
        }
    ]
    ```

## ✅ Contribution Guidelines & Rules

To ensure a high-quality showcase and a positive experience for everyone, please adhere to the following rules:

- **Original Work:** Your component must be your own original work.
- **Responsive Design:** Please ensure your component is responsive and looks good on different screen sizes.
- **Follow the Structure:** Submissions that do not follow the prescribed folder and file structure will not be accepted.
- **One Component Per PR:** Please submit only one component per pull request to keep reviews manageable.

## 🎃 Hacktoberfest 2025 Rules

This project proudly participates in Hacktoberfest. For your PR to count towards your Hacktoberfest goals, you must follow these official rules:

- Your pull requests must be submitted between **October 1 and October 31, 2025**.
- Your PR must be merged by a maintainer or labeled as **"hacktoberfest-accepted"** to be considered valid.
- **No Spam or Low-Quality PRs:** We will not accept low-effort contributions. This includes but is not limited to:
  - Automated PRs for fixing typos or whitespace.
  - Disruptive pull requests that take someone else's work.
  - Any other contributions that go against Hacktoberfest's values.
- Contributors with **2 or more spammy PRs will be disqualified** from participating in Hacktoberfest.

We look forward to seeing your amazing creations. **Happy Hacking!** 🎉
