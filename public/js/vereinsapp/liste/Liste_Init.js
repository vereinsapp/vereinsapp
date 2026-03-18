/**
 */

WERKZEUGE.element_erstellen.aktualisieren_aktion = function ($werkzeug) {
    // GRÜNER PUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find("span.position-absolute").remove();
    if (
        $(
            "#" +
                Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined) +
                "[liste=" +
                Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined) +
                "]",
        )
            .find(".elemente")
            .find(".element").length === 0
    )
        $werkzeug
            .addClass("position-relative")
            .append('<span class="position-absolute bottom-0 end-1 translate-middle p-1 bg-success border border-success rounded-circle">');
};

function Liste_Init() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.element, function (position, $blanko) {
        const liste = Util_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Util_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
        $blanko.removeAttr("liste").removeAttr("instanz");

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
            Liste_EventLocalstorageUpdVariable(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_VerknuepfungenZuordnen(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_ElementErgaenzen(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_EventVariableUpdDom(liste);
        });

        Liste_EventSqlUpdLocalstorage();
        setInterval(Liste_EventSqlUpdLocalstorage, AJAX_ZYKLUSZEIT * 1000);
    }

    // FORMULARE INITIALISIEREN
    $(".formular[liste]").each(function () {
        Liste_Element$FormularInitialisieren($(this));
    });

    // EINGABE AENDERN (AKTUELL NUR FUR TERMINE.KATEGORIE)
    $(document).on("change", ".eingabe", function () {
        if (
            "eingabe_aendern_aktion" in EIGENSCHAFTEN[$(this).parents("[liste]").first().attr("liste")][$(this).attr("eingabe")] &&
            typeof EIGENSCHAFTEN[$(this).closest("[liste]").attr("liste")][$(this).attr("eingabe")].eingabe_aendern_aktion === "function"
        )
            EIGENSCHAFTEN[$(this).closest("[liste]").attr("liste")][$(this).attr("eingabe")].eingabe_aendern_aktion($(this));
    });

    // ELEMENT ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="element_erstellen"], .werkzeug[werkzeug="element_duplizieren"]', function () {
        const liste = Util_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id"), undefined),
            liste,
        );
    });

    // ELEMENT / MEINE DATEN ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="element_aendern"], .werkzeug[werkzeug="meine_daten_aendern"]', function () {
        const liste = Util_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id"), undefined),
            liste,
        );
    });

    // BEMERKUNG AENDERN
    $(document).on("click", '.werkzeug[werkzeug="bemerkung_aendern"]', function () {
        const liste = Util_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementBemerkungAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id")),
            liste,
        );
    });

    // ELEMENT LÖSCHEN
    $(document).on("click", '.werkzeug[werkzeug="element_loeschen"], .werkzeug[werkzeug="element_loeschen_weiterleiten"]', function () {
        const liste = Util_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigt"),
            $(this).attr("werkzeug") === "element_loeschen_weiterleiten",
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id"), undefined),
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
    $(document).on("click", '.werkzeug[werkzeug="passwort_anzeigen"]', function (event) {
        const $werkzeug = $(this);
        event.preventDefault();
        const $eingabe = $werkzeug.closest(".input-group").find("input.form-control"); // .eingabe funktioniert nicht wegen login-View

        if ($eingabe.attr("type") == "text") {
            $eingabe.attr("type", "password");
            $werkzeug.find("i").removeClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
            $werkzeug.find("i").addClass("bi-" + SYMBOLE[WERKZEUGE["passwort_anzeigen"]["symbol"]]["bootstrap"]);
        } else if ($eingabe.attr("type") == "password") {
            $eingabe.attr("type", "text");
            $werkzeug.find("i").removeClass("bi-" + SYMBOLE[WERKZEUGE["passwort_anzeigen"]["symbol"]]["bootstrap"]);
            $werkzeug.find("i").addClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
        }
    });
}
