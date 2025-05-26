document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const edad = document.getElementById("edad").value;
    const peso = document.getElementById("peso").value;
    const medicamento = document.getElementById("medicamento").value;

    const respuesta = await fetch("http://127.0.0.1:5000/calcular", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            edad: parseFloat(edad),
            peso: parseFloat(peso),
            medicamento: medicamento
        })
    });

    const datos = await respuesta.json();
    document.getElementById("resultado").innerText = datos.resultado;
});
