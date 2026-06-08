EIGENSCHAFTEN.termine.kategorie.eingabe_aendern_aktion = function ($kategorie) {
    const $filtern_mitglieder = $kategorie.closest(".formular").find('.eingabe[eingabe="filtern_mitglieder"]');
    if ($kategorie.val() in TERMINE_KATEGORIE_FILTERN_MITGLIEDER) {
        const filtern_basis = Util_WertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[$kategorie.val()], new Object());
        const filtern_manip = new Object();
        $.each(Object.keys(filtern_basis), function (position, eigenschaft) {
            if ("termine" in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN.termine.includes(eigenschaft))
                filtern_manip[eigenschaft] = filtern_basis[eigenschaft];
        });

        $filtern_mitglieder
            .attr("filtern_basis", JsonStringifiedZurueck(filtern_basis, new Object()))
            .val(JsonStringifiedZurueck(filtern_manip, new Object()));
    } else $filtern_mitglieder.removeAttr("filtern_basis").val("");
};

LISTEN.termine.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    if (typeof data.filtern_mitglieder === "undefined" || ("filtern_mitglieder" in data && isEmptyString(data.filtern_mitglieder)))
        data.filtern_mitglieder = new Object();

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.start)) data.start = data.start.toISO();
    if (isLuxonDateTime(data.ende)) data.ende = data.ende.toISO();
    else data.ende = data.start;
    if ("filtern_mitglieder" in data) data.filtern_mitglieder = JsonStringifiedZurueck(data.filtern_mitglieder, new Object());
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.termine.element_aendern_data_vervollstaendigen_aktion = function (data, termin_id) {
    if (!("titel" in data)) data.titel = Liste_ElementWertRausZurueck("titel", termin_id, "termine", undefined);
    if (!("start" in data)) data.start = Liste_ElementWertRausZurueck("start", termin_id, "termine", undefined);
    if (!("ende" in data)) data.ende = Liste_ElementWertRausZurueck("ende", termin_id, "termine", undefined);
    if (!("ort" in data)) data.ort = Liste_ElementWertRausZurueck("ort", termin_id, "termine", undefined);
    if (!("kategorie" in data)) data.kategorie = Liste_ElementWertRausZurueck("kategorie", termin_id, "termine", undefined);
    if (!("filtern_mitglieder" in data))
        data.filtern_mitglieder = Liste_ElementWertRausZurueck("filtern_mitglieder", termin_id, "termine", undefined);
    if (!("oeffentlich_janein" in data))
        data.oeffentlich_janein = Number(Liste_ElementWertRausZurueck("oeffentlich_janein", termin_id, "termine", undefined));
    if (!("bemerkung" in data)) data.bemerkung = Liste_ElementWertRausZurueck("bemerkung", termin_id, "termine", null);

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.start)) data.start = data.start.toISO();
    if (isLuxonDateTime(data.ende)) data.ende = data.ende.toISO();
    else data.ende = data.start;
    if ("filtern_mitglieder" in data) data.filtern_mitglieder = JsonStringifiedZurueck(data.filtern_mitglieder, new Object());
    if (isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.termine.element_ergaenzen_aktion = function (termin) {
    termin.mitglied_ids_eingeladen = new Array();
    $.each(
        Liste_TabelleGefiltertZurueck(
            LISTEN.mitglieder.tabelle,
            Liste_FilternManipuliertZurueck(
                Util_WertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin.kategorie], new Object()),
                termin.filtern_mitglieder,
                "mitglieder",
            ),
            "mitglieder",
        ),
        function () {
            termin.mitglied_ids_eingeladen.push(this.id);
        },
    );
    termin.ich_eingeladen_janein = termin.mitglied_ids_eingeladen.includes(ICH_ID);

    termin.mitglied_ids_rueckgemeldet = new Array();
    $.each(
        Liste_VerknuepfungIdsNachListeZurueck(Number(termin.id), "termine", "termine_rueckmeldungen", new Array()),
        function (position, rueckmeldung_id) {
            termin.mitglied_ids_rueckgemeldet.push(
                Liste_VerknuepfungWertRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined),
            );
        },
    );
    termin.ich_rueckgemeldet_janein = termin.mitglied_ids_rueckgemeldet.includes(ICH_ID);
};

VERKNUEPFUNGEN.termine_rueckmeldungen.verknuepfung_nicht_moeglich_eigenschaft = function ($element) {
    return !Liste_ElementWertRausZurueck(
        "mitglied_ids_eingeladen",
        Util_WertBereinigtZurueck($element.attr("termin_id"), undefined),
        "termine",
        new Array(),
    ).includes(Util_WertBereinigtZurueck($element.attr("mitglied_id"), undefined));
};

VERKNUEPFUNGEN.termine_rueckmeldungen.verknuepfung_nicht_moeglich_frist = function ($element) {
    return (
        Liste_ElementWertRausZurueck("start", Util_WertBereinigtZurueck($element.attr("termin_id"), undefined), "termine", undefined) <
        DATETIME.now().plus({ seconds: TERMINE_RUECKMELDUNGEN_FRIST })
    );
};

ZUSATZSYMBOLE.termine_rueckmeldungen = new Object();
ZUSATZSYMBOLE.termine_rueckmeldungen.aktualisieren_aktion = ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION;

ZUSATZSYMBOLE.termine_anwesenheiten = new Object();
ZUSATZSYMBOLE.termine_anwesenheiten.aktualisieren_aktion = ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION;

ZUSATZSYMBOLE.kategorie = new Object();
ZUSATZSYMBOLE.kategorie.aktualisieren_aktion = function ($zusatzsymbol, $element) {
    const kategorie = Liste_ElementWertRausZurueck(
        "kategorie",
        Util_WertBereinigtZurueck($element.attr("termin_id"), undefined),
        "termine",
        undefined,
    );
    if (kategorie in TERMINE_KATEGORIE_STATUSSYMBOLE) $zusatzsymbol.html(TERMINE_KATEGORIE_STATUSSYMBOLE[kategorie]);
    else $zusatzsymbol.empty();
};

function Termine_Init() {
    // RÜCKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_rueckmeldungen_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_rueckmeldungen_verwalten_modal",
            "termine_rueckmeldungen_verwalten",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "termine_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.werkzeug[werkzeug="termine_rueckmeldung_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $element: $(this).closest(".element") },
            {
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Util_WertBereinigtZurueck($(this).attr("status"), undefined),
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "termine_rueckmeldungen",
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_anwesenheiten_dokumentieren"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_anwesenheiten_dokumentieren_modal",
            "termine_anwesenheiten_dokumentieren",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "termine_anwesenheiten",
        );
    });

    // ANWESENHEIT ÄNDERN
    $(document).on("change", '.werkzeug[werkzeug="termine_anwesenheit_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $element: $(this).closest(".element") },
            {
                termin_id: Util_WertBereinigtZurueck($(this).attr("termin_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "termine_anwesenheiten",
        );
    });
}
