function Aufgaben_ZugeordneteAufgabenAnzeigen(title) {
    Schnittstelle_DomModalOeffnen(Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgaben_anzeigen_modal"));
    Schnittstelle_EventVariableUpdDom("aufgaben");
}
