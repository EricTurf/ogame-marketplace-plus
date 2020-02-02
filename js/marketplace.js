const MARKET_PLACE_COMPONENT = "component=marketplace";

const MARKET_PLACE_TABS = {
  purchases: "history_buying",
  sales: "history_selling",
  create: "create_offer"
};

const TAB_CONTENT_REGEXP = /(?<=&tab=).[Aa-zZ_]+/g;

const ACTIVE_CLASS = "active";

const isOnMarketplace = () =>
  document.location.search.includes(MARKET_PLACE_COMPONENT);

const makeMarketPlaceHref = type => {
  const BASE_HREF = window.location.href;

  if (BASE_HREF.includes("&tab")) {
    return BASE_HREF.replace(TAB_CONTENT_REGEXP, MARKET_PLACE_TABS[type]);
  }
  return `${BASE_HREF}&tab=${MARKET_PLACE_TABS[type]}`;
};

const isButtonCurrent = type =>
  window.location.href.includes(`&tab=${MARKET_PLACE_TABS[type]}`);

const makeButton = button => {
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

const addEasyNavigationButtons = () => {
  const tabsList = document.querySelector(".tabs");

  const buttons = [
    { label: "Create Offer", type: "create" },
    { label: "My Purchases", type: "purchases" },
    { label: "My Sales", type: "sales" }
  ];

  buttons.map(makeButton).forEach(li => tabsList.appendChild(li));
};

if (isOnMarketplace()) {
  document.addEventListener(
    "DOMContentLoaded",
    addEasyNavigationButtons,
    false
  );
}
