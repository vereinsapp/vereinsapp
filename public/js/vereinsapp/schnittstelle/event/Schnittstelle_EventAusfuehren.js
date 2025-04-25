function Schnittstelle_EventAusfuehren(event, data, schleife) {
    if (typeof schleife === "undefined") schleife = false;

    if (typeof event === "function") event(new Array(), data);
    else if (isArray(event) && event.length > 0) {
        const folgendes_event = arrayKopiertZurueck(event);
        const naechstes_event = folgendes_event.shift();

        naechstes_event(folgendes_event, data);

        if (schleife) setTimeout(Schnittstelle_EventAusfuehren, AJAX_ZYKLUSZEIT * 1000, event, data, schleife);
    } else {
        /* FEHLER */
    }
}
