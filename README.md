# Amazon Invoice Downloader

A Firefox add-on that partially automates downloading of Amazon invoices.
It adds a content menu item that will find all of the Amazon invoice links on
your current page and download them.

## Modifications / Enhancements

- Automatic page forward / backword after download to speed up invoice downloading.

- Digital invoice downloads

- Downloads from other pages (subscriptions, etc) supported


## Instructions to use:

This is a Firefox temporary extension. Use the upper-right
pulldown in Firefox to select More Tools->Remote Debugging. Then
select This Firefox->Load Temporary Extensions. Browse to this source
location for amazon-invoice-downloader, select 'manifest.json' and
then Open to load this extension.

Once loaded, when you are on an Amazon order page, the right-click
menu will have an option for 'Amazon Invoice Downloader' which you can
select to download, with options to advance to the next (or previous) page.

## After Download

Sometimes an invoice download is corrupt and it is automatically
re-downloaded resulting in copies that need to be cleaned up.  Loading
these in a browser is a good way to see which ones to keep.

Counting the files downloaded against the listed number of orders in
Amazon is a good sanity check.

Bug: Digital orders don't automatically advance after the first page,
so select the second page by hand.

