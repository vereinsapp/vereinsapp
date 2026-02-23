const STATUS_SPINNER_CLASS = "spinner-border";
const STATUS_SPINNER_HTML =
    '<span class="' + STATUS_SPINNER_CLASS + ' spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></span>';

const TOASTS = new Object(); // enthält später lediglich $blanko_toast
const MODALS = new Object();
const AUTOLOAD_MODALS = new Array();

BLANKOS.modal = new Object();
BLANKOS.modal.bereitstellen_aktion = function ($blanko) {
    const modal_id = $blanko.attr("id");
    if (!(modal_id in MODALS)) {
        MODALS[modal_id] = $blanko;
        if (MODALS[modal_id].hasClass("autoload")) AUTOLOAD_MODALS.push(modal_id);
    }
};
BLANKOS.toast = new Object();
BLANKOS.toast.bereitstellen_aktion = function ($blanko) {
    if (!("$blanko_toast" in TOASTS)) TOASTS.$blanko_toast = $blanko;
};

function Schnittstelle_DomInit() {
    // BLANKOS BEREITSTELLEN
    $(".blanko")
        .each(function () {
            const $blanko = $(this);
            const blanko = $(this).attr("data-blanko");
            $blanko.removeAttr("data-blanko").addClass(blanko);

            if (typeof BLANKOS[blanko].bereitstellen_aktion === "function") BLANKOS[blanko].bereitstellen_aktion($blanko);
        })
        .remove();

    // JETZT AKTUALISIEREN
    $(".jetzt").each(function () {
        Schnittstelle_Dom$JetztAktualisieren($(this));
    });

    // DATENSCHUTZ-RICHTLINIE AKZEPTIEREN
    $(document).on("click", ".btn_datenschutz_richtlinie_akzeptieren", function () {
        Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, DATETIME.now().toISO());
        Schnittstelle_Dom$ModalSchliessen($(this).closest(".modal"));
    });

    // AJAX
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

    // SEITE VERLASSEN
    $(window).on("beforeunload", function () {
        $("#status").html(STATUS_SPINNER_HTML);
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

    // MODAL SCHLIESSEN
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

    // TOAST SCHLIESSEN
    $(document).on("hidden.bs.toast", ".toast", function () {
        $(this).remove();
    });

    // INHALT KOPIEREN (CLIPBOARD)
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

    $(document).on("show.bs.collapse", ".collapse.auswertung_collapse, .collapse.verzeichnis_collapse", function (event) {
        const $collapse = $(this);

        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                toggle_symbol($(this));
            });
        }
    });

    // COLLAPSE SCHLIESSEN
    $(document).on("hide.bs.collapse", ".collapse.auswertung_collapse, .collapse.verzeichnis_collapse", function (event) {
        const $collapse = $(this);

        if ($collapse.is(event.target)) {
            $('.toggle_symbol[data-bs-target="#' + $collapse.attr("id") + '"]').each(function () {
                toggle_symbol($(this));
            });
        }
    });

    function toggle_symbol($symbol) {
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
}
