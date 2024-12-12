// interacciones con la tabla CITYZEN
let tablaUsuarios = document.querySelector("#mitabla");
let usuario = document.querySelector("#TxtUsuario");
let pass = document.querySelector("#TxtPass");
let frmUsuario = document.querySelector("#frmUsuario");
let selectRol = document.querySelector("#rol");
let rol = document.querySelector(".rol");
let btnNuevo = document.querySelector("#btnNuevo");
let accionForm = "";

//// Paginacion de la tabla
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
const frmCrearUsuarios = new bootstrap.Modal(document.getElementById("frmCrearUsuario"));

// LLamamos a nuestrar APIS
let api = "https://interpoliceback.onrender.com/api/usuario/";
let APIroles = "https://interpoliceback.onrender.com/api/roles/";

listarCityzen();
roles();
btnNuevo.addEventListener("click", () => {
  usuario.value = "";
  pass.value = "";
  pass .disabled = false
  accionForm = "agregar";
  frmCrearUsuarios.show();
});
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

frmUsuario.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm === "agregar") {
    fetch(api + "crearUsuario", {
      method: "POST",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: usuario.value,
        pass: pass.value,
        rol_idrol: rol.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    usuario.value = "";
    pass.value = "";
    location.reload();
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: usuario.value,
        pass: pass.value,
        rol_idrol: rol.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});

function listarCityzen() {
  fetch(api + "listarUsuarios" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      res.usuarios.forEach((usuario) => {
        let fila =
          ` <tr>
          <td>${usuario.idusuarios}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.rol}</td>
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${usuario.idusuarios},'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${usuario.idusuarios},'eliminar') "><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaUsuarios.innerHTML += fila;
      });
    });
}
// Metodo de UPDATE Y DELETE
function obtenerID(id, traerAccion) {
  // traemos el ID y la accion correspondiente del los botones Editar y Borrar
  if (traerAccion === "editar") {
    idFila = id;
    pass.disabled = true;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.usuarios.map((usuarios) => {
          usuario.value = usuarios.nombre;
          pass.value = usuarios.password;
        });
      });

    frmCrearUsuarios.show();
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
function roles() {
  fetch(APIroles + "listarRoles")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.roles.map((rol) => {
        let options =
          `
            <option value="${rol.idrol}">${rol.nombre}</option>
            ` + "</br>";

        selectRol.innerHTML += options;
      });
    });
}
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  tablaUsuarios.innerHTML = "";
  listarCityzen();
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  tablaUsuarios.innerHTML = "";
  listarCityzen();
});

btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  tablaUsuarios.innerHTML = "";
  listarCityzen();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  tablaUsuarios.innerHTML = "";
  listarCityzen();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  tablaUsuarios.innerHTML = "";
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
