export const pricingPlan = {
  name: "pricingPlan",
  title: "FlipBook Pro — Plan tarifaire",
  type: "document",
  fields: [
    { name: "name", title: "Nom", type: "string" },
    { name: "tagline", title: "Accroche", type: "string" },
    { name: "priceFcfa", title: "Prix (FCFA / an)", type: "number" },
    {
      name: "features",
      title: "Caractéristiques",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "highlight", title: "Mettre en avant", type: "boolean" },
    { name: "order", title: "Ordre", type: "number" },
  ],
};
