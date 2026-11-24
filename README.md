# Team Rocket — Digital Graveyard Portal

A static, GitHub Pages-ready portal for **Team Rocket** presenting the **Digital Graveyard** Software Engineering project.

## Portal Pages

- **Overview (`/#/`)**: Project thesis, production specifications (`digitalgraveyard.cv`), and quick navigation.
- **Presentation (`/#/present`)**: Renders the original [`Digital_Graveyard_Final_Demo.pptx`](./Digital_Graveyard_Final_Demo.pptx) directly on HTML5 Canvas with speaker notes, timer, fullscreen mode, slide grid, laser pointer, and `.pptx` download.
- **Project Report (`/#/report`)**: 6-chapter Software Engineering technical report with sticky table of contents, search filter, benchmark/verification tables, BibTeX copy, and Print-to-PDF support.
- **Team (`/#/team`)**: Team Rocket contributor dossiers with roll numbers and GitHub links:
  - **Harshita** (`1024030126`) — [github.com/Harshita445](https://github.com/Harshita445)
  - **Parth Garg** (`1024030136`)
  - **Lakshay Jain** (`1024030143`) — [github.com/helodreamcumtrue](https://github.com/helodreamcumtrue)
  - **Arshdeep Kaur** (`1024030149`) — [github.com/ArshdeepKaur2407](https://github.com/ArshdeepKaur2407)

## Running Locally

```bash
npm install
npm run dev
```

## GitHub Pages Deployment

1. Open repository **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Every push to `main` runs `.github/workflows/deploy.yml`, builds `dist/`, and publishes to GitHub Pages automatically.
