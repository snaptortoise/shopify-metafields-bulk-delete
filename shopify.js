/**
 * Delete ALL the metafields for ALL your Shopify Products
 * ===
 *
 * Expected usage:
 *
 *     npm start SHOP_NAME API_KEY PASSWORD
 *
 * For more information on creating a private Shopify app:
 * https://help.shopify.com/en/manual/apps/private-apps
 *
 * WARNING: Please do no run this if you're unsure about
 * what your doing! Once your metafields are gone, they're
 * gone. You won't get them back. I can't help you, Shopify
 * can't help you. You're out of luck!
 */

const Shopify = require("shopify-api-node");
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Expected 3 arguments: SHOP_NAME API_KEY PASSWORD");
  return;
}

const shopify = new Shopify({
  shopName: args[0],
  apiKey: args[1],
  password: args[2]
});

const products = shopify.product
  .list({ limit: 250 })
  .then(processProdcuts)
  .catch(error => {
    console.log(`Error ${error}`);
  });

function processProdcuts(products) {
  // console.log(data)
  fieldsToDelete = [];

  products.forEach((product, productIndex) => {
    setTimeout(() => {
      shopify.metafield
        .list({
          metafield: { owner_resource: "product", owner_id: product.id }
        })
        .then(
          metafields => {
            console.log(
              `${productIndex + 1} of ${products.length} : ${product.title} - ${
                metafields.length
              } metafields found`
            );

            if (metafields.length > 0) {
              metafields.forEach(field => {
                fieldsToDelete.push(field.id);
              });
            }

            if (productIndex === products.length - 1) {
              fieldsToDelete.forEach((metafieldID, metafieldIndex) => {
                setTimeout(() => {
                  shopify.metafield
                    .delete(metafieldID)
                    .then(result => {
                      console.log(
                        `Deleting metafield ${metafieldIndex + 1} of ${
                          fieldsToDelete.length
                        }: ${metafieldID}`
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }, 500 * metafieldIndex);
              });
            }
          },
          err => console.error(err)
        );
    }, 500 * productIndex);
  });
}