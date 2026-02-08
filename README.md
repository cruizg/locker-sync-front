# ClickTV Frontend

## Description
This is a file manager application built with Next.js, designed to provide comprehensive file management features including listing, searching, and adding files. It also includes user authentication and a dashboard for authenticated users, as well as an admin section for managing users and orders.

## Technologies

*   **Framework:** Next.js (v14)
*   **Authentication:** NextAuth.js (v5 beta)
*   **Database/ORM:** Mongoose (Note: Mongoose is typically a backend ORM, its mention here implies interaction with a backend that uses it.)
*   **State Management:** Zustand
*   **Form Handling:** React Hook Form and Zod
*   **HTTP client:** Axios
*   **UI:** Tailwind CSS, @shadcn/ui, lucide-react

## Functionality

*   User authentication with a credentials provider.
*   File management features, including a file list, search, and adding files.
*   A dashboard for authenticated users.
*   Admin section for managing users and orders.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd click-tv-front-end
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or if you prefer Yarn
    # yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variable:

```env
URL_BACKEND=<Your_Backend_API_URL>
# Example: URL_BACKEND=http://localhost:4000/api
```

Make sure to replace `<Your_Backend_API_URL>` with the actual URL of your backend API.

### Running the Development Server

To start the development server:

```bash
npm run dev
# or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production-ready build:

```bash
npm run build
# or yarn build
```

This will compile the application for deployment.

### Running the Production Server

To start the application in production mode (after building):

```bash
npm run start
# or yarn start
```

## Project Structure

Here's a high-level overview of the project's directory structure:

```
.
├── src/
│   ├── actions/          # Server actions for API calls
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration files
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces for data structures
│   ├── lib/              # Utility functions and libraries (e.g., utils.ts)
│   ├── models/           # Mongoose models (if used on frontend for validation/types)
│   ├── store/            # Zustand stores for state management
│   └── utils/            # General utility functions
├── public/               # Static assets (images, fonts, etc.)
├── .env                  # Environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding style and passes all linting checks.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details. (Note: A `LICENSE.md` file needs to be created or specified if different).