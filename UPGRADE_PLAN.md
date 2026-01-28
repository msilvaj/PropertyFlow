# Rails Upgrade Strategy: 5.2 to 7.0

## 📊 Feasibility Analysis
**Is it too hard?**
Moderate difficulty. The codebase structure is clean, which helps. The main challenges are the **Asset Pipeline** (Sass/Bootstrap) and the **AdminLTE theme** gem.

**Time Estimate**:
*   **Total**: ~15-20 hours of work for a complete modernization.
*   **MVP Upgrade (Rails 6.0 + Ruby 2.7)**: ~4-6 hours.

## 🛣️ Recommended Roadmap

We should NOT jump straight to Rails 8 or 7.1. We must go stepwise.

### Phase 1: prep & Rails 6.0 (Goal: Stability)
*   **Ruby**: Upgrade to 2.7.x (last version compatible with older Rails).
*   **Rails**: Upgrade 5.2 -> 6.0.
*   **Tasks**:
    *   Enable `zeitwerk` autoloader (strict naming conventions).
    *   Update `Gemfile` to `gem 'rails', '~> 6.0'`.
    *   Run `rails app:update`.
    *   Fix `bootstrap-sass` (likely replace with `bootstrap` gem ~> 4.x or keep legacy mode).

### Phase 2: Rails 6.1 & Ruby 3.0 (Goal: Modern Ruby)
*   **Ruby**: Upgrade to 3.0 (Breaking changes in keyword args).
*   **Rails**: Upgrade 6.0 -> 6.1.
*   **Tasks**:
    *   Update strict gem dependencies.
    *   Fix any keyword argument issues in the code.

### Phase 3: Rails 7.0 & Ruby 3.2 (Goal: Current Standard)
*   **Ruby**: Upgrade to 3.2.
*   **Rails**: Upgrade 6.1 -> 7.0.
*   **Tasks**:
    *   Remove `webpacker` (if added) in favor of `importmaps` or `jsbundling`.
    *   Replace `sass-rails` with `cssbundling-rails` (optional but recommended).
    *   Evaluate `adminlte2-rails`. If dead, manually copy assets to `vendor/assets`.

## ⚠️ Key Risks / Blockers

1.  **`adminlte2-rails` Gem**:
    *   Last updated years ago. It might not support Rails 6/7.
    *   **Solution**: Download the AdminLTE CSS/JS files and put them in `vendor/assets`, deleting the gem.

2.  **`bootstrap-sass`**:
    *   Deprecated.
    *   **Solution**: Migrating to `bootstrap` gem (Bootstrap 4) is usually safe but requires checking CSS class names.

3.  **Ruby 3.0 Keyword Assignments**:
    *   Ruby 3 changed how methods accept arguments.
    *   **Solution**: Automated tools (Rubocop) can help find these issues.
