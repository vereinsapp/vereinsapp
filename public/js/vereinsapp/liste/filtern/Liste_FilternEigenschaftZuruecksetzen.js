function Liste_FilternEigenschaftZuruecksetzen($filtern_eigenschaft, ziel_id, liste) {
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");

    // Definition von filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = $("#" + ziel_id).attr("data-filtern_prio_niedrig");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();

        filtern_prio_hoch = $("#" + ziel_id).val();
        if (filtern_prio_hoch != "") filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_hoch);
        else filtern_prio_hoch = new Object();
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Änderung von filtern_prio_hoch
    if (eigenschaft in filtern_prio_hoch) delete filtern_prio_hoch[eigenschaft];

    // Überschreiben des value mit geänderten filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch))
            .trigger("change");

    // Aktualisieren der $filtern_eigenschaft
    const filtern_aktualisieren = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
    let filtern_eigenschaft_aktualisieren;
    if (eigenschaft in filtern_aktualisieren) filtern_eigenschaft_aktualisieren = filtern_aktualisieren[eigenschaft];
    else filtern_eigenschaft_aktualisieren = new Object();
    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_eigenschaft_aktualisieren, liste);
}
