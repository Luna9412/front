// interacciones con la tabla aprendiz
let tablaEspecie = document.querySelector("#mitabla");
let frmEspecie = document.querySelector("#frmEspecie");
let nombreEspecie = document.querySelector("#nombreEspecie");
let btnNuevo = document.querySelector("#btnNuevo");
let accionForm = "";


// Paginacion de la tabla
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

//Llmamos el metodo de modal de boostrap
const frmCrearEspecie = new bootstrap.Modal(document.getElementById("frmCrearEspecie"));


let api = "https://interpoliceback.onrender.com/api/especieCiudadano/";

btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearEspecie.show();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  tablaEspecie.innerHTML = "";
  listarEspecie();
});

btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  tablaEspecie.innerHTML = "";
  listarEspecie();
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

function listarEspecie() {
  fetch(api + "listarTodasEspecies" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      res.especie.forEach((especie) => {
        let fila =
          ` <tr>
          <td>${especie.idespecie_ciudadano}</td>
          <td>${especie.nombre}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${especie.idespecie_ciudadano},'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${especie.idespecie_ciudadano},'eliminar') "  ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaEspecie.innerHTML += fila;
      });
    });
}

frmEspecie.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm == "agregar") {
    fetch(api + "crearEspecie", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreEspecie: nombreEspecie.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarEspeciePorId/" + idFila + "", {
      method: "PUT",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreEspecie: nombreEspecie.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});
function obtenerID(id, traerAccion) {
  // traemos el ID y la accion correspondiente del los botones Editar y Borrar
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.especie.map((especie) => {
          nombreEspecie.value = especie.nombre;
        });
      });
    frmCrearEspecie.show();
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
listarEspecie();
