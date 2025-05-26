async function cargarMedicamentos() {
    try {
        const response = await fetch('medicamentos.json');
        if (!response.ok) {
            alert('Error cargando lista de medicamentos');
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert('Error al cargar medicamentos: ' + error);
        return null;
    }
}

document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    const medInput = document.getElementById('medicamento').value.toLowerCase().trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const edad = parseInt(document.getElementById('edad').value);

    if (isNaN(peso) || peso <= 0) {
        alert('Por favor ingrese un peso válido.');
        return;
    }

    if (isNaN(edad) || edad < 0) {
        alert('Por favor ingrese una edad válida.');
        return;
    }

    const medicamentos = await cargarMedicamentos();
    if (!medicamentos) return;

    if (!medicamentos.hasOwnProperty(medInput)) {
        alert('Medicamento no reconocido, por favor ingresa uno válido.');
        return;
    }

    const med = medicamentos[medInput];

    /* 
      Ejemplo simple de cómo usar edad en el cálculo:
      Suponemos que a dosis promedio por peso se le aplica un factor según la edad.
      - Si edad < 12 años (niños), dosis se reduce 30%
      - Si edad >= 65 años (adultos mayores), dosis se reduce 20%
      - En otros casos, dosis estándar
      
      Esto es solo un ejemplo. Ajusta la lógica según criterios médicos reales si quieres.
    */

    let factorEdad = 1; // dosis estándar

    if (edad < 12) {
        factorEdad = 0.7; // reduce 30%
    } else if (edad >= 65) {
        factorEdad = 0.8; // reduce 20%
    }

    // Calculamos dosis base como promedio dosis_min y dosis_max por peso
    const dosisBase = ((med.dosis_min + med.dosis_max) / 2) * peso;

    // Ajustamos según factor de edad
    const dosisFinal = dosisBase * factorEdad;

    document.getElementById('resultado').innerText =
        `Medicamento: ${med.nombre}\nEdad: ${edad} años\nPeso: ${peso} kg\nDosis recomendada: ${dosisFinal.toFixed(2)} mg`;
});
