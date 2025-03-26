EVENT_VARIABLE_UPD_DOM_MODULE = new Array();

function Schnittstelle_EventVariableUpdDom(folgendes_event, data) {
    let liste;
    if ("liste" in data && data.liste in LISTEN) liste = data.liste;

    // LISTE AKTUALISIEREN
    $('.liste[data-liste="' + liste + '"]').each(function () {
        Liste_Aktualisieren($(this), liste);
    });

    // ELEMENT AKTUALISIEREN
    $('.element[data-liste="' + liste + '"]').each(function () {
        Liste_ElementAktualisieren($(this), liste);
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[data-liste="' + liste + '"]').each(function () {
        const $ueberschrift = $(this);
        const instanz = $ueberschrift.attr("data-instanz");
        if ($("#" + instanz + ".liste").children().length === 0) $ueberschrift.addClass("invisible");
        else $ueberschrift.removeClass("invisible");
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[data-liste="' + liste + '"]').each(function () {
        const $werkzeug = $(this);
        const instanz = $werkzeug.attr("data-instanz");
        if ($werkzeug.hasClass("btn_filtern_modal_oeffnen"))
            $werkzeug
                .attr("data-filtern_prio_niedrig", $("#" + instanz + ".liste").attr("data-filtern"))
                .val(JsonStringifiedZurueck(LISTEN[liste].instanz[instanz].filtern));
        else if ($werkzeug.hasClass("btn_sortieren_modal_oeffnen"))
            $werkzeug
                .attr("data-sortieren_prio_niedrig", $("#" + instanz + ".liste").attr("data-sortieren"))
                .val(JsonStringifiedZurueck(LISTEN[liste].instanz[instanz].sortieren));
        else if ($werkzeug.hasClass("btn_gruppieren_modal_oeffnen"))
            $werkzeug
                .attr("data-gruppieren_prio_niedrig", $("#" + instanz + ".liste").attr("data-gruppieren"))
                .val(JsonStringifiedZurueck(LISTEN[liste].instanz[instanz].gruppieren));
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[data-liste="' + liste + '"]').each(function () {
        const $listenstatistik = $(this);
        const $listenstatistik_sammler = $(this).closest(".listenstatistik_sammler");
        const instanz = $listenstatistik.attr("data-instanz");
        const $liste = $("#" + instanz + ".liste");

        if ($liste.children().length === 0) $listenstatistik_sammler.addClass("invisible");
        else {
            $listenstatistik_sammler.removeClass("invisible");

            switch ($listenstatistik.attr("data-listenstatistik")) {
                case "anzahl": {
                    $listenstatistik.text($liste.children().length);
                    break;
                }
                case "angewaehlt": {
                    $listenstatistik.text($liste.find(".check:checked").length);
                    break;
                }
                case "summe": {
                    const eigenschaft = $listenstatistik.attr("data-eigenschaft");
                    if (typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                        let summe = 0;
                        $liste.children().each(function () {
                            summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr("data-element_id"), liste));
                        });
                        $listenstatistik.text(Liste_WertFormatiertZurueck(summe, eigenschaft, liste));
                    }
                    break;
                }
                case "durchschnitt": {
                    const eigenschaft = $listenstatistik.attr("data-eigenschaft");
                    if (typeof instanz !== "undefined" && typeof eigenschaft !== "undefined" && EIGENSCHAFTEN[liste][eigenschaft].typ == "zahl") {
                        let summe = 0;
                        $liste.children().each(function () {
                            summe += Number(Schnittstelle_VariableRausZurueck(eigenschaft, $(this).attr("data-element_id"), liste));
                        });
                        $listenstatistik.text(Liste_WertFormatiertZurueck(summe / $liste.children().length, eigenschaft, liste));
                    }
                }
            }
        }
    });

    // AUSWERTUNGEN AKTUALISIEREN
    $('.auswertungen[data-auswertungen="' + liste + '"], .auswertungen[data-liste*=\'"' + liste + "\"']").each(function () {
        if ($(this).attr("data-auswertungen") == liste) Liste_AuswertungenAktualisieren($(this), liste);
        else Liste_AuswertungenAktualisieren($(this), $(this).attr("data-auswertungen"));
    });

    // AUSWERTUNG AKTUALISIEREN
    $('.auswertung[data-auswertungen="' + liste + '"], .auswertung[data-liste="' + liste + '"]').each(function () {
        if ($(this).attr("data-auswertungen") == liste) Liste_AuswertungAktualisieren($(this), liste);
        else Liste_AuswertungAktualisieren($(this), $(this).attr("data-auswertungen"));
    });

    // VERZEICHNIS AKTUALISIEREN
    $('.verzeichnis[data-liste="' + liste + '"]').each(function () {
        Liste_VerzeichnisAktualisieren($(this), liste);
    });

    // DATEI AKTUALISIEREN
    $('.datei[data-liste="' + liste + '"]').each(function () {
        Liste_DateiAktualisieren($(this), liste);
    });

    // SPEZIAL AKTUALISIEREN
    $.each(EVENT_VARIABLE_UPD_DOM_MODULE[liste], function () {
        this();
    });

    $(".jetzt").each(function () {
        Schnittstelle_JetztAktualisieren($(this));
    });

    if (typeof folgendes_event === "function" || (isArray(folgendes_event) && folgendes_event.length > 0))
        Schnittstelle_EventAusfuehren(folgendes_event, data);

    if ("abhaengig_von" in LISTEN[liste])
        $.each(LISTEN[liste].abhaengig_von, function (prio, liste) {
            Schnittstelle_EventAusfuehren(Schnittstelle_EventVariableUpdDom, { liste: liste });
        });
}
