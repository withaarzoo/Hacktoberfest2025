# Hacktoberfest 2025 - UI Component Showcase

![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/withaarzoo/Hacktoberfest2025?style=social)](https://github.com/withaarzoo/Hacktoberfest2025/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/withaarzoo/Hacktoberfest2025?style=social)](https://github.com/withaarzoo/Hacktoberfest2025/network/members)

Welcome to the **UI Component Showcase** for Hacktoberfest 2025! 🎉 This repository is designed to be a fun and accessible project for everyone, especially those new to open source. The goal is to create a collection of beautiful, self-contained UI components created by the community.

### ✨ **[Click Here to See Our Valuable Contributors and Their Projects!](https://withaarzoo.github.io/Hacktoberfest2025/)** ✨

## How to Contribute

Contributing to this project is a simple, three-step process. Follow these instructions carefully to get your pull request merged and count towards your Hacktoberfest goals!

---

### **Step 1: Create Your Component Locally**

1.  **Fork the Repository**

    - Click the "Fork" button at the top right of this page to create your own copy of this project.

2.  **Clone Your Fork**

    - Clone your forked repository to your local machine.

    ```bash
    git clone [https://github.com/YOUR_USERNAME/Hacktoberfest2025.git](https://github.com/YOUR_USERNAME/Hacktoberfest2025.git)
    cd Hacktoberfest2025
    ```

3.  **Choose a Component and Create Your Folder**

    - Navigate to the `projects` directory.
    - Choose a category you'd like to contribute to (e.g., `buttons`, `loaders`, `checkboxes`).
    - Inside the chosen category folder, create a **new folder named with your GitHub username**. (e.g., `projects/buttons/withaarzoo`).

4.  **Set Up the File Structure**

    - Inside your `[your_username]` folder, create the following file structure:

    ```
    your_username/
    ├── assets/
    │   └── images/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── index.html
    ```

5.  **Build Your Component**
    - Now, get creative! Code your unique UI component within the files you just created. Make sure it's a self-contained project that runs from your `index.html`.

---

### **Step 2: Deploy Your Component to Netlify**

To showcase your work, you need to deploy **only your component's folder** to Netlify.

1.  **Log in to Netlify:**

    - Go to [netlify.com](https://www.netlify.com/) and log in or sign up.

2.  **Deploy Manually:**

    - From your Netlify dashboard, click on **"Add new site"** and select **"Deploy manually"**.
    - Drag and drop your **username folder** (e.g., the `withaarzoo` folder, not the entire `Hacktoberfest2025` project) into the upload area.

3.  **Configure Your Site:**
    - Once uploaded, go to the site settings. Click **"Change site name"** and give your project a unique and memorable name.
    - Copy the live URL of your project (e.g., `your-project-name.netlify.app`).

---

### **Step 3: Add Your Details and Create a Pull Request**

1.  **Update `contributors.json`:**

    - Open the `contributors.json` file in the root of the main project.
    - Add a new JSON object with your details. Make sure to add a comma `,` after the previous entry if necessary.

    **Example format:**

    ```json
    {
      "name": "Your Name",
      "occupation": "Your Occupation (e.g., Web Developer)",
      "place": "Your City, Country",
      "bio": "A short, fun bio about yourself!",
      "github_profile_url": "[https://github.com/your_username](https://github.com/your_username)",
      "project_netlify_link": "[https://your-project-name.netlify.app](https://your-project-name.netlify.app)"
    }
    ```

2.  **Commit and Push Your Changes:**

    - Add your changes to git and push them to your forked repository.

    ```bash
    git add .
    git commit -m "feat: Add [Your Component Name] by [Your Username]"
    git push origin main
    ```

3.  **Open a Pull Request:**
    - Go to your forked repository on GitHub and click the **"Contribute"** button, then **"Open pull request"**.
    - Provide a clear title and description for your pull request.
    - Wait for your PR to be reviewed and merged.

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

## Contribution Guidelines & Rules

To ensure a high-quality showcase and a positive experience for everyone, please adhere to the following rules:

* **Original Work:** Your component must be your own original work.
* **Responsive Design:** Please ensure your component is responsive and looks good on different screen sizes.
* **Follow the Structure:** Submissions that do not follow the prescribed folder and file structure will not be accepted.
* **One Component Per PR:** Please submit only one component per pull request to keep reviews manageable.

## Our Amazing Contributors

A huge thank you to all the wonderful people who have contributed to this project! This section will automatically update as we merge new pull requests.

[![Contributors](https://contrib.rocks/image?repo=withaarzoo/Hacktoberfest2025)](https://github.com/withaarzoo/Hacktoberfest2025/graphs/contributors)
[![Contributors](https://contrib.rocks/image?repo=dsawithaditi/Hacktoberfest2025)](https://github.com/dsawithaditi/Hacktoberfest2025/graphs/contributors)

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Thank you for your contribution! **Happy Hacking!** 🚀


