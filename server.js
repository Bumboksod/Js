const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Przechowywanie danych w pamięci (dla uproszczenia)
let users = []; // { id, username, password }
let posts = [
    { id: 1, title: 'Post 1', content: 'To jest przykładowy post.' },
    { id: 2, title: 'Post 2', content: 'Kolejny post na naszej stronie.' }
];

// Rejestracja użytkownika
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Wymagane pola: username i password.' });
    }
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'Użytkownik już istnieje.' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: 'Rejestracja udana.', user: newUser });
});

// Logowanie użytkownika
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Nieprawidłowe dane logowania.' });
    }
    res.json({ message: 'Zalogowano pomyślnie.', user });
});

// Pobieranie postów
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Dodawanie nowego posta
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Wymagane pola: title i content.' });
    }
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
