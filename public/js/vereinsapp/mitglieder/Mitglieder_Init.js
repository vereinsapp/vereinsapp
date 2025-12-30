ELEMENTE.vergebenes_recht.zuordnen_aktion = function (vergebenes_recht) {
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

ELEMENTE.mitglied.ergaenzen_aktion = function (mitglied) {
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

ELEMENTE.vergebenes_recht.ergaenzen_aktion = function (vergebenes_recht) {
    if ("verfuegbares_recht_id" in vergebenes_recht)
        vergebenes_recht.verfuegbares_recht_titel = Schnittstelle_VariableRausZurueck(
            "titel",
            vergebenes_recht.verfuegbares_recht_id,
            "verfuegbare_rechte",
            undefined
        );
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
};

function Mitglieder_Init() {
    // MITGLIED ERSTELLEN
    $(document).on("click", ".btn_mitglied_erstellen", function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // MITGLIED ÄNDERN
    $(document).on("click", ".btn_mitglied_aendern", function () {
        Mitglieder_MitgliedAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // MITGLIED DUPLIZIEREN
    $(document).on("click", ".btn_mitglied_duplizieren", function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // PASSWORT ÄNDERN
    $(document).on("click", ".btn_mitglied_passwort_aendern", function () {
        Mitglieder_PasswortAendern(
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-element_id")
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", ".btn_mitglied_passwort_festlegen", function () {
        Mitglieder_PasswortFestlegen(
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-element_id")
        );
    });

    // RECHTE VERGEBEN (MODAL) ÖFFNEN
    $(document).on("click", ".btn_rechte_vergeben", function () {
        Liste_VerknuepfungenModalOeffnen(
            "rechte_vergeben_modal",
            "rechte_vergeben",
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "mitglieder"
        );
    });

    // RECHTE VERGEBEN
    $(document).on("change", '.chk_verknuepfung_erstellen[data-verknuepfungen="vergebene_rechte"]', function () {
        Liste_VerknuepfungErstellen(
            { $ausloesend: $(this) },
            {
                verknuepfungen: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verknuepfungen"), undefined),
                liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined),
                element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-element_id"), undefined),
                gegen_liste: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_liste"), undefined),
                gegen_element_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-gegen_element_id"), undefined),
                status: Number($(this).is(":checked")),
                // bemerkung: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-bemerkung"), null),
            }
        );
    });

    // EINMAL-LINK ANZEIGEN
    $(document).on("click", ".btn_mitglied_einmal_link_anzeigen", function () {
        Mitglieder_EinmalLinkErstellen(
            $(this).hasClass("formular_oeffnen"),
            $(this).hasClass("bestaetigung_einfordern"),
            {
                $ausloesend: $(this),
                $modal: $(this).closest(".modal"),
                $formular: $(this).closest(".formular"),
            },
            new Object(),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // EINMAL-LINK PER EMAIL VERSCHICKEN
    $(document).on("click", ".btn_mitglied_einmal_link_email", function () {
        Mitglieder_EinmalLinkErstellen(
            $(this).hasClass("formular_oeffnen"),
            $(this).hasClass("bestaetigung_einfordern"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal") },
            { email: true },
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });
}
