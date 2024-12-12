let tablaHistorial = document.querySelector("#mitabla");
let idCityzen = document.getElementById("idCityzen");
let api = "https://back-fjvz.onrender.com/api/historial/";
idCityzen.addEventListener("keyup", () => {
  let id = document.querySelector("#idCityzen").value;
  let api = "https://back-fjvz.onrender.com/api/historial/";
  function listarHistorial() {
    fetch(api + "historialCityzen/" + id + "")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res.historiales.forEach((historial) => {
          let fila =
            `
            <tr>
            <td>${historial.id}</td>
            <td>${historial.nombre}${historial.apellidos}</td>   
            <td>${historial.apodo}</td>
            <td>${historial.delito}</td>
            <td> ${historial.grado}</td>
            <td style="text-align: justify;">${historial.descripcion}</td>
            </tr> ` + "</br>";
          tablaHistorial.innerHTML = fila;
        });
      });
  }
  listarHistorial();
});
