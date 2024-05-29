import imagemin from "imagemin";
// import imageminAvif from "imagemin-avif";
import imageminWebp from "imagemin-webp";

const input = "src/img";
const output = "src/img/opt";

const config = {
  destination: output,
  plugins: [imageminWebp({ quality: 50 })],
};

async function convert() {
  await imagemin([`${input}/*.{jpg,png}`], config);
  console.log("Images optimized");
}

convert();
