/**
 */

SERVERDATA_HOLEN_EVENTS.push(Liste_EventServerdata);

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

ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION = function ($zusatzsymbol, $element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);

    const verknuepfungen = Util_WertBereinigtZurueck($zusatzsymbol.attr("zusatzsymbol"), undefined);
    const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
    const verknuepfte_element_ids = new Object();
    $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
        const verknuepfte_element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[verknuepfte_liste].element + "_id"), undefined);
        if (typeof verknuepfte_element_id !== "undefined")
            verknuepfte_element_ids[LISTEN[verknuepfte_liste].element + "_id"] = verknuepfte_element_id;
    });
    verknuepfte_element_ids[LISTEN[liste].element + "_id"] = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    let verknuepfung_id = undefined;
    $.each(
        Liste_VariableRausZurueck(
            "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids",
            verknuepfte_element_ids[LISTEN[verknuepfte_listen[0]].element + "_id"],
            verknuepfte_listen[0],
            new Array(),
        ),
        function (position, zugeordnete_verknuepfung_id) {
            if (
                Liste_VariableRausZurueck(LISTEN[verknuepfte_listen[1]].element + "_id", zugeordnete_verknuepfung_id, verknuepfungen, undefined) ===
                verknuepfte_element_ids[LISTEN[verknuepfte_listen[1]].element + "_id"]
            )
                verknuepfung_id = zugeordnete_verknuepfung_id;
        },
    );

    let verknuepfung_status = Liste_VariableRausZurueck("status", verknuepfung_id, verknuepfungen, 0);
    if (verknuepfung_status > 0 && !(verknuepfung_status in VERKNUEPFUNGEN[verknuepfungen].status_erlaubt)) verknuepfung_status = 1;

    if (typeof verknuepfung_status !== "undefined")
        $zusatzsymbol
            .removeClass("text-primary")
            .addClass("text-" + VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].farbe)
            .html(VERKNUEPFUNGEN[verknuepfungen].status_erlaubt[verknuepfung_status].aktiv);
};

ZUSATZSYMBOLE.bemerkung = new Object();
ZUSATZSYMBOLE.bemerkung.aktualisieren_aktion = function ($zusatzsymbol, $element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);

    $zusatzsymbol
        .popover("dispose")
        .addClass("text-primary")
        .attr("role", "button")
        .attr("data-bs-container", ".element")
        .attr("data-bs-toggle", "popover")
        .attr("data-bs-trigger", "focus")
        .attr("tabindex", 0)
        .attr("data-bs-placement", "right");

    const bemerkung = Liste_VariableRausZurueck(
        "bemerkung",
        Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined),
        liste,
        null,
    );
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
                bearbeiten_modus: undefined,
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
        handle: '.werkzeug[werkzeug="sortable"]',
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
