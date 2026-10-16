// Marca el documento como "con JavaScript" antes del primer pintado.
// Si script.js no llega a ejecutarse, se retira la clase para no dejar contenido oculto.
document.documentElement.classList.add('js');
setTimeout(function () {
    if (!window.__ldmgReady) document.documentElement.classList.remove('js');
}, 4000);
