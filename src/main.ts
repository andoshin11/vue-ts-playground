import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { getLatestMonacoTSVersion } from "@/utils"

Vue.config.productionTip = false;

function importScript(src: string) {
  return new Promise((resolve, reject) => {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.async = true;
    oScript.src = src;
    oScript.onerror = err => {
      reject(new URIError(
        "The script " + (err as any).target.src + " is not accessible."
      ));
    };
    oScript.onload = () => resolve()
    document.body.appendChild(oScript);
  })
}

async function main() {
  await importScript("https://www.typescriptlang.org/v2/js/vs.loader.js");
  const re = window.require as any

  // Check available version:
  // https://typescript.azureedge.net/indexes/releases.json
  const tsVersoin = new URLSearchParams(location.search).get('ts') || getLatestMonacoTSVersion()

  re.config({
    paths: {
      vs: `https://typescript.azureedge.net/cdn/${tsVersoin}/monaco/min/vs`
    },
    // We need this for monaco to work
    ignoreDuplicateModules: ['vs/editor/editor.main'],
  })

  re(['vs/editor/editor.main', 'vs/language/typescript/tsWorker'], (main: any) => {
    window.main = main

    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  })
}

main();
