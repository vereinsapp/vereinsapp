/**
 */

BLANKOS.element = new Object();
BLANKOS.element.bereitstellen_aktion = function ($blanko) {
    const $liste = $blanko.closest(".liste[id][data-liste]");
    const instanz = $liste.attr("id");
    const liste = $liste.attr("data-liste");
    if (liste in LISTEN && instanz in LISTEN[liste].instanz && !("$blanko_element" in LISTEN[liste].instanz[instanz]))
        LISTEN[liste].instanz[instanz].$blanko_element = $blanko;
};

WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION = function ($werkzeug) {
    if (
        $(
            "#" +
                Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("data-instanz"), undefined) +
                "[data-liste=" +
                Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("data-liste"), undefined) +
                "]",
        ).children().length === 0
    )
        $werkzeug.removeClass("text-primary").addClass("text-success");
    else $werkzeug.addClass("text-primary").removeClass("text-success");
};

function Liste_Init() {
    $.each(LISTEN, function (liste) {
        LISTEN[liste].instanz = new Object();

        $('.liste[data-liste="' + liste + '"]').each(function () {
            const instanz = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("id"), undefined);

            LISTEN[liste].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        });
    });

    Liste_AuswertungenInit(); // initialisiert instanz zu LISTEN[auswertungen].instanz und LISTEN[liste].instanz
    Liste_VerzeichnisInit(); // initialisiert instanz zu LISTEN[verzeichnis].instanz

    Liste_FilternInit(); // initilisiert events
    Liste_SortierenInit(); // initilisiert events
    Liste_GruppierenInit(); // initilisiert events

    if (ICH_ID !== null) {
        Mitglieder_Init(); // initilisiert events
        Aufgaben_Init(); // initilisiert events
        Termine_Init(); // initilisiert events
        Strafkatalog_Init(); // initilisiert events
        Notenbank_Init(); // initilisiert events
    }

    // EINGABE AENDERN (AKTUELL NUR FUR TERMINE.KATEGORIE)
    $(document).on("change", ".eingabe", function () {
        if (
            "eingabe_aendern_aktion" in EIGENSCHAFTEN[$(this).parents("[data-liste]").first().attr("data-liste")][$(this).attr("data-eingabe")] &&
            typeof EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].eingabe_aendern_aktion ===
                "function"
        )
            EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].eingabe_aendern_aktion($(this));
    });

    // BEMERKUNG AENDERN
    $(document).on("click", ".btn_element_bemerkung_aendern", function () {
        const liste = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"));
        Liste_ElementBemerkungAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
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
            {
                [LISTEN[liste].element + "_id"]: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-" + LISTEN[liste].element + "_id")),
                weiterleiten: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-weiterleiten")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title")),
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

    // PASSWORT ANZEIGEN (WIRD HIER INITIALISIERT, DAMIT ES AUCH IM AUSGELOGGTEN ZUSTAND VERFÜGBAR IST)
    $(document).on("click", ".btn_passwort_anzeigen", function (event) {
        const $btn_passwort_anzeigen = $(this);
        event.preventDefault();
        const feld = $btn_passwort_anzeigen.closest(".input-group").find("input.form-control");

        if (feld.attr("type") == "text") {
            feld.attr("type", "password");
            $btn_passwort_anzeigen.find("i").removeClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
            $btn_passwort_anzeigen.find("i").addClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
        } else if (feld.attr("type") == "password") {
            feld.attr("type", "text");
            $btn_passwort_anzeigen.find("i").removeClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
            $btn_passwort_anzeigen.find("i").addClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
        }
    });
}
