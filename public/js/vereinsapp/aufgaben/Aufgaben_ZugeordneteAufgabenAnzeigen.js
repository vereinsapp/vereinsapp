function Aufgaben_ZugeordneteAufgabenAnzeigen(title) {
    Schnittstelle_DomModalOeffnen(Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "zugeordnete_aufgaben_anzeigen"));
    Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: "aufgaben" });
}
