function Liste_VerknuepfungenInit() {
    // VERKNUEPFUNG ERSTELLEN
    $(document).on("click", ".btn_verknuepfung_erstellen", function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                verknuepfungen: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verknuepfungen"), undefined),
                liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined),
                element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id"), undefined),
                gegen_liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_liste"), undefined),
                gegen_element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_element_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-status"), undefined),
                // bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            }
        );
    });

    // CHECK ÄNDERN
    $(document).on("change", ".chk_verknuepfung_erstellen", function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                verknuepfungen: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verknuepfungen"), undefined),
                liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined),
                element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id"), undefined),
                gegen_liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_liste"), undefined),
                gegen_element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_element_id"), undefined),
                status: Number($(this).is(":checked")),
                // bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            }
        );
    });

    // BEMERKUNG AENDERN
    $(document).on("click", ".btn_verknuepfung_bemerkung_aendern", function () {
        Liste_VerknuepfungBemerkungAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"))
        );
    });
}
