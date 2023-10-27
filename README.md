# Gatsby Frontend Website with Tailwind CSS and Sanity CMS Backend

This repository contains the code for a modern web application built with Gatsby, Tailwind CSS, and Sanity CMS. It serves as a foundation for creating fast and customizable websites with a headless CMS backend.

## Prerequisites

Before you start, make sure you have the following prerequisites installed on your system:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/).

## Getting Started

Follow these steps to get the project up and running:

1. Clone the repository to your local machine:
```sh
git clone <repository-url>
```

2. Change into the project directory:
```sh
cd gatsby-tailwind-sanity
```

3. Install the project dependencies using npm:
```sh
npm install
```

4. Configure Sanity CMS:
   - Create a `.env.development` file in the project root and add your Sanity CMS credentials. You can obtain your credentials by signing up at sanity.io.
   - You can also create a .env.production file for production configurations.
```env
  SANITY_PROJECT_ID=your-project-id
  SANITY_DATASET=your-dataset
```

5. Initialize Sanity CMS:
```sh
sanity init
```
6. Start the Gatsby development server:
```sh
npm start
```
7. Open your web browser and access the site at http://localhost:8000.

## Development

- The Gatsby website is located in the `gatsby` directory. You can customize the website by modifying the components, pages, and styles.
- The Sanity CMS setup is located in the `sanity` directory. You can define your content models, manage data, and configure the CMS to your liking.
- You can use Tailwind CSS utility classes to style your components. The project is preconfigured to work with Tailwind CSS.
- To build the website for production, run:
```sh
npm run build
```
- To deploy the website, you can host it on platforms like Netlify, Vercel, or any other hosting service of your choice.


## Contributing

If you would like to contribute to this project, please follow our contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for ## details.

## Acknowledgments

- [Gatsby](https://gatsbyjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Sanity CMS](https://sanity.io)

## Contact

If you have any questions or need assistance, please feel free to contact us at mounishp@proton.me.