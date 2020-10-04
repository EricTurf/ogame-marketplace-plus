// ==UserScript==
// @name           OgameMarketPlacePlus
// @description    Adds Missing Buttons to Ogame marketplace

// @version        1.0.0
// @author         ericTurf
// @copyright      2020, ericTurf (https://github.com/EricTurf/ogame-marketplace-plus)
// @license        MIT
// @run-at document-start

// @include     	*.ogame*gameforge.com/game/index.php?page=*

// @exclude        *.ogame*gameforge.com/game/index.php?page=displayMessageNewPage*
// ==/UserScript==

(function () {
  const MARKET_PLACE_COMPONENT = "component=marketplace";

  const MARKET_PLACE_TABS = {
    purchases: "history_buying",
    sales: "history_selling",
    create: "create_offer",
  };

  const TAB_CONTENT_REGEXP = /(?<=&tab=).[Aa-zZ_]+/g;

  const ACTIVE_CLASS = "active";

  const isOnMarketplace = () =>
    document.location.search.includes(MARKET_PLACE_COMPONENT);

  const makeMarketPlaceHref = (type) => {
    const BASE_HREF = window.location.href;

    if (BASE_HREF.includes("&tab")) {
      return BASE_HREF.replace(TAB_CONTENT_REGEXP, MARKET_PLACE_TABS[type]);
    }
    return `${BASE_HREF}&tab=${MARKET_PLACE_TABS[type]}`;
  };

  const isButtonCurrent = (type) =>
    window.location.href.includes(`&tab=${MARKET_PLACE_TABS[type]}`);

  const makeButton = (button) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.innerText = button.label;
    a.href = makeMarketPlaceHref(button.type);

    li.appendChild(a);

    if (isButtonCurrent(button.type)) {
      li.classList.add(ACTIVE_CLASS);
    }

    return li;
  };

  const addGlobalCss = () => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `.marketplace header .tabs {
      flex-wrap: wrap;
      justify-content: flex-start !important;
      height: auto !important;
    }
    
    .marketplace header .tabs li {
      margin-top: 8px;
    }
    
    .marketplace header .tabs li a {
      color: #fff;
    }`;
    document.getElementsByTagName("head")[0].appendChild(style);
  };

  const addEasyNavigationButtons = () => {
    const tabsList = document.querySelector(".tabs");
    tabsList.classList;

    const buttons = [
      { label: "Create Offer", type: "create" },
      { label: "My Purchases", type: "purchases" },
      { label: "My Sales", type: "sales" },
    ];

    buttons.map(makeButton).forEach((li) => tabsList.appendChild(li));
  };

  const init = () => {
    // Since this is a tampermonkey script, add the css class using JS
    addGlobalCss();
    addEasyNavigationButtons();
  };

  if (isOnMarketplace()) {
    document.addEventListener("DOMContentLoaded", init, false);
  }
})();
