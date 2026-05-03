# Front Matter Publishing Guide
## Creating Journal Entries with VS Code Extension

This guide shows you how to create and publish journal entries using the Front Matter VS Code extension with your Astro site.

---

## Prerequisites

1. **Install Front Matter Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Front Matter CMS"
   - Install by `estruyf` (official extension)

2. **Verify Site Structure**
   - Your journal entries live in `src/content/journal/`
   - Front Matter is configured in `frontmatter.json`
   - Content collections are defined in `src/content.config.ts`

---

## Quick Start: Creating Your First Article

### Step 1: Open Front Matter Panel
1. Open your project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Front Matter" and select "Front Matter: Open Panel"
4. The panel will appear on the left side

### Step 2: Create New Journal Entry
1. In the Front Matter panel, click **"New content"**
2. Select **"Journal Entry"** from the content type dropdown
3. Click **"Create"**

### Step 3: Fill in Article Metadata
Complete all required fields in the Front Matter panel:

#### Required Fields
- **Slug**: URL-friendly identifier (e.g., `my-new-article`)
- **Title**: Full article title (e.g., "My Amazing Adventure")
- **Excerpt**: Short description (appears in previews)
- **Category**: Choose from:
  - `Destination` - Trip reports and location guides
  - `Field Notes` - Observations and experiences  
  - `Gear Review` - Equipment reviews and tests
- **Tags**: Keywords separated by commas (e.g., `hiking, oregon, summer`)
- **Date**: Publication date (defaults to today)
- **Hero Image**: Main article image
- **Image Alt Text**: Description for accessibility
- **Read Time**: Estimated reading time in minutes

#### Optional Fields
- **Author**: Defaults to "freedomland" (change if needed)

#### ⚠️ Important: Field Validation
**Only use the fields listed above.** Adding extra fields will cause build errors because your site has a strict content schema. Do NOT add fields like:
- `description` (use `excerpt` instead)
- `preview` (use `image` instead)
- Any other custom fields

### Step 4: Write Your Article Content
1. After filling metadata, click **"Save & Open"**
2. Write your article in Markdown format below the frontmatter
3. Use standard Markdown syntax:
   ```markdown
   ## Heading 2
   ### Heading 3
   
   **Bold text** and *italic text*
   
   - Bullet point 1
   - Bullet point 2
   
   1. Numbered list
   2. Another item
   
   ![Image description](/assets/images/your-photo.jpg)
   
   > Blockquote for emphasis
   ```

### Step 5: Preview Your Article
1. Save the file (`Ctrl+S` or `Cmd+S`)
2. Start development server: `npm run dev`
3. Open `http://localhost:4321/journal/your-slug/`
4. Review how it looks and make adjustments

### Step 6: Publish Your Article
1. **Test your build first**:
   ```bash
   npm run build
   ```
   If the build succeeds, you're ready to publish!

2. Commit your changes to git:
   ```bash
   git add src/content/journal/your-article.md
   git commit -m "Add new journal entry: Your Article Title"
   ```
3. Build and deploy:
   ```bash
   npm run build
   ```
4. Deploy the `dist/` folder to your hosting provider

---

## ⚠️ Troubleshooting Common Issues

### Build Errors: Invalid Content Entry Data

**Error**: `data does not match collection schema`

**Causes & Solutions**:

1. **Extra Fields in Frontmatter**
   - **Problem**: Added fields like `description`, `preview`, etc.
   - **Solution**: Remove any fields not listed in the required section above
   - **Prevention**: Only use fields available in the Front Matter panel

2. **Malformed YAML**
   - **Problem**: Line breaks, indentation, or quoting issues
   - **Solution**: Check YAML formatting (see best practices below)
   - **Prevention**: Let Front Matter handle formatting when possible

3. **Date Format Issues**
   - **Problem**: Date not recognized as valid date string
   - **Solution**: Use YYYY-MM-DD format, quote it: `date: "2026-04-16"`
   - **Prevention**: Use Front Matter's date picker or the default `{{now}}`

### YAML Formatting Best Practices

