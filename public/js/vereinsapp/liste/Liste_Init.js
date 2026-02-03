/**
 */

function Liste_Init() {
    $.each(LISTEN, function (liste) {
        LISTEN[liste].instanz = new Object();
        $('.liste[data-liste="' + liste + '"]').each(function () {
            LISTEN[liste].instanz[Schnittstelle_VariableWertBereinigtZurueck($(this).attr("id"), undefined)] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        });
    });

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
            EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].change_aktion($(this)); // Aktuell nur für termine.kategorie
    });

    // BEMERKUNG AENDERN
    $(document).on("click", ".btn_element_bemerkung_aendern", function () {
        const liste = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"));
        Liste_ElementBemerkungAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-ziel_id")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-" + LISTEN[liste].element + "_id")),
            liste,
        );
    });

    // ELEMENT LÖSCHEN
    $(document).on("click", ".btn_element_loeschen", function () {
        const liste = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"));
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-title")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-" + LISTEN[liste].element + "_id")),
            liste,
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
    });
}
