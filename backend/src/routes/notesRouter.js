import express from 'express'
import Note from '../models/Note';
const router = express.Router();

router.route('/').get(async (req, res) => {
    res.send("You Fetched The Notes");
}).post(async (req, res) => {
    res.send("You Created A Note");
});

router.route('/:id').get((req, res) => {
    res.send("You Fetched The Notes with The Associated ID");
}).put((req, res) => {
    res.send("You Updated The Note with The Associated ID");
}).patch((req, res) => {
    res.send("You Updated The Note with The Associated ID");
}).delete((req, res) => {
    res.send("You Deleted The Note with The Associated ID");
});

router.param('id', (req, res, next, id) => {
    // req.params.id === id 

    next();
})

// module.exports = router
export default router