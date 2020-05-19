const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
setupalerts: String,    
alerts : [Alert],
regions: [String],
subregions: [String],
countries: [String],
alertbyregion(region: String): [Alert],
alertbysubregion(subregion: String): [Alert]
travellers:[Traveller]
}
type Alert{
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String
}
type Traveller{
    name: String,
    country: String,
    timestamp: String
}
type Mutation {
posttraveller(name: String, country: String, timestamp: String): Traveller
}
`);
module.exports = { schema };
