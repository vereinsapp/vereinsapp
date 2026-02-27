/**
 * @param {JQuery} $filtern_vorgegeben
 * @param {string} filtern_vorgegeben_id
 */

function Liste_$FilternVorgegebenAuswaehlen($filtern_vorgegeben, filtern_vorgegeben_id) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_vorgegeben.attr("data-liste"), undefined);

    if (liste in FILTERN_VORGEGEBEN && filtern_vorgegeben_id in FILTERN_VORGEGEBEN[liste]) {
        const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_vorgegeben);

        // Definition von filtern_manip
        // entfällt, weil filtern_manip komplett überschrieben wird
        const filtern_manip = new Object();
        const filtern_vorgegeben = FILTERN_VORGEGEBEN[liste][filtern_vorgegeben_id].filtern;
        $.each(Object.keys(filtern_vorgegeben), function (position, eigenschaft) {
            if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
                if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
                    filtern_manip[eigenschaft] = filtern_vorgegeben[eigenschaft];
                else
                    Schnittstelle_LogInDieKonsole(
                        "Liste_$FilternVorgegebenAuswaehlen: Eigenschaft " +
                            eigenschaft +
                            " existiert nicht in FILTERBARE_EIGENSCHAFTEN." +
                            liste +
                            "!",
                    );
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_$FilternVorgegebenAuswaehlen: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
                );
        });

        // Überschreiben des bisherigen filtern_manip mit neuem filtern_manip
        $werkzeug.val(JsonStringifiedZurueck(filtern_manip, new Object())).trigger("change");

        // Aktualisieren der $filtern_eigenschaft entfällt, weil Modal direkt geschlossen wird
        Schnittstelle_Dom$ModalSchliessen($filtern_vorgegeben.closest(".modal"));
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$FilternVorgegebenAuswaehlen: Vorgegebener Filter " +
                filtern_vorgegeben_id +
                " existiert nicht in FILTERN_VORGEGEBEN." +
                liste +
                "!",
        );
}
