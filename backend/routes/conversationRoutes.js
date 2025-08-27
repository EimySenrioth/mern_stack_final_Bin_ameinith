import express from 'express';
import Conversation from '../models/Conversation.js';

const router = express.Router();

//Aqui guardo una nueva conversación
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    const conversation = new Conversation({ messages });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la conversación' });
  }
});

// Obtener todas las conversaciones, es decir las recupero
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las conversaciones' });
  }
});

export default router;