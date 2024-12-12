let tablaDelito = document.querySelector("#mitabla");
let frmDelito = document.querySelector("#frmTipoDelito");
let nombreDelito = document.querySelector("#TxtTipoDelito");
let gradoDelito = document.querySelector("#grado");
let selectGrado = document.querySelector(".grado");
let btnNuevo = document.querySelector("#btnNuevo");
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
const frmCrearDelito = new bootstrap.Modal(document.getElementById("frmCrearDelito"));
let api = "https://back-fjvz.onrender.com/api/delito/";
let APIgrado = "https://back-fjvz.onrender.com/api/grado/";
listarDelitos();
grados();
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearDelito.show();
});
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
frmDelito.addEventListener("submit", (e) => {
  e.preventDefault();

  if (accionForm === "agregar") {
    fetch(api + "crearDelito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        delito: nombreDelito.value,
        grado_id: gradoDelito.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        delito: nombreDelito.value,
        grado_id: gradoDelito.value
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
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";

    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.delitos.map((delitos) => {
          nombreDelito.value = delitos.delito;
        });
      });
    frmCrearDelito.show();
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
function grados() {
  fetch(APIgrado + "listarGrados" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      res.grados.map((grados) => {
        let options =
          `
            <option value="${grados.id}">${grados.grado}</option>
            ` + "</br>";

        selectGrado.innerHTML += options;
      });
    });
}
function listarDelitos() {
  fetch(api + "listarTodosDelitos" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      res.delitos.forEach((delitos) => {
        let fila =
          ` <tr>
          <td>${delitos.idtipo_delito}</td>
          <td>${delitos.delito}</td> 
          <td>${delitos.grado}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${delitos.idtipo_delito},'editar')"  ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${delitos.idtipo_delito},'eliminar')" ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";
        tablaDelito.innerHTML += fila;
      });
    });
}
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  tablaDelito.innerHTML = "";
  listarDelitos();
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  tablaDelito.innerHTML = "";
  listarDelitos();
});
btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  tablaDelito.innerHTML = "";
  listarDelitos();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  tablaDelito.innerHTML = "";
  listarDelitos();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  tablaDelito.innerHTML = "";
  listarDelitos();
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
