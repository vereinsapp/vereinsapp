/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftZuruecksetzen($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_manip
            const filtern_manip = Schnittstelle_VariableWertBereinigtZurueck($werkzeug.val(), new Object());
            if (!(eigenschaft in filtern_manip)) filtern_manip[eigenschaft] = new Object();

            // Ändern von filtern_manip
            delete filtern_manip[eigenschaft];

            // Überschreiben des bisherigen filtern_manip mit geändertem filtern_manip
            $werkzeug.val(JsonStringifiedZurueck(filtern_manip, new Object())).trigger("change");

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
