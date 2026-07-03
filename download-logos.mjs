import https from "https";
import fs from "fs";
import path from "path";

const dest = "./public/logos";
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const logos = [
  { file: "virginia.png",     url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Seal_of_Virginia.svg/300px-Seal_of_Virginia.svg.png" },
  { file: "georgia.png",      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Seal_of_Georgia_%28U.S._state%29.svg/300px-Seal_of_Georgia_%28U.S._state%29.svg.png" },
  { file: "idaho.png",        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Idaho_state_seal.png/300px-Idaho_state_seal.png" },
  { file: "mississippi.png",  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Seal_of_Mississippi.svg/300px-Seal_of_Mississippi.svg.png" },
  { file: "florida.png",      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Florida-StateSeal.svg/300px-Florida-StateSeal.svg.png" },
  { file: "newmexico.png",    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/New_Mexico_State_Seal.svg/300px-New_Mexico_State_Seal.svg.png" },
  { file: "arkansas.png",     url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Seal_of_Arkansas.svg/300px-Seal_of_Arkansas.svg.png" },
  { file: "ibm.png",          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/320px-IBM_logo.svg.png" },
  { file: "kyndryl.png",      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kyndryl_logo.svg/320px-Kyndryl_logo.svg.png" },
  { file: "thermofisher.png", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Thermo_Fisher_Scientific_logo.svg/320px-Thermo_Fisher_Scientific_logo.svg.png" },
  { file: "marriott.png",     url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Marriott_International.svg/320px-Marriott_International.svg.png" },
  { file: "whataburger.png",  url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Whataburger_full_logo.svg/320px-Whataburger_full_logo.svg.png" },
  { file: "valuemomentum.png",url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ValueMomentum_Logo.svg/320px-ValueMomentum_Logo.svg.png" },
];

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const options = { headers: { "User-Agent": "Mozilla/5.0 (compatible; wget/1.0)", "Referer": "https://en.wikipedia.org/" } };
    const follow = (u) => {
      https.get(u, options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { follow(res.headers.location); return; }
        if (res.statusCode !== 200) { reject(new Error(`${res.statusCode}`)); return; }
        const f = fs.createWriteStream(filepath);
        res.pipe(f);
        f.on("finish", () => { f.close(); resolve(fs.statSync(filepath).size); });
      }).on("error", reject);
    };
    follow(url);
  });
}

for (const logo of logos) {
  const fp = path.join(dest, logo.file);
  try {
    const size = await download(logo.url, fp);
    console.log(`✓ ${logo.file} (${size} bytes)`);
  } catch (e) {
    console.log(`✗ ${logo.file}: ${e.message}`);
  }
}
