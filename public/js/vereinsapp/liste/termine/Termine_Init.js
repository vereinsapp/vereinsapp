EIGENSCHAFTEN.termine.kategorie.eingabe_aendern_aktion = function ($kategorie) {
    const $filtern_mitglieder = $kategorie.closest(".formular").find('.eingabe[eingabe="filtern_mitglieder"]');
    if ($kategorie.val() in TERMINE_KATEGORIE_FILTERN_MITGLIEDER) {
        const filtern_basis = Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[$kategorie.val()], new Object());
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

    data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.start)) data.start = data.start.toISO();
    if (isLuxonDateTime(data.ende)) data.ende = data.ende.toISO();
    else data.ende = data.start;
    if ("filtern_mitglieder" in data) data.filtern_mitglieder = JsonStringifiedZurueck(data.filtern_mitglieder, new Object());
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.termine.element_aendern_data_vervollstaendigen_aktion = function (data, termin_id) {
    if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", termin_id, "termine", undefined);
    if (!("start" in data)) data.start = Schnittstelle_VariableRausZurueck("start", termin_id, "termine", undefined);
    if (!("ende" in data)) data.ende = Schnittstelle_VariableRausZurueck("ende", termin_id, "termine", undefined);
    if (!("ort" in data)) data.ort = Schnittstelle_VariableRausZurueck("ort", termin_id, "termine", undefined);
    if (!("kategorie" in data)) data.kategorie = Schnittstelle_VariableRausZurueck("kategorie", termin_id, "termine", undefined);
    if (!("filtern_mitglieder" in data))
        data.filtern_mitglieder = Schnittstelle_VariableRausZurueck("filtern_mitglieder", termin_id, "termine", undefined);
    if (!("oeffentlich_janein" in data))
        data.oeffentlich_janein = Number(Schnittstelle_VariableRausZurueck("oeffentlich_janein", termin_id, "termine", undefined));
    if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", termin_id, "termine", null);

    data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());

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
                Schnittstelle_VariableWertBereinigtZurueck(TERMINE_KATEGORIE_FILTERN_MITGLIEDER[termin.kategorie], new Object()),
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

    termin.ich_rueckgemeldet_janein = false;
    if ("zugeordnete_termine_rueckmeldung_ids" in termin)
        $.each(termin.zugeordnete_termine_rueckmeldung_ids, function (position, rueckmeldung_id) {
            if (Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "termine_rueckmeldungen", undefined) == ICH_ID) {
                termin.ich_rueckgemeldet_janein = true;
                return false;
            }
        });
};

LISTEN.termine_rueckmeldungen.element_ergaenzen_aktion = function (rueckmeldung) {
    if ("termin_id" in rueckmeldung)
        rueckmeldung.termin_start = Schnittstelle_VariableRausZurueck("start", rueckmeldung.termin_id, "termine", undefined);
    if ("termin_id" in rueckmeldung)
        rueckmeldung.termin_titel = Schnittstelle_VariableRausZurueck("titel", rueckmeldung.termin_id, "termine", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", rueckmeldung.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in rueckmeldung)
        rueckmeldung.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", rueckmeldung.mitglied_id, "mitglieder", undefined);
};

LISTEN.termine_anwesenheiten.element_ergaenzen_aktion = function (anwesenheit) {
    if ("termin_id" in anwesenheit)
        anwesenheit.termin_start = Schnittstelle_VariableRausZurueck("start", anwesenheit.termin_id, "termine", undefined);
    if ("termin_id" in anwesenheit)
        anwesenheit.termin_titel = Schnittstelle_VariableRausZurueck("titel", anwesenheit.termin_id, "termine", undefined);
    if ("mitglied_id" in anwesenheit)
        anwesenheit.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", anwesenheit.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in anwesenheit)
        anwesenheit.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", anwesenheit.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.termin_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Termine_Init() {
    // TERMIN ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="termin_erstellen"], .werkzeug[werkzeug="termin_duplizieren"]', function () {
        Liste_ElementErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
            "termine",
        );
    });

    // TERMIN ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="termin_aendern"]', function () {
        Liste_ElementAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
            "termine",
        );
    });

    // RÜCKMELDUNGEN VERWALTEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_rueckmeldungen_verwalten"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_rueckmeldungen_verwalten_modal",
            "termine_rueckmeldungen_verwalten",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "termine_rueckmeldungen",
        );
    });

    // RÜCKMELDUNG ERSTELLEN
    $(document).on("click", '.werkzeug[werkzeug="termine_rueckmeldung_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("status"), undefined),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "termine_rueckmeldungen",
        );
    });

    // ANWESENHEITEN DOKUMENTIEREN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="termine_anwesenheiten_dokumentieren"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "termine_anwesenheiten_dokumentieren_modal",
            "termine_anwesenheiten_dokumentieren",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
            },
            "termine_anwesenheiten",
        );
    });

    // ANWESENHEIT ÄNDERN
    $(document).on("change", '.werkzeug[werkzeug="termine_anwesenheit_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                termin_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("termin_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "termine_anwesenheiten",
        );
    });
}
