Key variables

total_donated (Total amount donated )
List of donation assets
this_donation (amount being donated in the current contract call)
discovery_rate (rate that will be distributed to earlier donors) probably will be 20%
this_discovery_amount (amount being distributed right now. this_donation \* discovery_rate = this_discovery_amount
pdf_width (the point at which the PDF is truncated, or xt minus xm. The domain of the pdf . This is 10)

Algorithm steps:

Triggered by a new donation being made.

Inputs: this_donation, this_donor_address

Get the discovery amount.
this_discovery_amount = now. this_donation \* discovery_rate

Update total donated

total_donated = total_donated+this_donation_amount

Distribute the amounts donated across the pdf_width

for each item in the asset + the current donation

For item in donation asset, starting from the beginning:

Add the current donation to the donation asset

function F(x) {
var C = 1.06586348016531;
return -1.06586348016531 \* Math.pow((1/(x + 1)), 1.161) + C;
}
