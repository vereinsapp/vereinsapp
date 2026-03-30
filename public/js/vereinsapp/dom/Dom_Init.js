/**
 */

const BLANKOS = new Object();
// const ZUSATZSYMBOLE = new Object();
const HINWEISPUNKTE = new Object(); // enthält später lediglich $blanko_hinweispunkt
const SPINNER = new Object(); // enthält später lediglich $blanko_spinner
const TOASTS = new Object(); // enthält später lediglich $blanko_toast
const MODALS = new Object();
const AUTOLOAD_MODALS = new Array();

function Dom_Init() {
    // BLANKOS BEREITSTELLEN
    $(".blanko")
        .each(function () {
            const $blanko = $(this);
            const blanko = $(this).attr("blanko");
            $blanko.removeAttr("blanko").addClass(blanko);

            if (!(blanko in BLANKOS)) BLANKOS[blanko] = new Array();
            BLANKOS[blanko].push($blanko);
        })
        .remove();

    // WERKZEUG-BLANKO IN WERKZEUGE BEREITSTELLEN
    $.each(BLANKOS.werkzeug, function (position, $blanko) {
        WERKZEUGE.$blanko_werkzeug = $blanko;
    });

    // ZUSATZSYMBOL-BLANKO IN ZUSATZSYMBOLE BEREITSTELLEN
    $.each(BLANKOS.zusatzsymbol, function (position, $blanko) {
        ZUSATZSYMBOLE.$blanko_zusatzsymbol = $blanko;
    });

    // HINWEISPUNKT-BLANKO IN HINWEISPUNKTE BEREITSTELLEN
    $.each(BLANKOS.hinweispunkt, function (position, $blanko) {
        HINWEISPUNKTE.$blanko_hinweispunkt = $blanko;
    });

    // SPINNER-BLANKO IN SPINNER BEREITSTELLEN
    $.each(BLANKOS.spinner, function (position, $blanko) {
        SPINNER.$blanko_spinner = $blanko;
    });

    // TOAST-BLANKO IN TOASTS BEREITSTELLEN
    $.each(BLANKOS.toast, function (position, $blanko) {
        TOASTS.$blanko_toast = $blanko;
    });

    // MODAL-BLANKOS IN MODALS BEREITSTELLEN
    $.each(BLANKOS.modal, function (position, $blanko) {
        const modal_id = $blanko.attr("id");

        if (!(modal_id in MODALS)) MODALS[modal_id] = $blanko;
        if (!(modal_id in AUTOLOAD_MODALS) && $blanko.hasClass("autoload")) AUTOLOAD_MODALS.push(modal_id);
    });

    // AUTOLOAD-MODALS OEFFNEN
    $.each(AUTOLOAD_MODALS, function (position, modal_id) {
        Dom_$ModalOeffnen(Dom_$ModalInitialisiertZurueck(undefined, modal_id));
        // Liste_Element$FormularInitialisieren($modal.find(".formular")); wird nach Dom_Init() aufgerufen in Liste_Init()
    });

    // JETZT AKTUALISIEREN
    $(".jetzt").each(function () {
        $(this).text(DATETIME.now().toFormat("dd.MM.yyyy HH:mm:ss"));
    });

    setInterval(function () {
        $(".jetzt").each(function () {
            $(this).text(DATETIME.now().toFormat("dd.MM.yyyy HH:mm:ss"));
        });
    }, 1000);

    // DATENSCHUTZ-RICHTLINIE OEFFNEN
    if (typeof Localstorage_RausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined) === "undefined")
        Dom_$ModalOeffnen(Dom_$ModalInitialisiertZurueck(undefined, "datenschutz_richtlinie_modal"));

    // DATENSCHUTZ-RICHTLINIE AKZEPTIEREN
    $(document).on("click", ".werkzeug[werkzeug='datenschutz_richtlinie_akzeptieren']", function () {
        Localstorage_Rein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, DATETIME.now().toISO());
        Dom_$ModalSchliessen($(this).closest(".modal"));
    });

    // AJAX
    $(document).ajaxStart(function () {
        $("#status").find(".spinner").remove();
        $("#status")
            .find(".bi-" + SYMBOLE.status)
            .addClass("invisible")
            .after(Dom_$SpinnerInitialisiertZurueck());
    });

    $(document).ajaxStop(function () {
        $("#status").find(".spinner").remove();
        $("#status")
            .find(".bi-" + SYMBOLE.status)
            .removeClass("invisible");
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
        $("#status").find(".spinner").remove();
        $("#status")
            .find(".bi-" + SYMBOLE.status)
            .addClass("invisible")
            .after(Dom_$SpinnerInitialisiertZurueck());
    });

    // MODAL SCHLIESSEN
    $(document).on("hidden.bs.modal", ".modal", function () {
        const $modal = $(this);
        const $umgebung = $modal.parent();
        const $letztes_wartendes_modal = $umgebung.find(".modal.warten:last");

        if (!$modal.hasClass("warten")) $modal.remove();

        if (!$umgebung.find(".modal.show").exists() && $letztes_wartendes_modal.exists()) {
            $letztes_wartendes_modal.removeClass("warten");
            Dom_$ModalOeffnen($letztes_wartendes_modal);
        }
    });

    // TOAST SCHLIESSEN
    $(document).on("hidden.bs.toast", ".toast", function () {
        $(this).remove();
    });

    // INHALT KOPIEREN (CLIPBOARD)
    const CLIPBOARD = new ClipboardJS('.werkzeug[werkzeug="inhalt_kopieren"]');

    CLIPBOARD.on("success", function (event) {
        Dom_ToastFeuern("Kopieren in die Zwischenablage war erfolgreich.");
    });

    CLIPBOARD.on("error", function (event) {
        Dom_ToastFeuern("Kopieren in die Zwischenablage ist fehlgeschlagen.", "danger");
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
        const toggle_symbol_neu = $symbol.attr("toggle_symbol");

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
                .attr("toggle_symbol", toggle_symbol_alt);
    }
}
