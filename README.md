# Employee Management Dashboard

A React + TypeScript application for managing employee data with support for inline editing, sorting, searching, pagination, and virtual scrolling for large datasets.

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Material UI
- TanStack Table
- TanStack Virtual
- Faker.js

## Setup

```bash
npm install
npm run dev
```

Build the project:

```bash
npm run build
```

## Features

- Inline editing
- Sorting
- Global search
- Virtual scrolling
- Pagination
- CSV export
- Redux state management
- Unsaved changes warning

## Approach

- Used **TanStack Table** for sorting, filtering and pagination.
- Used **TanStack Virtual** to efficiently render large datasets.
- Managed application state using **Redux Toolkit**.
- Split the application into reusable components to keep the code modular and maintainable.

## Known Limitations

- Filtering is implemented as a global search.
- Data is generated locally using Faker and is not persisted.
- Pagination is client-side.
