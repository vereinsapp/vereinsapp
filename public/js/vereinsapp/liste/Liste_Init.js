/**
 */

WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION = function ($werkzeug) {
    const werkzeug = Liste_WertBereinigtZurueck($werkzeug.attr("werkzeug"), undefined);

    let farbe;
    if ("farbe" in WERKZEUGE[werkzeug]) farbe = WERKZEUGE[werkzeug].farbe;
    else farbe = "primary";

    if (
        $(
            "#" +
                Liste_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined) +
                "[liste=" +
                Liste_WertBereinigtZurueck($werkzeug.attr("liste"), undefined) +
                "]",
        ).children().length === 0
    )
        $werkzeug.removeClass("text-" + farbe).addClass("text-success");
    else $werkzeug.addClass("text-" + farbe).removeClass("text-success");
};

WERKZEUGE.element_loeschen.aktualisieren_aktion = function ($werkzeug) {
    const liste = Liste_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);
    const werkzeug = Liste_WertBereinigtZurueck($werkzeug.attr("werkzeug"), undefined);

    $werkzeug.attr(
        "modal_title",
        Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_loeschen.modal_title, {
            element1: { liste: liste },
        }),
    );
    $werkzeug
        .find(".beschriftung")
        .html('<i class="bi bi-' + SYMBOLE[WERKZEUGE[werkzeug].symbol]["bootstrap"] + '"></i> ' + LISTEN[liste].element_beschriftung + " löschen");
};

WERKZEUGE.element_loeschen_weiterleiten.aktualisieren_aktion = WERKZEUGE.element_loeschen.aktualisieren_aktion;

function Liste_Init() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.element, function (position, $blanko) {
        const liste = Liste_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Liste_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
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
            Schnittstelle_EventLocalstorageUpdVariable(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_VerknuepfungenZuordnen(liste);
        });

        $.each(LISTEN, function (liste) {
            Liste_ElementErgaenzen(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_EventVariableUpdDom(liste);
        });

        Schnittstelle_EventSqlUpdLocalstorage();
        setInterval(Schnittstelle_EventSqlUpdLocalstorage, AJAX_ZYKLUSZEIT * 1000);
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

    // BEMERKUNG AENDERN
    $(document).on("click", '.werkzeug[werkzeug="bemerkung_aendern"]', function () {
        const liste = Liste_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementBemerkungAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id")),
            liste,
        );
    });

    // ELEMENT LÖSCHEN
    $(document).on("click", '.werkzeug[werkzeug="element_loeschen"], .werkzeug[werkzeug="element_loeschen_weiterleiten"]', function () {
        const liste = Liste_WertBereinigtZurueck($(this).attr("liste"));
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigt"),
            $(this).attr("werkzeug") === "element_loeschen_weiterleiten",
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Liste_WertBereinigtZurueck($(this).attr("modal_title")),
            Liste_WertBereinigtZurueck($(this).attr(LISTEN[liste].element + "_id")),
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
