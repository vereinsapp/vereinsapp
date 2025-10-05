function Aufgaben_ZugeordneteAufgabenAnzeigen(title) {
    Schnittstelle_DomModalOeffnen(Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "zugeordnete_aufgaben_anzeigen"));
    Schnittstelle_EventVariableUpdDom("aufgaben");
}
