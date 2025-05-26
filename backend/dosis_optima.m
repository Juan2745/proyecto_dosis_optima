function dosis_optima(edad, peso, medicamento)
  % Simulación de cálculo de dosis óptima
  dosis = (peso * 0.1 + edad * 0.05) * rand() + 5;

  archivo = fopen("resultados.txt", "w");
  fprintf(archivo, "La dosis óptima para el medicamento %s es: %.2f mg", medicamento, dosis);
  fclose(archivo);
end
