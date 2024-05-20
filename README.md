# LinkedUp Chrome Extension

![LinkedUp Logo](src/assets/Logo.png)

## Overview

LinkedUp is a Chrome extension designed to help users effortlessly save and manage LinkedIn profiles. With a sleek and intuitive interface, LinkedUp enables you to quickly add profiles from LinkedIn, view them in a convenient list, and easily navigate back to those profiles whenever you need. This extension leverages Chrome's storage and scripting APIs to provide a seamless user experience.

## Features

-   **Add Profiles**: Extract and save LinkedIn profiles directly from the current tab.
-   **View Profiles**: Display a list of saved profiles with profile pictures and names.
-   **Navigate to Profiles**: Click on a saved profile to open it in a new tab.
-   **Delete Profiles**: Remove profiles from the list with a simple click.
-   **Persisted Storage**: Profiles are saved using Chrome's sync storage, ensuring they are available across different devices.
-   **Device Sync**: All your saved profiles are synced across all your google logged-in devices

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/linkedup-extension.git
    ```
2. **Load the extension in Chrome**:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" using the toggle in the top right corner.
    - Click on "Load unpacked"
    - Select the "dist" folder in the project directory.

## Usage

1. **Open LinkedIn**: Navigate to any LinkedIn profile page.
2. **Add Profile**: Click on the LinkedUp extension icon and click "Add current profile" to save the profile.
3. **View Saved Profiles**: Click on the LinkedUp extension icon to view your saved profiles.
4. **Navigate to a Profile**: Click on any profile in the list to open it in a new tab.
5. **Delete a Profile**: Click the trash icon next to any profile to remove it from the list.

## Screenshots

### Adding a Profile

![Adding a Profile](src/assets/demo_videos/demo.gif)

## Development

### Code Structure

-   **App.jsx**: The main component handling the UI and core functionality which also acts as the extension's popup interface.
-   **App.css**: The CSS file for styling the popup interface.
-   **manifest.json**: The manifest file defining the extension's metadata and permissions.
-   **assets/**: Directory containing image assets like `trash.svg`.

## Troubleshooting

### Profile Data Not Persisting

Ensure that Chrome's sync storage is functioning correctly and that the extension has the necessary permissions.

### Duplicate Profiles

The extension now includes logic to check for duplicates before adding a new profile. If you encounter issues, make sure you are on a LinkedIn profile page when adding.

## Contributing

We welcome contributions from the community! If you have suggestions or bug reports, please open an issue or submit a pull request.

### Steps to Contribute

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** and push the branch to your fork.
4. **Open a pull request** detailing your changes.

Thank you for using LinkedUp! If you have any questions or feedback, please reach out to me through the issues page on GitHub.

![LinkedUp Footer](src/assets/icons/128.png)
