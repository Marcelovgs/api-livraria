import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro );
})

conexao.once("open", () => {
console.log ("Conexao com o banco feito com sucesso")
})

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de node.js");
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});


// cadastrar novo livro 
app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("livro cadastrado com sucesso");
});

// substitui o titulo 
app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})
// deleta o livro
app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("livro removido com sucesso");
});

export default app;






// mongodb+srv://admin:<password>@cluster0.hqcjdvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0