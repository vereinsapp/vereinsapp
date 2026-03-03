function Dom_ToastFeuern(nachricht, farbe = "success") {
    const $toasts = $("#toasts");

    const $neuer_toast = TOASTS.$blanko_toast.clone().removeClass("blanko invisible");
    $neuer_toast.addClass("border-" + farbe);
    $neuer_toast
        .find(".toast-body")
        .addClass("text-" + farbe)
        .text(nachricht);

    $neuer_toast.appendTo($toasts);

    const neuer_toast = bootstrap.Toast.getOrCreateInstance($neuer_toast);
    neuer_toast.show();
}
