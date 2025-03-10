function Liste_ElementAktualisieren($element, liste) {
    const element_id = Number($element.attr("data-element_id"));

    // ELEMENTE DISABLED
    let disabled = false;
    let disabled_data = $element.attr("data-disabled");
    if (typeof disabled_data !== "undefined") {
        disabled_data = JSON.parse(disabled_data);
        $.each(Liste_TabelleGefiltertZurueck(disabled_data.filtern, LISTEN[disabled_data.liste].tabelle, disabled_data.liste), function () {
            const element = this;
            if ("id" in element && element.id == element_id) {
                disabled = true;
                return;
            }
        });
    }

    // ACTION UND ROLE FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    if ($element.find(".check").exists() || $element.find("a.stretched-link").exists() || $element.is("[class*=btn_]")) {
        $element.addClass("list-group-item-action");
        $element.attr("role", "button");
    }

    // ELEMENT DISABLED FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    if (disabled) {
        $element.removeClass("list-group-item-action");
        $element.removeAttr("role");
        $element.find(".beschriftung").addClass("text-secondary");
        $element.find("a.stretched-link").removeAttr("href");
    } else $element.find(".beschriftung").removeClass("text-secondary");

    // ELEMENT BEDINGT FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    const gegen_liste = $element.attr("data-gegen_liste");
    const gegen_element_id = $element.attr("data-gegen_element_id");

    let bedingte_formatierung = $element.attr("data-bedingte_formatierung");
    if (typeof bedingte_formatierung !== "undefined") bedingte_formatierung = JSON.parse(bedingte_formatierung);
    else bedingte_formatierung = new Object();

    if (!("liste" in bedingte_formatierung)) bedingte_formatierung.liste = liste;

    if ("eigenschaft" in bedingte_formatierung)
        bedingte_formatierung.$ziel = $element.find('.eigenschaft[data-eigenschaft="' + bedingte_formatierung.eigenschaft + '"');
    else bedingte_formatierung.$ziel = $element.find(".beschriftung");

    if ("klasse" in bedingte_formatierung)
        $.each(bedingte_formatierung.klasse, function (klasse, filtern) {
            const filtern_ergaenzung = new Object();
            if (typeof gegen_liste !== "undefined" && typeof gegen_element_id !== "undefined") {
                filtern_ergaenzung[LISTEN[gegen_liste].element + "_id"] = { inklusiv: [Number(gegen_element_id)] };
                filtern_ergaenzung[LISTEN[liste].element + "_id"] = { inklusiv: [element_id] };
            } else filtern_ergaenzung.id = { inklusiv: [element_id] };

            if (
                Liste_TabelleGefiltertZurueck(
                    Liste_FilternMitPrioKombiniertZurueck(filtern, filtern_ergaenzung, bedingte_formatierung.liste),
                    LISTEN[bedingte_formatierung.liste].tabelle,
                    bedingte_formatierung.liste
                ).length > 0
            )
                bedingte_formatierung.$ziel.addClass(klasse);
            else bedingte_formatierung.$ziel.removeClass(klasse);
        });

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");
        const wert = Schnittstelle_VariableRausZurueck(eigenschaft, Number($element.attr("data-element_id")), liste);
        $eigenschaft.html(Liste_WertFormatiertZurueck(wert, eigenschaft, liste));
    });

    // CHECK AKTUALISIEREN
    $element.find(".check").each(function () {
        Liste_CheckAktualisieren($(this), element_id, disabled, liste);
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").attr("href", SITE_URL + LISTEN[liste].controller + "/" + element_id);

    // WERKZEUGKASTEN AKTUALISIEREN
    $element.find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]').attr("data-liste", liste).attr("data-element_id", element_id);

    // ZUSATZSYMBOL AKTUALISIEREN
    $element.find(".zusatzsymbol").each(function () {
        Liste_ElementZusatzsymbolAktualisieren($(this), $element);
    });

    // ZUSATZINFO AKTUALISIEREN
    $element.find(".zusatzinfo").each(function () {
        Liste_ElementZusatzinfoAktualisieren($(this), $element);
    });

    // VORSCHAU-EIGENSCHAFT UND ZUGEHÖRIGEN SPACER IN DER VORSCHAU AUSBLENDEN
    $element
        .find(".vorschau")
        .children(".eigenschaft")
        .each(function () {
            const $eigenschaft = $(this);
            const $vorheriger_spacer = $eigenschaft.prev();
            if ($eigenschaft.text().trim() == "") {
                $eigenschaft.addClass("invisible");
                $vorheriger_spacer.addClass("invisible");
            } else {
                $eigenschaft.removeClass("invisible");
                $vorheriger_spacer.removeClass("invisible");
            }
        });

    // NAVIGATION AKTUALISIEREN
    $element.find(".element_navigation").each(function () {
        Liste_ElementNavigationAktualisieren($(this), $element, liste);
    });
}
