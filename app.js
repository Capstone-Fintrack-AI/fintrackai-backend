import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"


const app = express();

// Router
import AuthRouter from './routes/authRoute.js';
import PemasukanRouter from './routes/pemasukanRoute.js';
import pengeluaranRoute from './routes/pengeluaranRoute.js';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
    methods : ["GET", "POST", "PUT", "DELETE"],
    origin : "*"
}));

// configure router
app.use('/auth', AuthRouter);
app.use('/pemasukan', PemasukanRouter);
app.use('/pengeluaran', pengeluaranRoute);

app.get("/", (req, res) => {
  res.send("Backend Fintrack AI berhasil berjalan 🚀");
});
app.listen(8080, () => {
    console.log("Server running on port 8080")
})