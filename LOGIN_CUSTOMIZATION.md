# Login Page Customization Guide

This guide explains how to modify the design and layout of the Login page in **PropertyFlow**.

## 1. Key Files

To customize the login page, you need to edit two main files:

### A. The HTML Structure (View)
**File**: `app/views/devise/sessions/new.html.erb`

*   **Location**: `app/views/devise/sessions/new.html.erb`
*   **Purpose**: Contains the HTML elements (forms, inputs, buttons, headings).
*   **What to change**: 
    *   Change the "Login" text (`<h1 style="color:blue">Login</h1>`).
    *   Add logos or images.
    *   Reorder input fields.

### B. The Styles (CSS)
**File**: `app/assets/stylesheets/custom.scss`

*   **Location**: `app/assets/stylesheets/custom.scss`
*   **Key Classes**:
    *   `.login-wrap`: The main container for the login box.
    *   `.login-html`: The inner wrapper.
    *   `.group`, `.label`, `.input`: Styles for form elements.
*   **Purpose**: Controls colors, spacing, fonts, and responsiveness.

---

## 2. Common Customizations

### Changing the Background Color
1.  Open `app/assets/stylesheets/custom.scss`.
2.  Search for `.login-wrap`.
3.  Change `background: ...` to your desired color (e.g., `#ffffff` for white, or a gradient).

### Adding a Logo
1.  Place your logo image in `app/assets/images/logo.png`.
2.  Open `app/views/devise/sessions/new.html.erb`.
3.  Add this code where you want the logo to appear (e.g., above `<h1>Login</h1>`):
    ```erb
    <%= image_tag "logo.png", alt: "PropertyFlow Logo", class: "login-logo" %>
    ```
4.  Add a `.login-logo` class to `custom.scss` to style it (width, margin, etc).

### Changing Texts
1.  Open `app/views/devise/sessions/new.html.erb`.
2.  Locate the text "Login" or "Entrar".
3.  Replace it with your preferred text (e.g., "Bem-vindo", "Acessar Sistema").

## 3. Applying Changes
After making changes, if you are running the app with Docker:
1.  Save the files.
2.  Refresh the browser page. 
    *   *Note: Rails in development mode usually reloads views automatically. If CSS doesn't update, try hard-refreshing (Ctrl+F5) or restarting the container.*
