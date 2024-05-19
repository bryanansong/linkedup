chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getProfileData") {
		const nameSelector =
			"#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.hvmQIhWktYNWaSihuubCaqSbELUrJIvSA > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.jkTZSGDHrUQbqICGKZNwfcUnWKwEOqtdk > span > a > h1";
		const imageSelector = "#ember35 img";

		const name = document.querySelector(nameSelector)?.textContent.trim();
		const imageUrl = document.querySelector(imageSelector)?.src;

		if (name && imageUrl) {
			sendResponse({ name, imageUrl });
		} else {
			sendResponse({
				error: "Unable to extract profile data. Make sure you are on a LinkedIn profile page.",
			});
		}
	}
});
