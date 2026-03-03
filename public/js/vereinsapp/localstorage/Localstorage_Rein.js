function Localstorage_Rein(schluessel, wert) {
    localStorage.setItem("vereinsapp_" + schluessel, JsonStringifiedZurueck(wert, undefined));
}
