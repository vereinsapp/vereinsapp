/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftZuruecksetzen($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $filtern_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_prio_hoch
            const filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($filtern_prio.val(), new Object());
            if (!(eigenschaft in filtern_prio_hoch)) filtern_prio_hoch[eigenschaft] = new Object();

            // Ändern von filtern_prio_hoch
            delete filtern_prio_hoch[eigenschaft];

            // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
            $filtern_prio.val(JsonStringifiedZurueck(filtern_prio_hoch, new Object())).trigger("change");

            // Aktualisieren der $filtern_eigenschaft
            Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternEigenschaftZuruecksetzen: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$FilternEigenschaftZuruecksetzen: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
