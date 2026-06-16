/**
 */

SERVERDATA_HOLEN_EVENTS.push(function (AJAX) {
    if (isObject(AJAX) && "antwort" in AJAX && isObject(AJAX.antwort)) {
        if ("liste" in AJAX.antwort && isObject(AJAX.antwort.liste))
            $.each(AJAX.antwort.liste, function (liste, serverdata) {
                Localstorage_Rein(liste + "_tabelle", serverdata.tabelle);
            });

        if ("verknuepfungen" in AJAX.antwort && isObject(AJAX.antwort.verknuepfungen))
            $.each(AJAX.antwort.verknuepfungen, function (verknuepfungen, serverdata) {
                Localstorage_Rein(verknuepfungen + "_tabelle", serverdata.tabelle);
                // Localstorage_Rein(verknuepfungen + "_verknuepfung_ids_nach_liste", serverdata.verknuepfung_ids_nach_liste);
            });
    }
});

SERVERDATA_BEREITSTELLEN_EVENTS.push(function () {
    $.each(VERKNUEPFUNGEN, function (verknuepfungen) {
        Liste_EventVerknuepfungenBereitstellen(verknuepfungen);
    });

    $.each(LISTEN, function (liste) {
        Liste_EventListenBereitstellen(liste);
    });

    $.each(LISTEN, function (liste) {
        Liste_ElementWertErgaenzen(liste);
    });
});

DOM_AKTUALISIEREN_EVENTS.push(function () {
    $.each(LISTEN, function (liste) {
        Liste_EventDomAktualisieren(liste);
    });
});

WERKZEUGE.bearbeiten_modus_ein_ausschalten.aktualisieren_aktion = function ($werkzeug) {
    // GRÜNER HINWEISPUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find(".hinweispunkt").remove();
    if (
        LISTEN[Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined)].instanz[Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined)]
            .bearbeiten_modus !== false
    )
        $werkzeug.addClass("position-relative").append(Dom_$HinweispunktInitialisiertZurueck("success"));
};

WERKZEUGE.element_erstellen.aktualisieren_aktion = function ($werkzeug) {
    // GRÜNER HINWEISPUNKT AKTUALISIEREN
    $werkzeug.removeClass("position-relative").find(".hinweispunkt").remove();
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
        $werkzeug.addClass("position-relative").append(Dom_$HinweispunktInitialisiertZurueck("success"));
};

ZUSATZSYMBOLE.bemerkung = new Object();
ZUSATZSYMBOLE.bemerkung.aktualisieren_aktion = function ($zusatzsymbol, $container) {
    $zusatzsymbol
        .popover("dispose")
        .addClass("text-primary")
        .attr("role", "button")
        .attr("data-bs-container", ".element")
        .attr("data-bs-toggle", "popover")
        .attr("data-bs-trigger", "focus")
        .attr("tabindex", 0)
        .attr("data-bs-placement", "left");

    let bemerkung = "";
    if ($container.hasClass("element")) {
        const $element = $container;
        const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);

        bemerkung = Liste_ElementWertRausZurueck(
            "bemerkung",
            Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined),
            liste,
            null,
        );
    } else if ($container.hasClass("verknuepfung_bemerkung_symbol")) {
        const $verknuepfung_bemerkung_symbol = $container;
        const verknuepfungen = Util_WertBereinigtZurueck($verknuepfung_bemerkung_symbol.attr("verknuepfungen"), undefined);

        bemerkung = Liste_VerknuepfungWertRausZurueck(
            "bemerkung",
            Util_WertBereinigtZurueck($verknuepfung_bemerkung_symbol.attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"), undefined),
            verknuepfungen,
            null,
        );
    }
    if (bemerkung !== null) $zusatzsymbol.removeClass("invisible").attr("data-bs-content", bemerkung);
    else $zusatzsymbol.addClass("invisible").removeAttr("data-bs-content");

    [...$zusatzsymbol].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
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
                bearbeiten_modus: false,
            };
        LISTEN[liste].instanz[instanz].$blanko_element = $blanko;
    });

    Liste_VerknuepfungenInit();
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
        $.each(VERKNUEPFUNGEN, function (verknuepfungen) {
            Liste_EventVerknuepfungenBereitstellen(verknuepfungen);
        });

        $.each(LISTEN, function (liste) {
            Liste_EventListenBereitstellen(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_ElementWertErgaenzen(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_EventDomAktualisieren(liste);
        });
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

    // BEARBEITEN-MODUS EIN-/AUSSCHALTEN
    $(document).on("click", '.werkzeug[werkzeug="bearbeiten_modus_ein_ausschalten"]', function () {
        Liste_BearbeitenModusEinAusschalten(Util_WertBereinigtZurueck($(this).attr("instanz")), Util_WertBereinigtZurueck($(this).attr("liste")));
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

    // ELEMENT LÖSCHEN
    $(document).on("click", '.werkzeug[werkzeug="element_loeschen"], .werkzeug[werkzeug="element_loeschen_weiterleiten"]', function () {
        const liste = Util_WertBereinigtZurueck($(this).attr("liste"), undefined);
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
        handle: '.werkzeug[werkzeug="verknuepfung_status_aendern"]',
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
            $werkzeug.find("i").removeClass("bi-" + SYMBOLE.sichtbar);
            $werkzeug.find("i").addClass("bi-" + SYMBOLE[WERKZEUGE["passwort_anzeigen"].symbol]);
        } else if ($eingabe.attr("type") == "password") {
            $eingabe.attr("type", "text");
            $werkzeug.find("i").removeClass("bi-" + SYMBOLE[WERKZEUGE["passwort_anzeigen"].symbol]);
            $werkzeug.find("i").addClass("bi-" + SYMBOLE.sichtbar);
        }
    });
}
