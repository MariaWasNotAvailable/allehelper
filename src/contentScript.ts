/**
 * Sums prices of favorited items and appends the sum to the site.
 * @param  {Array} prices HTML collection of price elements.
 */
const sumFavoritedPrices = (prices:Array<HTMLSpanElement>):void => {
    let sumNumber:number = 0;

    prices.forEach((el) => sumNumber += (parseInt(el.innerText.match(/(\d+)/g)!.join(""))) || 0);

    const sumFormatted:string = `Suma: ${sumNumber.toString().slice(0,-2)},${sumNumber.toString().slice(-2)} zł`;

    const sumElement = document.createElement("div");

    sumElement.style.fontFamily = "Open Sans, sans-serif";
    sumElement.style.position = "fixed";
    sumElement.style.bottom = "3%";
    sumElement.style.left = "2%";
    sumElement.style.padding = "10px";
    sumElement.style.borderRadius = "2px";
    sumElement.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    sumElement.innerText = sumFormatted;

    document.querySelector(`[data-box-name="content container"]`)!.append(sumElement);
}

/**
 * Tries turning the animations off.
 */
const turnAnimationsOff = ():void => {
    console.log(`AlleHelper: trying to disable animations`);

    document.head.insertAdjacentHTML('beforeend',
        `<style>
            * 
                transition-property:none!important;
                animation:none!important;
            }
        </style>`);
}

/**
 * Adds a red border to invalid pros-cons fields.
 * @param  {string} selector Element to put the border on.
 */
const markInvalidInputs = (selector:string):void => {
    console.log(`AlleHelper: Running markInvalidInputs on ${selector}`);

    if (!document.querySelector(selector)) {
        console.log(`AlleHelper: ${selector} not found...`);
    } else {
        document.querySelector(selector)!.addEventListener("input", () => {    
            let value = document.querySelector<HTMLInputElement>(selector)!.value;

            if (value.length > 500 || value.split(",").filter((el) => el.length > 50).length) {
                document.querySelector<HTMLInputElement>(selector)!.style.cssText = `border-color: crimson; border-width: 1px; border-style: solid;`;
            } else if (document.querySelector<HTMLInputElement>(selector)!.style.borderStyle) {
                document.querySelector<HTMLInputElement>(selector)!.style.cssText = `border-style: none;`;
            };
        });
    };
};

/**
 * Starts all site routines.
 */
const documentIsReady = ():void => {
    if (window.location.href.indexOf("/obserwowane") > 0) {
        const prices:Array<HTMLSpanElement> = Array.from(document.querySelectorAll('span')).filter((el) =>
            el.textContent!.includes('zł') && el.textContent!.includes(',') && !el.style.length && el.classList.length
        );

        console.log(`AlleHelper: Found ${prices.length} favorited elements`);

        if(prices.length) {
            sumFavoritedPrices(prices);
        };
    };

    if (window.location.href.indexOf("/dodaj-opinie") > -1) {
        const runInputMarking = ():void => {
            markInvalidInputs(`input[placeholder^="Zalety"]`);
            markInvalidInputs(`input[placeholder^="Wady"]`);
        };

        document.querySelector(`div[data-testid="rating"]`)!.addEventListener("click", () => {
            if (document.readyState !== 'complete') {
                window.addEventListener('load', runInputMarking);
            } else {
                runInputMarking();
            };
        });
    };

    chrome.storage.local.get(["turnAnimationsOff"], (result) => {
        console.log(`AlleHelper: got turnAnimationsOff: ${result.turnAnimationsOff}`);

        if (result.turnAnimationsOff) {
            turnAnimationsOff();
        };
    });
};

if (document.readyState !== 'complete') {
    window.addEventListener('load', documentIsReady);
} else {
    documentIsReady();
};