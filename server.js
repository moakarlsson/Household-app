import app from "./app.js";
const PORT = process.argv[2] || process.env.PORT || 8000;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err);
    } else{
        console.log(`Server running on port ${PORT}`);
    }
});