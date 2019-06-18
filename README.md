# Shopify Metafields Bulk Delete

There are [many adequate Metafield apps](https://apps.shopify.com/search?q=metafields) in the Shopify app store. Not many of them seem to offer a feature where you can delete **all** of your metafields associated with your products at once. If you accidentally made a mistake during a bulk import this can become a pain. You will need to manually go through the products and delete the metafields more or less one at a time.

This script is the solution to that. It's kind of the nuclear option: it will go through all your products, collected all the metafields associated with them and delete them. No warnings, no prompts. 

**It assumes you know what you are doing and want this so please be very careful!**

## Usage

To use this script clone it and run `npm install` to install the [Shopify Node API package](https://www.npmjs.com/package/shopify-api-node). Once that is finished you can start the process by running:

```
 npm start SHOP_NAME API_KEY PASSWORD
```

You'll need a private app setup in your Shopify store to obtain the `API_KEY` and `PASSWORD` credentials. You can find more information on how to do that here:

[https://help.shopify.com/en/manual/apps/private-apps](https://help.shopify.com/en/manual/apps/private-apps)

## Notes

This script will likely take a while depending on how many products you have in your store and how many metafields are associated with them. The Shopify API rate limits [vary based on the type of request](https://help.shopify.com/en/api/reference/rest-admin-api-rate-limits) but all requests for this script are limited to no more than 2 per second to be safe. 

Lastly, this script was made for a very specific shop that had less than 250 items at the time. If your site has *more* than 250 the code will need to be changed to accommodate querying until all of the products have been retrieved before proceeding. The same likely holds true if you have more than 250 metafields associated with a product, though that is way less common in my experience.

That's it! For other [Shopify](https://www.shopify.com/?ref=snaptortoise) API development needs and solutions, please consider [SnapTortoise](https://snaptortoise.com?shopify)