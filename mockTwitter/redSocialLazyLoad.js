"use strict";
let publicaciones=document.getElementById("publications");
let contador=0;
let mensaje=document.createElement("DIV");
mensaje.classList.add("mensaje");

const verifyVisibility = publi => {
    if (publi[0].isIntersecting) {
        traerPublicaciones(4);
    }
}
/* CREAR PUBLICACIÓN */
const crearPublicacion=(nombre, contenido, imagen)=> {

    let publicacionUnica=document.createElement("DIV");
    let cabeceroPublicacion=document.createElement("DIV");
    let imagenPerfil=document.createElement("IMG")
    let nombreUsuario=document.createElement("H3");
    let texto=document.createElement("P");
    let cajaComentario=document.createElement("DIV");
    let comentario=document.createElement("input");
    let boton=document.createElement("input");

    cabeceroPublicacion.classList.add("cabecero");
    imagenPerfil.classList.add("imagenPerfil");
    publicacionUnica.classList.add("publicacionUnica");
    nombreUsuario.classList.add("nombreUsuario");
    texto.classList.add("texto");
    cajaComentario.classList.add("cajaComentario");
    comentario.classList.add("comentario");
    boton.classList.add("boton");
    comentario.setAttribute("placeholder","Deja un comentario...");
    boton.type="submit";

    nombreUsuario.textContent=nombre;
    texto.textContent=contenido;
    imagenPerfil.setAttribute("src",imagen);

    cajaComentario.appendChild(comentario);
    cajaComentario.appendChild(boton);
    cabeceroPublicacion.appendChild(imagenPerfil);
    cabeceroPublicacion.appendChild(nombreUsuario);
    publicacionUnica.appendChild(cabeceroPublicacion);
    publicacionUnica.appendChild(texto);
    publicacionUnica.appendChild(cajaComentario);

    return publicacionUnica;
};
/* INVOCAR PUBLICACIONES */
const traerPublicaciones= async num=> {
    let request = await fetch("publicaciones.txt");
    let arr = await request.json();
    let publicacion=arr.content;
    const observer=new IntersectionObserver(verifyVisibility);
    const fragment=document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (publicacion[contador]==undefined) {
            fragment.appendChild(mensaje);
            mensaje.textContent="No hay más publicaciones";
            break;
        } else {
            let post=crearPublicacion(publicacion[contador].nombre, publicacion[contador].contenido, publicacion[contador].imageURL);
            fragment.appendChild(post);
            contador++;
            if (i==num-1) {
                observer.observe(post);
            }
        }
    }
    publicaciones.appendChild(fragment);
}
traerPublicaciones(4);

/* Hacer el section interactuar con el ratón */

let derecha=document.querySelectorAll(".section");



for (let i = 0; i < derecha.length; i++) {
    derecha[i].style.backgroundColor="#F5F8FA";
    derecha[i].addEventListener("mouseover", ()=> {
        derecha[i].style.backgroundColor="#E1E8ED";
        })
    derecha[i].addEventListener("mouseleave", ()=> {
        derecha[i].style.backgroundColor="#F5F8FA";
        })
}