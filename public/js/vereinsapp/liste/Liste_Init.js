/**
 */

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
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.element, function (position, $blanko) {
        const liste = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("data-liste"), undefined);
        const instanz = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("data-instanz"), undefined);
        $blanko.removeAttr("data-liste").removeAttr("data-instanz");

        if (!("instanz" in LISTEN[liste])) LISTEN[liste].instanz = new Object();
        if (!(instanz in LISTEN[liste].instanz))
            LISTEN[liste].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        LISTEN[liste].instanz[instanz].$blanko_element = $blanko;
    });

    Liste_AuswertungenInit();
    Liste_VerzeichnisInit();

    Liste_FilternInit();
    Liste_SortierenInit();
    Liste_GruppierenInit();

    if (ICH_ID !== null) {
        Mitglieder_Init();
        Aufgaben_Init();
        Termine_Init();
        Strafkatalog_Init();
        Notenbank_Init();
    }

    if (ICH_ID !== null) {
        $.each(LISTEN, function (liste) {
            Schnittstelle_EventLocalstorageUpdVariable(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_VariableElementZuordnen(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_VariableElementErgaenzen(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_EventVariableUpdDom(liste);
        });

        Schnittstelle_EventSqlUpdLocalstorage();
        setInterval(Schnittstelle_EventSqlUpdLocalstorage, AJAX_ZYKLUSZEIT * 1000);
    }

    // FORMULARE INITIALISIEREN
    $(".formular[data-liste]").each(function () {
        Liste_Element$FormularInitialisieren($(this));
    });

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
