# Front-end Developer Portfolio

A responsive single-page portfolio built with plain HTML, CSS and JavaScript from a Figma design (header, hero, projects, recommendations slider, contact form, partner logos and footer).

## How to open

No build step. Double-click `index.html` to open it in a browser.
To serve it locally instead:

```
python -m http.server 5500
```

then visit http://localhost:5500.

## Folder structure

```
index.html          page markup (personal details block at the top)
css/style.css       all styles, organised by section, with design tokens in :root
js/main.js          menu, scroll spy, recommendations slider, form validation
assets/images/      logo, hero illustration, project images, avatars, footer logos and badges, icons
assets/reference/   full-page design screenshot used for comparison (not used on the site)
```

## Libraries (loaded from a CDN)

- jQuery 3.7.1
- Slick Carousel 1.8.1 (recommendations slider)
- Inter font from Google Fonts

## Where to edit your details

- Open `index.html`. The comment block at the top lists the name, role and contact details.
- Update the matching text in the page: the hero heading (`#hero-title`), the page `<title>`, and the three cards in the `#contact` section.
- Project cards live in `#projects` and recommendations in `#recommendations`. Swap the images in `assets/images/`.

## Notes

- The contact form validates the name and email, shows a short confirmation and resets. Nothing is stored (no localStorage, sessionStorage, cookies) or sent anywhere.
- The design has no Skills or Education section, so those two menu links scroll to Projects.
