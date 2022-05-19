require("dotenv").config();

const fs = require("fs");
const gradient = require("gradient-string");
const path = require("path");
const ProgressBar = require("progress");
const { fetch } = require("undici");

const {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
} = require("graphql");

const supagradient = gradient(["#00CB8A", "#78E0B8"]);

function fetchGraphQLSchema(url, options) {
  options = options || {}; // eslint-disable-line no-param-reassign

  const bar = new ProgressBar("🔦  Introspecting schema [:bar]", 24);

  const id = setInterval(function () {
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
    }
  }, 250);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  })
    .then((res) => res.json())
    .then((schemaJSON) => {
      if (options.readable) {
        return printSchema(buildClientSchema(schemaJSON.data));
      }

      bar.complete();
      return JSON.stringify(schemaJSON, null, 2);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

const dirPath = path.join(__dirname, "../graphql/schema/");
const filePath = path.join(dirPath, "schema.graphql");

console.log(
  supagradient(
    `🗞   Fetching GraphQL Schema from ${process.env.NEXT_PUBLIC_SUPABASE_URL} ...`
  )
);

fetchGraphQLSchema(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`, {
  readable: true,
}).then((schema) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(filePath, schema, "utf-8");
  console.log(supagradient(`✨  Saved to ${filePath}`));
  console.log(
    '💡  Be sure to run "yarn run codegen" to generate latest types.'
  );
}).catch((error) => {
  console.log("Error building GQL schema", error);
});
