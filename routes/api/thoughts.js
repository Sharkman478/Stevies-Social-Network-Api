const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/thoughtController');

router.get('/api/thoughts', ThoughtController.getAllThoughts);

router.get('/api/thoughts/:id', ThoughtController.getThoughtById);

router.post('/api/thoughts', ThoughtController.createThought);

router.put('/api/thoughts/:id', ThoughtController.updateThought);

router.delete('/api/thoughts/:id', ThoughtController.deleteThought);

router.post('/api/thoughts/:thoughtId/reactions', ThoughtController.createReaction);

router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', ThoughtController.removeReaction);

module.exports = router;