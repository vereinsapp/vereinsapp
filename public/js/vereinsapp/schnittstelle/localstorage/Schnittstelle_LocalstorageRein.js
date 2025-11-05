function Schnittstelle_LocalstorageRein(schluessel, wert) {
    localStorage.setItem("vereinsapp_" + schluessel, JsonStringifiedZurueck(wert, undefined));
}
