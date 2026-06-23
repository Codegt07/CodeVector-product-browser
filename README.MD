# CodeVector Product Browser API

A backend application built with Node.js, Express, and MongoDB that allows users to browse a large product catalog efficiently.

## Features

* Browse 200,000 products
* Newest-first sorting
* Category filtering
* Cursor-based pagination
* Handles new products being added while users browse
* Seed script for generating large datasets

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

## Database Structure

Each product contains:

* productId
* name
* category
* price
* created_at
* updated_at

## API Endpoints

### Get Products

GET /api/products

Query Parameters:

* limit
* category
* cursor

Example:

GET /api/products?limit=20

GET /api/products?category=Electronics&limit=20

GET /api/products?limit=20&cursor=...

## Pagination Strategy

Cursor pagination is used instead of offset/page-number pagination.

Products are sorted by:

* updated_at DESC
* _id DESC

The last product from the current page is returned as a cursor for the next page.

This prevents duplicate or skipped products when new products are inserted while a user is browsing.

## Seed Script

Generate 200,000 products:

cd backend
node scripts/seedProducts.js


## Testing Data Change Scenario

To simulate new products being added while browsing:

node scripts/addTestProducts.js


## Running Locally


### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

## Future Improvements

* Redis caching
* Search functionality
* Advanced filtering
* API rate limiting
* Automated testing


