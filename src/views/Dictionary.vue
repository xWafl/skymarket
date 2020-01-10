<template>
  <div class="ion-page">
    <ion-content class="ion-padding">
        <ion-item class="refitemwide">
            <ion-label class="ionlabelwide"><h1>Reference</h1></ion-label>
        </ion-item>
        <ion-item class="refitem refitemleft">
            <ion-label class="ionlabel ion-text-wrap">
                <ion-text color="primary">
                    <h2>How we gather data</h2>
                </ion-text>
                <p>
                    Our backend searches for auction data every 2 minutes by item. Every hour, it takes all the closed auctions, takes the average of their prices, and puts the average on the corresponding item's chart. It also records player details and uses that to craft the player profiles.
                </p>
            </ion-label>
        </ion-item>
        <ion-item class="refitem refitemright">
            <ion-label class="ionlabel ion-text-wrap">
                <ion-text color="primary">
                    <h2>Calculating averages</h2>
                </ion-text>
                <p>
                    We calculate 2 averages, one with pure data and one stripped of outliers. First, the "true average" is calculated. This value is saved as it will be important later. To find the average without outliers, we must first guess where the outliers are. Usually, this occurrs when an item sells for either 1.5 times the average price or half the average price. This is just an estimate as it will be revised later. Then, the standard deviation is calculated using the rough average data (without outliers). Using this standard deviation, the average without outliers is recalculated, but this time using the standard deviation rather than some estimated values. The standard deviation is recalculated after that, as well as the buy and sell prices. The process isn't quite perfect with transfer items and other weird items like diamonds, but it's good enough.
                </p>
            </ion-label>
        </ion-item>
        <ion-item class="refitem refitemleft">
            <ion-label class="ionlabel ion-text-wrap">
                <ion-text color="primary">
                    <h2>Standard Deviation</h2>
                </ion-text>
                <p>One of the key elements in the calculation of our values is calculating the standard deviation. There is not much to talk about here, as we just calculate the standard deviation of all the values at first, followed by all the values without outliers. By computing twice, we get good data for outlier removal and for the deviation, all without taking too long to execute.</p>
            </ion-label>
        </ion-item>
        <ion-item class="refitem refitemright">
            <ion-label class="ionlabel ion-text-wrap">
                <ion-text color="primary">
                    <h2>Growth trend</h2>
                </ion-text>
                <p>Another less developed value shown on the site is the growth trend. This value marks how fast an item's price is growing (or shrinking, for that matter). A positive price indicates growth and a negative price indicates loss. If the growth value is 12%, then the price of the item has increased by 12% since the beginning of the time frame. Likewise, if it is -12%, the item's price has decreased.</p>
            </ion-label>
        </ion-item>
        <ion-item class="refitem refitemleft">
            <ion-label class="ionlabel ion-text-wrap">
                <ion-text color="primary">
                    <h2>Buy and Sell values</h2>
                </ion-text>
                <p>The buy and sell prices tell you which prices to buy at <i>if you want a good deal.</i> This does not take into account an item's actual worth; rather, it uses the deviation and an item's average price to determine the best economically viable prices to buy and sell.</p>
            </ion-label>
        </ion-item>
        <br>
        <br>
        <ion-item class="authors">
            <ion-label>
                This site was made by Äkwav and ImperialWaffle.
            </ion-label>
        </ion-item>
    </ion-content>
  </div>
</template>

<style>
    @media only screen and (min-width: 900px) {
        .refitem {
            width: 50%;
            display: inline;
        }
        .refitemright {
            float: right;
        }
        .refitemleft {
            float: left;
        }
        .refitemwide {
            width: 100%;
            display: block;
        }
    }
    @media only screen and (max-width: 600px) {
        .authors {
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background-color: white;
            font-size: 11px;
            text-align: center;
            padding: 0px 0px -10px -10px;
        }
    }
    @media only screen and (min-width: 601px) {
        .authors {
            position: fixed;
            bottom: 0px;
            padding: 0px 0px 10px 10px;
            left: 0px;
            width: 100%;
            background-color: white;
        }
    }
    @media only screen and (min-height: 400px) {
        body {
            overflow: hidden;
            height: 100%;
        }
    }
</style>

<script>
export default {
  name: "Dictionary"
}
</script>