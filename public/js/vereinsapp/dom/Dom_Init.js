/**
 */
const DOM_AKTUALISIEREN_EVENTS = new Array();

const BLANKOS = new Object();
const ZUSATZSYMBOLE = new Object();
const SPACER = new Object(); // enthält später lediglich $blanko_spacer
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

    // SPACER-BLANKO IN SPACER BEREITSTELLEN
    $.each(BLANKOS.spacer, function (position, $blanko) {
        SPACER.$blanko_spacer = $blanko;
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
    $(document).on("show.bs.collapse", ".collapse", function (event) {
        if ($(this).is(event.target) && Dom_$QuelleZu$ZielZurueck($(event.target)).filter(".wechselsymbol").exists())
            Dom_$WechselsymbolWechseln(Dom_$QuelleZu$ZielZurueck($(event.target)).filter(".wechselsymbol"));
    });

    // COLLAPSE SCHLIESSEN
    $(document).on("hide.bs.collapse", ".collapse", function (event) {
        if ($(this).is(event.target) && Dom_$QuelleZu$ZielZurueck($(event.target)).filter(".wechselsymbol").exists())
            Dom_$WechselsymbolWechseln(Dom_$QuelleZu$ZielZurueck($(event.target)).filter(".wechselsymbol"));
    });

    // TAB-COLLAPSE WECHSELN
    $(document).on("show.bs.collapse", ".collapse.tab-collapse", function (event) {
        if ($(this).is(event.target))
            $('[data-bs-target="#' + $(this).attr("id") + '"]').each(function () {
                const $tab = $(this);

                $tab.removeAttr("data-bs-toggle");
                $tab.find(".nav-link").addClass("active");

                $tab.closest(".nav-tabs")
                    .find("[data-bs-target")
                    .each(function () {
                        const $anderer_tab = $(this);
                        if ($anderer_tab.attr("data-bs-target") != $tab.attr("data-bs-target")) {
                            $anderer_tab.attr("data-bs-toggle", "collapse");
                            $anderer_tab.find(".nav-link").removeClass("active");
                        }
                    });
            });
    });
}
