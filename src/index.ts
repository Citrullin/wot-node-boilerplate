import { Servient, Helpers } from "@node-wot/core";
import { CoapClientFactory } from "@node-wot/binding-coap";

// create Servient and add CoAP binding
const servient = new Servient();
servient.addClientFactory(new CoapClientFactory());

const wotHelper = new Helpers(servient);
Promise.all(
  [
    wotHelper.fetch("coap:[fe80::9c7c:12ff:fe70:8f55%tapbr0]/.well-known/wot-thing-description"),
    servient.start()
  ]
).then((values) => {
  const td = values[0];
  const WoT = values[1];
  console.log(td)

  return WoT.consume(td).then((thing) => {
    console.log(thing)
    // read a property "string" and print the value
    return thing.readProperty("string").then((s) => {
        console.log(s)
    })
  });
}).catch((err) => { console.error("Fetch error:", err) })