const STATUS_SPINNER_CLASS = "spinner-border";
const STATUS_SPINNER_HTML =
    '<span class="' + STATUS_SPINNER_CLASS + ' spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></span>';

const TOASTS = new Object();
const MODALS = new Object();

function Schnittstelle_DomInit() {
    const autoload = new Array();

    $(".blanko")
        .each(function () {
            const $blanko = $(this);
            // Wenn .blanko ein .modal ist
            if ($blanko.hasClass("modal")) {
                const modal_id = $blanko.attr("id");
                if (!(modal_id in MODALS)) {
                    MODALS[modal_id] = $blanko;
                    if (MODALS[modal_id].hasClass("autoload")) autoload.push(modal_id);
                }
            }
            // Wenn .blanko ein .toast ist
            else if ($blanko.hasClass("toast") && !("$blanko_toast" in TOASTS)) TOASTS.$blanko_toast = $blanko;
            // Wenn .blanko ein .element ist
            else if ($blanko.hasClass("element")) {
                const $liste = $blanko.closest(".liste[id][data-liste]");
                const instanz = $liste.attr("id");
                const liste = $liste.attr("data-liste");
                if (liste in LISTEN && instanz in LISTEN[liste].instanz && !("$blanko_element" in LISTEN[liste].instanz[instanz])) {
                    LISTEN[liste].instanz[instanz].$blanko_element = $blanko;
                }
            }
            // Wenn .blanko eine .auswertung ist
            else if ($blanko.hasClass("auswertung")) {
                const $auswertungen = $blanko.closest(".auswertungen[id][data-auswertungen]");
                const instanz = $auswertungen.attr("id");
                const auswertungen = $auswertungen.attr("data-auswertungen");
                if (
                    auswertungen in LISTEN &&
                    instanz in LISTEN[auswertungen].instanz &&
                    !("$blanko_auswertung" in LISTEN[auswertungen].instanz[instanz])
                )
                    LISTEN[auswertungen].instanz[instanz].$blanko_auswertung = $blanko;
            }
            // Wenn .blanko ein .unterverzeichnis ist
            else if ($blanko.hasClass("unterverzeichnis")) {
                const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
                const instanz = $verzeichnis.attr("id");
                const liste = $verzeichnis.attr("data-liste");
                if (liste in LISTEN && instanz in LISTEN[liste].verzeichnis && !("$blanko_unterverzeichnis" in LISTEN[liste].verzeichnis[instanz]))
                    LISTEN[liste].verzeichnis[instanz].$blanko_unterverzeichnis = $blanko;
            }
            // Wenn .blanko eine .datei ist
            else if ($blanko.hasClass("datei")) {
                const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
                const instanz = $verzeichnis.attr("id");
                const liste = $verzeichnis.attr("data-liste");
                if (liste in LISTEN && instanz in LISTEN[liste].verzeichnis && !("$blanko_datei" in LISTEN[liste].verzeichnis[instanz]))
                    LISTEN[liste].verzeichnis[instanz].$blanko_datei = $blanko;
            }
            // Wenn .blanko eine .filtern_eigenschaft ist
            else if ($blanko.hasClass("filtern_eigenschaft")) {
                const typ = $blanko.attr("data-typ");
                $blanko.removeAttr("data-typ");
                if ("$blanko_filtern_eigenschaft" in FILTERN && !(typ in FILTERN.$blanko_filtern_eigenschaft))
                    FILTERN.$blanko_filtern_eigenschaft[typ] = $blanko;
            }
            // Wenn .blanko ein .filtern_wert ist
            else if ($blanko.hasClass("filtern_wert") && !("$filtern_wert" in FILTERN)) FILTERN.$blanko_filtern_wert = $blanko;
        })
        .remove();
    $("#hauptinstanzen").remove();

    $.each(autoload, function () {
        const $modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(undefined, this);

        Schnittstelle_Dom$ModalOeffnen($modal);

        const $formular = $modal.find(".formular");
        if ($formular.exists()) {
            const liste = Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-liste"), undefined);
            Liste_Element$FormularInitialisieren(
                $formular,
                Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-aktion"), undefined),
                Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-" + LISTEN[liste].element + "_id"), undefined),
                liste,
            );
        }
    });

    $(document).ajaxStart(function () {
        $("#status").html(STATUS_SPINNER_HTML);
    });

    const status_standard_html = $("#status").html();
    $(document).ajaxStop(function () {
        $("#status").html(status_standard_html);
    });

    $(document).ajaxSuccess(function () {
        $("#status").removeClass("text-danger");
        $("#status").addClass("text-success");
    });

    $(document).ajaxError(function () {
        $("#status").removeClass("text-success");
        $("#status").addClass("text-danger");
    });

    $(window).on("beforeunload", function () {
        $("#status").html(STATUS_SPINNER_HTML);
    });

    $(".jetzt").each(function () {
        Schnittstelle_JetztAktualisieren($(this));
    });

    // WERKZEUGKASTEN (OFFCANVAS) ÖFFNEN
    $(document).on("show.bs.offcanvas", "#werkzeugkasten", function (event) {
        const $werkzeuge = $(this).find(".werkzeug");
        const $werkzeugkasten_handle = $(event.relatedTarget);

        const liste = $werkzeugkasten_handle.attr("data-liste");
        if (typeof liste !== "undefined") {
            $werkzeuge.attr("data-liste", liste);

            const element_id = $werkzeugkasten_handle.attr("data-" + LISTEN[liste].element + "_id");
            if (typeof element_id !== "undefined") $werkzeuge.attr("data-" + LISTEN[liste].element + "_id", element_id);
            else $werkzeuge.removeAttr("data-" + LISTEN[liste].element + "_id");
        } else $werkzeuge.removeAttr("data-liste");
    });

    $(document).on("hidden.bs.modal", ".modal", function () {
        const $modal = $(this);
        const $umgebung = $modal.parent();
        const $letztes_wartendes_modal = $umgebung.find(".modal.warten:last");

        if (!$modal.hasClass("warten")) $modal.remove();

        if (!$umgebung.find(".modal.show").exists() && $letztes_wartendes_modal.exists()) {
            $letztes_wartendes_modal.removeClass("warten");
            Schnittstelle_Dom$ModalOeffnen($letztes_wartendes_modal);
        }
    });

    $(document).on("hidden.bs.toast", ".toast", function () {
        $(this).remove();
    });

    // PASSWORT ANZEIGEN
    $(document).on("click", ".btn_passwort_anzeigen", function (event) {
        const $btn_passwort_anzeigen = $(this);
        event.preventDefault();
        const feld = $btn_passwort_anzeigen.closest(".input-group").find("input.form-control");

        if (feld.attr("type") == "text") {
            feld.attr("type", "password");
            $btn_passwort_anzeigen.find("i").removeClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
            $btn_passwort_anzeigen.find("i").addClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
        } else if (feld.attr("type") == "password") {
            feld.attr("type", "text");
            $btn_passwort_anzeigen.find("i").removeClass("bi-" + SYMBOLE["unsichtbar"]["bootstrap"]);
            $btn_passwort_anzeigen.find("i").addClass("bi-" + SYMBOLE["sichtbar"]["bootstrap"]);
        }
    });

    // INHALT KOPIEREN
    const CLIPBOARD = new ClipboardJS(".btn_inhalt_kopieren");

    CLIPBOARD.on("success", function (event) {
        Schnittstelle_DomToastFeuern("Kopieren in die Zwischenablage war erfolgreich.");
    });

    CLIPBOARD.on("error", function (event) {
        Schnittstelle_DomToastFeuern("Kopieren in die Zwischenablage ist fehlgeschlagen.", "danger");
    });

    // VALIDATION-TOOLTIPS ENTFERNEN
    $(document).on("focus", "input, select", function () {
        $(this).next(".invalid-tooltip").remove();
    });

    // COLLAPSE ÖFFNEN
    $(document).on("show.bs.collapse", ".collapse.auswertung_collapse, .collapse.verzeichnis_collapse", function (event) {
        const $collapse = $(this);

        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                Schnittstelle_ToggleSymbol($(this));
            });
        }
    });
    $(document).on("show.bs.collapse", ".collapse.tab_collapse", function (event) {
        const $collapse = $(this);

        if ($collapse.is(event.target)) {
            $('.nav-item[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                const $toggle = $(this);

                $toggle.removeAttr("data-bs-toggle");
                $toggle.find(".nav-link").addClass("active");

                $toggle
                    .closest(".nav-tabs")
                    .find(".nav-item")
                    .each(function () {
                        const $anderes_toggle = $(this);
                        if ($anderes_toggle.attr("data-bs-target") != $toggle.attr("data-bs-target")) {
                            $anderes_toggle.attr("data-bs-toggle", "collapse");
                            $anderes_toggle.find(".nav-link").removeClass("active");
                        }
                    });
            });
        }
    });

    // COLLAPSE SCHLIESSEN
    $(document).on("hide.bs.collapse", ".collapse.auswertung_collapse, .collapse.verzeichnis_collapse", function (event) {
        const $collapse = $(this);

        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                Schnittstelle_ToggleSymbol($(this));
            });
        }
    });
}

function Schnittstelle_JetztAktualisieren($jetzt) {
    $jetzt.text(DATETIME.now().toFormat("dd.MM.yyyy HH:mm:ss"));
}

function Schnittstelle_ToggleSymbol($symbol) {
    const toggle_symbol_neu = $symbol.attr("data-toggle_symbol");

    let toggle_symbol_alt = undefined;
    $.each($symbol.attr("class").split(/\s+/), function (position, klasse) {
        if (klasse.slice(0, 3) == "bi-") {
            toggle_symbol_alt = klasse.slice(3, klasse.length);
            return false;
        }
    });

    if (typeof toggle_symbol_alt !== "undefined" && typeof toggle_symbol_neu !== "undefined")
        $symbol
            .removeClass("bi-" + toggle_symbol_alt)
            .addClass("bi-" + toggle_symbol_neu)
            .attr("data-toggle_symbol", toggle_symbol_alt);
}
