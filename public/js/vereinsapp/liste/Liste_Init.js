function Liste_Init() {
    $.each(LISTEN, function (liste) {
        LISTEN[liste].instanz = new Object();
        $('.liste[data-liste="' + liste + '"]').each(function () {
            const instanz = $(this).attr("id");
            LISTEN[liste].instanz[instanz] = { filtern: new Object(), sortieren: undefined };
        });
    });

    Liste_ChecklisteInit();

    Liste_AuswertungenInit();

    Liste_VerzeichnisInit();

    Liste_FilternInit();

    Liste_SortierenInit();

    Liste_GruppierenInit();

    $(document).on("change", ".eingabe", function () {
        if (
            "change_aktion" in EIGENSCHAFTEN[$(this).parents("[data-liste]").first().attr("data-liste")][$(this).attr("data-eingabe")] &&
            typeof EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].change_aktion === "function"
        )
            EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].change_aktion($(this));
    });

    // ELEMENT LÖSCHEN
    $(document).on("click", ".btn_element_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"))
        );
    });

    // BEMERKUNG AENDERN
    $(document).on("click", ".btn_bemerkung_aendern", function () {
        Liste_ElementBemerkungAendern(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"))
        );
    });

    // SORTABLE
    $(".sortable").sortable({
        handle: ".sortable_handle",
        start: function (event, ui) {
            ui.item.addClass("border-top border-primary shadow");
        },
        stop: function (event, ui) {
            ui.item.removeClass("border-top border-primary shadow");
        },
        update: function () {
            $("#sortable_speichern").attr("disabled", false);
        },
    });
}
