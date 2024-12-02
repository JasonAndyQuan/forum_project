
/*
'/posts':  (CRUD)
    - is the homepage
    -> '/posts/:id/
        - an individual text article

// CRUD operations for '/posts'
// POST /posts: Create a new post
// GET /posts: Retrieve all posts
// PUT /posts/:id: Update a post by ID
// DELETE /posts/:id: Delete a post by ID


*/

import { postsPOST, postsGET, postsPUT, postsDELETE } from '../controllers/postsControl.js'
import express from "express";

const postsRouter = express.Router();
postsRouter.get('/',postsGET); //get all posts
postsRouter.post('/', postsPOST); //make a post
postsRouter.put('/:id', postsPUT); //update a post w id
postsRouter.delete('/:id', postsDELETE); //delete a post w id

export default postsRouter;