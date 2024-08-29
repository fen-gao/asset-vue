# Asset Tree View Application

## Overview

This project is an implementation of an Asset Tree View Application that visualizes a company's asset hierarchy. It allows users to explore and filter through a tree structure composed of components, assets, and locations.

## Live Demo

You can view the live application here: [https://asset-vue.vercel.app/](https://asset-vue.vercel.app/)

## Features

- Dynamic tree structure visualization of components, assets, and locations
- Text search functionality to find specific items within the asset hierarchy
- Filters for energy sensors and critical sensor status
- Responsive design for various screen sizes
- Virtual scrolling for improved performance with large datasets

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Axios
- React Window (for virtual scrolling)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/asset-tree-view.git
   cd asset-tree-view
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```
   npm run dev
   ```

   or with yarn:

   ```
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Usage

1. Select a company from the dropdown menu to load its asset tree.
2. Use the search bar to find specific items within the tree.
3. Apply filters to show only energy sensors or items with critical status.
4. Expand and collapse tree nodes to explore the asset hierarchy.

## API Integration

The application uses a demo API with the following endpoints:

- `/companies` - Returns all companies
- `/companies/:companyId/locations` - Returns all locations of the company
- `/companies/:companyId/assets` - Returns all assets of the company

Base URL: `https://fake-api.tractian.com`

## Future Improvements

Given more time, the following aspects of the project could be enhanced:

1. Implement caching mechanisms to improve load times for frequently accessed data.
2. Add more advanced filtering options, such as combining multiple filters.
3. Implement drag-and-drop functionality for reorganizing the asset tree.
4. Add unit and integration tests to ensure reliability and ease of maintenance.
5. Optimize performance further for extremely large datasets.
6. Implement a dark mode theme option for improved user experience in different lighting conditions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
