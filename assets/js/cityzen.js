let tablaCityzen = document.querySelector("#mitabla");
let frmCityzen = document.querySelector("#frmCityzen");
let nombreCityzen = document.querySelector("#TxtNombre");
let apellidoCityzen = document.querySelector("#TxtApellido");
let apodoCityzen = document.querySelector("#TxtApodo");
let emailCityzen = document.querySelector("#TxtEmail");
let fechanace = document.querySelector("#TxtFechaNacimiento");
let especieCityzen = document.querySelector(".especie");
let selectEspecies = document.querySelector("#especie");
let idFila = 0;
let accionForm = "";
let btnPagina1 = document.querySelector("#btnPagina1");
let btnPagina2 = document.querySelector("#btnPagina2");
let btnPagina3 = document.querySelector("#btnPagina3");
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let limite = 15;
let pagina = 1;
const frmCrearCityzen = new bootstrap.Modal(document.getElementById("frmCityzen"));
let btnNuevo = document.querySelector("#btnNuevo");
let api = "https://back-fjvz.onrender.com/api/cityzen/";
let APIespecies = "https://back-fjvz.onrender.com/api/especieCiudadano/";
function especies() {
  fetch(APIespecies + "listarEspecies")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.especie.map((especie) => {
        let options =
          `
            <option value="${especie.idespecie_ciudadano}">${especie.nombre}</option>
            ` + "</br>";
        selectEspecies.innerHTML += options;
      });
    });
}
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearCityzen.show();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  tablaCityzen.innerHTML = "";
  listarCityzen();
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  tablaCityzen.innerHTML = "";
  listarCityzen();
});
btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  tablaCityzen.innerHTML = "";
  listarCityzen();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  tablaCityzen.innerHTML = "";
  listarCityzen();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  tablaCityzen.innerHTML = "";
  listarCityzen();
});
if (pagina == 1) {
  btnPagina1.innerText = 1;
  btnPagina2.innerText = 2;
  btnPagina3.innerText = 3;
} else if (pagina == 67) {
  btnPagina1.innerText = 65;
  btnPagina2.innerText = 66;
  btnPagina3.innerText = 67;
} else {
  btnPagina1.innerText = pagina - 1;
  btnPagina2.innerText = pagina;
  btnPagina3.innerText = pagina + 1;
}
li1.setAttribute("class", "page-item");
li2.setAttribute("class", "page-item");
li3.setAttribute("class", "page-item");
if (btnPagina1.innerText == pagina) {
  li1.setAttribute("class", "page-item active");
} else if (btnPagina2.innerText == pagina) {
  li2.setAttribute("class", "page-item active");
} else if (btnPagina3.innerText == pagina) {
  li3.setAttribute("class", "page-item active");
}
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
function listarCityzen() {
  fetch(api + "listarTodos" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      res.cityzen.forEach((cityzen) => {
        let fila =
          ` <tr>
          <td>${cityzen.id}</td>
          <td>${cityzen.nombre}</td>
          <td>${cityzen.apellidos}</td>
          <td>${cityzen.apodo}</td>
          <td>${cityzen.email}</td>
          <td>${cityzen.fechanace.slice(0, 10)}</td>
          <td>${cityzen.especie}</td>
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${
            cityzen.id
          },'editar') "><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" 
          onclick="obtenerID(${cityzen.id},'eliminar')"><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaCityzen.innerHTML += fila;
      });
    });
}
frmCityzen.addEventListener("submit", (e) => {
  e.preventDefault();

  if (accionForm == "agregar") {
    fetch(api + "crearCiudadano", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreCityzen.value,
        apellidos: apellidoCityzen.value,
        email: emailCityzen.value,
        apodo: apodoCityzen.value,
        foto: "",
        fechanace: fechanace.value,
        especie: especieCityzen.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        location.reload();
        console.log(res);
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreCityzen.value,
        apellidos: apellidoCityzen.value,
        email: emailCityzen.value,
        apodo: apodoCityzen.value,
        foto: "",
        fechanace: fechanace.value,
        especie: especieCityzen.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
});
function obtenerID(id, traerAccion) {
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.cityzen.map((cityzen) => {
          nombreCityzen.value = cityzen.nombre;
          apellidoCityzen.value = cityzen.apellidos;
          emailCityzen.value = cityzen.email;
          apodoCityzen.value = cityzen.apodo;
          let fechaDb = new Date(cityzen.fechanace);
          const fechaFormateada = fechaDb.toLocaleDateString("es-CO", {
            timeZone: "UTC"
          });
          fechanace.value = fechaFormateada;
        });
      });
    frmCrearCityzen.show();
  } else if (traerAccion === "eliminar") {
    idFila = id;
    let respuesta = window.confirm(`Seguro que desea borrar el registro con el id: ${idFila}`);
    if (respuesta) {
      fetch(api + "borrarPorId/" + id + "", {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          location.reload();
        });
    }
  }
}
listarCityzen();
especies();
