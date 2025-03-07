document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("currencyForm");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const msgElement = document.querySelector(".msg");

    const flags = {
        USD: "https://flagcdn.com/us.svg",
        EUR: "https://flagcdn.com/eu.svg",
        INR: "https://flagcdn.com/in.svg",
        JPY: "https://flagcdn.com/jp.svg",
        GBP: "https://flagcdn.com/gb.svg",
        AUD: "https://flagcdn.com/au.svg",
        CAD: "https://flagcdn.com/ca.svg",
        CHF: "https://flagcdn.com/ch.svg",
        CNY: "https://flagcdn.com/cn.svg",
        SEK: "https://flagcdn.com/se.svg"
    };

    // Update flag icons dynamically
    function updateFlags() {
        const fromFlag = document.getElementById("fromFlag");
        const toFlag = document.getElementById("toFlag");
        
        // Update the flag images
        fromFlag.src = flags[fromCurrency.value];
        toFlag.src = flags[toCurrency.value];
    }

    // Function to fetch exchange rates
    async function getExchangeRate(from, to) {
        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data.rates[to];
            return rate;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return null;
        }
    }

    // Event listener to submit the form and perform conversion
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const amount = parseFloat(amountInput.value);
        const fromCurrencyValue = fromCurrency.value;
        const toCurrencyValue = toCurrency.value;

        const rate = await getExchangeRate(fromCurrencyValue, toCurrencyValue);
        if (rate !== null) {
            const convertedAmount = (amount * rate).toFixed(2);
            msgElement.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
        } else {
            msgElement.textContent = "Failed to fetch exchange rate. Please try again.";
        }
    });

    // Update flags when the page loads or dropdown changes
    updateFlags();
    fromCurrency.addEventListener("change", updateFlags);
    toCurrency.addEventListener("change", updateFlags);
});
