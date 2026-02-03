/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftZuruecksetzen($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);
    const ziel_id = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-ziel_id"), undefined);

    // Definition von bisherigem filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-filtern_prio_niedrig"), new Object());
        filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), new Object());
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Änderung von filtern_prio_hoch
    if (eigenschaft in filtern_prio_hoch) delete filtern_prio_hoch[eigenschaft];

    // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()))
            .trigger("change");

    // Aktualisieren der $filtern_eigenschaft
    const filtern_aktualisieren = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
    let filtern_eigenschaft_aktualisieren;
    if (eigenschaft in filtern_aktualisieren) filtern_eigenschaft_aktualisieren = filtern_aktualisieren[eigenschaft];
    else filtern_eigenschaft_aktualisieren = new Object();
    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_eigenschaft_aktualisieren, liste);
}
