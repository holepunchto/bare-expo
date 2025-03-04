console.log("In push-notif.js")
BareKit.on('push', (json, reply) => {
  console.log("Push notification received", json.toString())
  const fakeNotificationPayload = {
    ...JSON.parse(json.toString()),
    subtitle: "Modified by BareKit"
  };

  reply(null, JSON.stringify(fakeNotificationPayload), "utf8");
})
