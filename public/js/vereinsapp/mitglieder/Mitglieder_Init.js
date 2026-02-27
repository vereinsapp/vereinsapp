LISTEN.vergebene_rechte.element_zuordnen_aktion = function (vergebenes_recht) {
    const vergebenes_recht_id = vergebenes_recht.id;

    if ("verfuegbare_rechte" in LISTEN) {
        const verfuegbares_recht_id = Schnittstelle_VariableRausZurueck("verfuegbares_recht_id", vergebenes_recht_id, "vergebene_rechte", undefined);

        if (typeof verfuegbares_recht_id !== "undefined") {
            const verfuegbares_recht = LISTEN.verfuegbare_rechte.tabelle[verfuegbares_recht_id];

            if (typeof verfuegbares_recht !== "undefined") {
                if (!("zugeordnete_vergebenes_recht_ids" in verfuegbares_recht))
                    LISTEN.verfuegbare_rechte.tabelle[verfuegbares_recht_id].zugeordnete_vergebenes_recht_ids = [vergebenes_recht_id];
                else if (!verfuegbares_recht.zugeordnete_vergebenes_recht_ids.includes(vergebenes_recht_id))
                    LISTEN.verfuegbare_rechte.tabelle[verfuegbares_recht_id].zugeordnete_vergebenes_recht_ids.push(vergebenes_recht_id);
            }
        }
    }

    if ("mitglieder" in LISTEN) {
        const mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", vergebenes_recht_id, "vergebene_rechte", undefined);

        if (typeof mitglied_id !== "undefined") {
            const mitglied = LISTEN.mitglieder.tabelle[mitglied_id];

            if (typeof mitglied !== "undefined") {
                if (!("zugeordnete_vergebenes_recht_ids" in mitglied))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_vergebenes_recht_ids = [vergebenes_recht_id];
                else if (!mitglied.zugeordnete_vergebenes_recht_ids.includes(vergebenes_recht_id))
                    LISTEN.mitglieder.tabelle[mitglied_id].zugeordnete_vergebenes_recht_ids.push(vergebenes_recht_id);
            }
        }
    }
};

LISTEN.mitglieder.element_ergaenzen_aktion = function (mitglied) {
    if ("vorstandschaft_janein" in mitglied && mitglied.vorstandschaft_janein == 1) mitglied.vorstandschaft_janein = true;
    else mitglied.vorstandschaft_janein = false;
    if ("aktiv_janein" in mitglied && mitglied.aktiv_janein == 1) mitglied.aktiv_janein = true;
    else mitglied.aktiv_janein = false;
    if ("real_janein" in mitglied && mitglied.real_janein == 1) mitglied.real_janein = true;
    else mitglied.real_janein = false;

    if ("geburt" in mitglied) {
        mitglied.alter = -1 * mitglied.geburt.diffNow("years").years;

        mitglied.geburtstag = mitglied.geburt.set({ year: DATETIME.now().year });
        if (mitglied.geburtstag < DATETIME.now().startOf("day")) mitglied.geburtstag = mitglied.geburtstag.plus({ years: 1 });
        mitglied.alter_geburtstag = mitglied.geburtstag.diff(mitglied.geburt, "years").years;
    }
};

LISTEN.vergebene_rechte.element_ergaenzen_aktion = function (vergebenes_recht) {
    if ("verfuegbares_recht_id" in vergebenes_recht)
        vergebenes_recht.verfuegbares_recht_titel = Schnittstelle_VariableRausZurueck(
            "titel",
            vergebenes_recht.verfuegbares_recht_id,
            "verfuegbare_rechte",
            undefined,
        );
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.mitglied_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Mitglieder_Init() {
    // MITGLIED ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[data-werkzeug="mitglied_erstellen"], .werkzeug[data-werkzeug="mitglied_duplizieren"]', function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // MITGLIED ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="mitglied_aendern"], .werkzeug[data-werkzeug="meine_daten_aendern"]', function () {
        Mitglieder_MitgliedAendern(
            $(this).hasClass("formular_oeffnen"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // PASSWORT ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="passwort_aendern"]', function () {
        Mitglieder_PasswortAendern(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", '.werkzeug[data-werkzeug="passwort_festlegen"]', function () {
        Mitglieder_PasswortFestlegen(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // RECHTE VERGEBEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="rechte_vergeben"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "rechte_vergeben_modal",
            "rechte_vergeben",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            {
                verfuegbares_recht_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verfuegbares_recht_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "vergebene_rechte",
        );
    });

    // RECHTE VERGEBEN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="vergebene_rechte"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                verfuegbares_recht_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verfuegbares_recht_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            "vergebene_rechte",
        );
    });

    // EINMAL-LINK ERSTELLEN
    $(document).on("click", '.werkzeug[data-werkzeug="einmal_link_anzeigen"], .werkzeug[data-werkzeug="einmal_link_email"]', function () {
        Mitglieder_EinmalLinkErstellen(
            $(this).hasClass("formular_oeffnen"),
            $(this).hasClass("bestaetigung_einfordern"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            { email: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-email"), undefined) },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });
}
