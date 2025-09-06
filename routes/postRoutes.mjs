import express from 'express';
import { posts } from '../data/post.mjs'

const router = express.Router();
// @route GET /api/posts
// @desc Get all posts
// @access Public
router
    .route("/")
    .get((req, res) => {
        res.json(posts);
    })
    .post((req, res) => {
        const { userId, title, content } = req.body; // grabbing data the client entered through req.body
        let id = posts[posts.length - 1].id + 1; // creating a new id
        // let id = posts.length++;
        // creating a new object that will be pushed to the posts array
        if (userId && title && content) {
            const post = {
                id: id,
                userId: userId,
                title: title,
                content: content,
            };
            posts.push(post);
            res.json(posts[posts.length - 1]);
        } else {
            res.json({ error: "Insufficient Data" });
        }
    });

// @route GET /api/users/:id
// @desc Get ONE user
// @access Public
router
    .route("/:id")
    .get((req, res, next) => {
        const post = posts.find((p) => p.id == req.params.id);

        if (post) res.json(post)
        else next();
    })
    .patch((req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        const post = posts.find((post, i) => {
            if (post.id == id) {
                for (const item in data) {
                    posts[i][item] = data[item];
                }
                return true;
            }
        })
        if (post) {
            res.json(post)
        } else next();
    })
    .delete((req, res, next) => {
        const id = req.params.id;
        const post = posts.find((post, i) => {
            if (post.id == id) {
                posts.splice(i, 1)
                return true;
            }
        });
        if (post) {
            res.json(posts);
        } else next();
    });
export default router;