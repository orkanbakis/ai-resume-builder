# AI Resume Builder - Product Overview

## Summary

A single-session, single-page web app where users input their professional information along with their industry and job level, the AI automatically generates tailored, professional bullet points, users can edit the output, and download a polished PDF resume.

---

## User Flow

```
Enter Info → Select Industry & Job Level → Select Template → Preview (AI-enhanced) → Edit if needed → Download PDF
```

---

## Data Structure

### Personal Details

- Full name
- Email, phone, location
- LinkedIn URL (optional)
- Professional summary (optional, AI can generate)

### Industry & Job Level

- Industry dropdown (Technology, Finance, Healthcare, Marketing, Education, etc.)
- Job level dropdown (Entry-level, Mid-level, Senior, Manager, Executive)
- Used to tailor AI tone, vocabulary, and bullet point complexity

### Work Experience *(max 5, ordered most recent first)*

- Company name
- Job title
- Start/end dates (or "Present")
- Brief description of responsibilities (user input)
- AI-generated bullet points (editable)

### Education *(max 3, ordered most recent first)*

- Institution
- Degree & field of study
- Start/end dates
- Honors/GPA (optional)

### Skills

- Simple tags or comma-separated list

### Optional Sections

- Certifications
- Languages
- Projects

---

## AI Behavior

The AI will:

- Generate 3-5 bullet points per job based on user's brief input
- Adjust language complexity and expectations based on job level (entry-level gets growth-focused language, executive gets strategic/leadership language)
- Use industry-appropriate terminology
- Employ strong action verbs and quantify achievements where possible
- Maintain formal, professional tone throughout

---

## Templates

4 fixed-design, professional minimalist templates:

| Template | Description |
|----------|-------------|
| **Classic** | Single-column, clean serif typography, traditional layout |
| **Modern** | Single-column, sans-serif, subtle accent line |
| **Compact** | Two-column, space-efficient, good for extensive experience |
| **Executive** | Elegant spacing, refined typography, understated sophistication |

No user customization on templates—keeps the experience simple and ensures professional output.

---

## Technical Approach

- **Frontend**: React single-page app

- **AI Integration**: Claude API for content generation
- **PDF Generation**: Client-side (html2pdf.js or react-pdf)
- **Styling**: Tailwind CSS for the UI, custom CSS for resume templates

---

## Future Considerations

- Backend integration for PDF generation
- User accounts and resume saving
- Additional templates
- Cover letter generation
- Job description matching and optimization