**Always Do**:
- Use proper indentation (2 spaces for nested items)
- Quote dates and complex strings: `date: "2026-04-16"`
- Keep each field on its own line
- Use consistent spacing around colons: `field: value`

**Never Do**:
- Add fields not in the schema
- Let lines wrap without proper breaks
- Mix tabs and spaces for indentation
- Use special characters without quotes

**Example of Correct Frontmatter**:
```yaml
---
slug: my-article-title
title: "My Amazing Adventure"
excerpt: "A short description of my adventure"
category: Field Notes
tags:
  - Hiking
  - Oregon
  - Summer
author: freedomland
date: "2026-04-16"
image: /assets/images/my-photo.jpg
imageAlt: Description of the image
readMinutes: 5
---
```

### Images Not Loading

**Check**:
- Image paths start with `/assets/images/`
- Files exist in `public/assets/images/`
- Alt text is provided
- Build completes without errors

### Article Not Appearing

**Check**:
- Run `npm run build` to sync content
- Verify file is in `src/content/journal/`
- Check that slug is unique
- Ensure date is in correct format

---

## Best Practices for Your Astro Site

### Content Organization
- **Keep images in** `public/assets/images/`
- **Use descriptive slugs** (lowercase, hyphens only)
- **Write compelling excerpts** (150-200 characters ideal)
- **Tag consistently** (check existing articles for tag patterns)

### SEO and Metadata
- **Include relevant keywords** in titles and excerpts
- **All images must have alt text** for accessibility
- **Use proper heading structure** (H2, H3, etc.)
- **Internal links** use absolute paths: `/journal/other-article/`

### Image Guidelines
- **Hero images** should be high-quality and landscape-oriented
- **Store images** in `public/assets/images/` organized by topic
- **Reference images** with absolute paths: `/assets/images/gear/yeti-bottle.jpg`
- **Optimize images** before adding (WebP format recommended)

### Content Types
1. **Destination Articles**
   - Location details, directions, what to expect
   - Include practical information (permits, seasons, difficulty)
   - Add photos of the location

2. **Field Notes**
   - Personal experiences and observations
   - Lessons learned or insights
   - Can be more informal in tone

3. **Gear Reviews**
   - Include specs, pros/cons, price
   - Real-world testing results
   - Comparison to alternatives if relevant

---

## Advanced Features

### Custom Front Matter Fields
Your site supports these additional fields if needed:
- `author`: Override default "freedomland"
- `readMinutes`: Manually set reading time

### Content Validation
Your site automatically validates:
- Required fields are present
- Categories match allowed choices
- Dates are in correct format
- Image paths are accessible

### Build Process
When you run `npm run build`, the site automatically:
1. Syncs Markdown frontmatter to `src/data/posts.ts`
2. Generates JavaScript files for the browser
3. Builds all pages including your new article

---

## Troubleshooting

### Common Issues

**Article not appearing on journal listing page?**
- Check that the `date` field is in YYYY-MM-DD format
- Verify the file is in `src/content/journal/`
- Run `npm run build` to regenerate data files

**Images not loading?**
- Ensure image paths start with `/assets/images/`
- Check that files exist in `public/assets/images/`
- Verify alt text is provided

**Build errors?**
- Check frontmatter syntax (YAML requires proper indentation)
- Ensure all required fields are present
- Verify category matches one of the three choices

**Front Matter panel not showing?**
- Restart VS Code after installing extension
- Verify `frontmatter.json` exists in project root
- Check that your workspace folder is the project root

### Getting Help
1. Check the browser console for errors during development
2. Review the build output for any warnings
3. Verify your Markdown syntax in a validator if needed

---

## Workflow Summary

1. **Create**: Use Front Matter panel to create new entry
2. **Write**: Add content in Markdown format
3. **Preview**: Test locally with `npm run dev`
4. **Build**: Run `npm run build` to verify everything works
5. **Deploy**: Push to your hosting provider

Your site is now fully optimized for the Front Matter workflow, making it easy to create and manage journal entries independently!
