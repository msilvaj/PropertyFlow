# Docker Commands & Troubleshooting Guide

## 🐳 Docker Commands Used

Here are the key commands used to build and run the application:

### 1. Build and Start
```bash
docker-compose up --build
```
*   **What it does**: Builds the images (defined in `docker-compose.yml` and `Dockerfile`) and starts the containers.
*   **Flags**: 
    *   `--build`: Forces a rebuild of the images (important when `Dockerfile` changes).
    *   `-d` (optional): "Detached" mode - runs in the background.

### 2. Database Setup
```bash
docker-compose exec web bundle exec rails db:create db:migrate
```
*   **What it does**: Runs Rails database commands *inside* the running container.
*   **Breakdown**:
    *   `exec web`: Execute a command inside the service named `web`.
    *   `bundle exec`: Ensures the command runs with the exact gem versions.
    *   `rails db:create`: Creates the PostgreSQL database.
    *   `rails db:migrate`: Runs migrations to set up schema.

### 3. One-off Command (for debugging/updating gems)
```bash
docker run --rm -v "$(pwd):/app" -w /app ruby:2.6.1 bash -c "gem install bundler:2.1.4 && bundle update mimemagic"
```
*   **What it does**: Spins up a temporary container to run a specific command (like updating the lockfile) without starting the whole app.
*   **Flags**:
    *   `--rm`: Removes the container after it exits.
    *   `-v`: Volumes - maps current directory to `/app`.

---

## 💎 Gem Dependency Fixes

We encountered issues with specific gems due to the age of the project (2019).

### 1. `mimemagic` (Licensing Issue)
*   **Issue**: Version `0.3.3` was removed (yanked) from RubyGems due to a licensing conflict.
*   **Fix**: Upgraded to `0.3.10` and added required dependencies.
*   **Command**:
    ```bash
    bundle update mimemagic
    ```
*   **Manual Fix in Gemfile.lock**:
    ```text
    mimemagic (0.3.10)
      nokogiri (~> 1)
      rake
    ```

### 2. `bootstrap-sass` (Dependency Issue)
*   **Issue**: Failed to install because it required `sass` but it wasn't explicitly locked in the dependency tree for Bundler.
*   **Fix**: Manually added `sass` dependency in `Gemfile.lock`.
*   **Manual Fix in Gemfile.lock**:
    ```text
    bootstrap-sass (3.3.7)
      autoprefixer-rails (>= 5.2.1)
      sass (>= 3.3.4)  <-- Added this line
    ```

### 3. `tzinfo-data` (Platform Issue)
*   **Issue**: Warning about `tzinfo-data` being ignored.
*   **Context**: This gem is only needed for Windows but was in the Linux bundle.
*   **Fix**: Ignored (harmless warning on Linux).
