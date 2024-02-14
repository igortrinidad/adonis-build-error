# adonis-build-error

## A small repository where I'm facing Adonis V6 build / deploy error...

### To reproduce:

- `git clone https://github.com/igortrinidad/adonis-build-error.git`
- `cd adonis-build-error`
- `npm install`
- `node ace migration:refresh --seed`
- `npm run dev`  - working as expected, you can try out the /general/graphql/interface route
- `npm run build` - it should work there
- `npm run test:build` - it throws ts / import errors depending on how I'm trying to import module in the application, I tried with .ts, without extension, with js, using relative imports, using alias (preferred way)...

I'm using node 21.6.1