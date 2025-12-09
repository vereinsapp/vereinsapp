function Liste_ElementAktualisieren($element, liste) {
    const element_id = Number($element.attr("data-element_id"));
    const gegen_liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_liste"), undefined);
    const gegen_element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_element_id"), undefined);

    // ELEMENTE DISABLED
    let disabled = false;
    const disabled_data = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-disabled"), new Object());
    if (isObject(disabled_data.filtern) && disabled_data.liste in LISTEN) {
        $.each(Liste_TabelleGefiltertZurueck(LISTEN[disabled_data.liste].tabelle, disabled_data.filtern, disabled_data.liste), function () {
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
    const bedingte_formatierung = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-bedingte_formatierung"), new Object());

    if (!("liste" in bedingte_formatierung)) bedingte_formatierung.liste = liste;

    let $dom_bedingt_formatiert;
    if ("eigenschaft" in bedingte_formatierung)
        $dom_bedingt_formatiert = $element.find('.eigenschaft[data-eigenschaft="' + bedingte_formatierung.eigenschaft + '"]');
    else $dom_bedingt_formatiert = $element.find(".beschriftung");

    if ("klasse" in bedingte_formatierung)
        $.each(bedingte_formatierung.klasse, function (klasse, filtern) {
            const filtern_ergaenzung = new Object();
            if (typeof gegen_liste !== "undefined" && typeof gegen_element_id !== "undefined") {
                filtern_ergaenzung[LISTEN[gegen_liste].element + "_id"] = { inklusiv: [gegen_element_id] };
                filtern_ergaenzung[LISTEN[liste].element + "_id"] = { inklusiv: [element_id] };
            } else filtern_ergaenzung.id = { inklusiv: [element_id] };

            if (
                Liste_TabelleGefiltertZurueck(
                    LISTEN[bedingte_formatierung.liste].tabelle,
                    Liste_FilternMitPrioKombiniertZurueck(filtern, filtern_ergaenzung, bedingte_formatierung.liste),
                    bedingte_formatierung.liste
                ).length > 0
            )
                $dom_bedingt_formatiert.addClass(klasse);
            else $dom_bedingt_formatiert.removeClass(klasse);
        });

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");
        $eigenschaft.html(
            Liste_WertFormatiertZurueck(Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste)
        );
    });

    // CHECK AKTUALISIEREN
    $element.find(".check").each(function () {
        Liste_CheckAktualisieren($(this), disabled, element_id, liste);
    });

    // VERKNUEPFUNGEN_AUSWAHLMOEGLICHKEITEN AKTUALISIEREN
    $element.find(".verknuepfungen_auswahlmoeglichkeiten").each(function () {
        Liste_VerknuepfungAktualisieren($(this), liste, element_id, gegen_liste, gegen_element_id, $(this).attr("data-verknuepfungen"));
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
    const $vorschau_eigenschaften = $element.find(".vorschau").children(".eigenschaft");
    $vorschau_eigenschaften.each(function (position) {
        const $eigenschaft = $(this);
        let $zugehoeriger_spacer;
        if (position == $vorschau_eigenschaften.length - 1) $zugehoeriger_spacer = $eigenschaft.prev();
        else $zugehoeriger_spacer = $eigenschaft.next();
        if (isEmptyString($eigenschaft.text())) {
            $eigenschaft.addClass("invisible");
            $zugehoeriger_spacer.addClass("invisible");
        } else {
            $eigenschaft.removeClass("invisible");
            $zugehoeriger_spacer.removeClass("invisible");
        }
    });

    // NAVIGATION AKTUALISIEREN
    $element.find(".element_navigation").each(function () {
        Liste_ElementNavigationAktualisieren($(this), $element, liste);
    });
}
