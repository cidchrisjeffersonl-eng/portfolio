self.addEventListener("push", function (event) {
  var payload;
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "A stock item needs attention." };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "Lurk: low stock", {
      body: payload.body || "A stock item needs attention.",
      tag: payload.tag || "lurk-low-stock",
      data: { url: payload.url || "/lurk-pos-demo.html" },
    }),
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var target = new URL(event.notification.data.url, self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windows) {
      for (var i = 0; i < windows.length; i++) {
        if (windows[i].url === target && "focus" in windows[i]) return windows[i].focus();
      }
      return self.clients.openWindow(target);
    }),
  );
});
