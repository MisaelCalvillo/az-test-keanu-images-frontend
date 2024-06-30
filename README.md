# Keanu Reeves Image Retrieval App

<!-- ![CI/CD Status](https://github.com/MisaelCalvillo/az-test-keanu-images-frontend/actions/workflows/main.yml/badge.svg) -->
A dynamic React application that allows users to retrieve and display images of Keanu Reeves based on specified parameters. This project is part of a full-stack coding challenge demonstrating skills in React, TypeScript, Apollo Client, and Material-UI.

## Project Overview

This frontend application works in conjunction with a specific backend service. For full functionality, please ensure you also have the backend set up and running:

Backend Repository: [az-test-keanu-images](https://github.com/MisaelCalvillo/az-test-keanu-images)

The frontend communicates with this backend via GraphQL to fetch and display Keanu Reeves images based on user input.

## Live Demo

The application is currently deployed on Vercel: [Keanu Reeves Image Retriever](https://az-test-keanu-images-app.vercel.app/)

## Features

- Dynamic form generation based on JSON configuration
- Real-time form validation using AJV
- GraphQL integration with Apollo Client
- Responsive design using Material-UI components
- Image retrieval with customizable parameters (width, height, young/old, grayscale/color)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v22.2.0 or later)
- npm (10.8.0 or later)
- Access to the backend service (see [Backend Repository](https://github.com/MisaelCalvillo/az-test-keanu-images))

## Installation and Local Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/MisaelCalvillo/az-test-keanu-images-frontend.git
   cd az-test-keanu-images-frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_API_URL=your_backend_graphql_endpoint
   ```
   Replace `your_backend_graphql_endpoint` with the URL of your GraphQL API from the backend service.

4. Ensure the backend service is running. Refer to the [backend repository](https://github.com/MisaelCalvillo/az-test-keanu-images) for instructions on setting up and running the backend.

5. Start the development server:
   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000`

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `build` folder with optimized production-ready files.

## Deployment

This project is set up for continuous deployment on Vercel. Any pushes to the `main` branch will trigger a new deployment.

### Manual Deployment

If you wish to deploy manually to Vercel:

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Run the deployment command:
   ```
   vercel
   ```

Follow the prompts to complete the deployment process.

## CI/CD

This project uses GitHub Actions for continuous integration and Vercel for continuous deployment.

- **CI**: On every pull request and push to the `main` branch, GitHub Actions runs tests and linting checks.
- **CD**: Successful builds on the `main` branch are automatically deployed to Vercel.

<!-- Current CI/CD Status: ![CI/CD Status](https://github.com/MisaelCalvillo/az-test-keanu-images-frontend/actions/workflows/main.yml/badge.svg) -->

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please open an issue on GitHub or contact the maintainer:

Misael Calvillo Mancilla - [GitHub Profile](https://github.com/MisaelCalvillo)

Project Link: [https://github.com/MisaelCalvillo/az-test-keanu-images-frontend](https://github.com/MisaelCalvillo/az-test-keanu-images-frontend)