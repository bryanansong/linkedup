import React, { useState, useEffect } from "react";
import "./App.css";

// Correct initial profile data with correct property name and unique URLs
const initialProfileData = [
	{
		name: "Bryan Ansong",
		profileUrl: "https://www.linkedin.com/in/bryanansong/",
		imageUrl:
			"https://media.licdn.com/dms/image/D4E03AQGRu16ltFUVVw/profile-displayphoto-shrink_400_400/0/1713572003638?e=1721865600&v=beta&t=91Hn3aF77oVmBo6HP1_dioZge5mv7x5LxClAzh2CdYc",
	},
	{
		name: "Micah Fossett",
		profileUrl: "https://www.linkedin.com/in/micahfossett/",
		imageUrl:
			"https://media.licdn.com/dms/image/D5603AQGa0iDn8kPNMg/profile-displayphoto-shrink_400_400/0/1683279740366?e=1721865600&v=beta&t=yFA3fWNsAQbDMYUXZeJNExfkUgQcfhy1_UslzNVYhDg",
	},
	{
		name: "Edith Kao",
		profileUrl: "https://www.linkedin.com/in/edith-kao/",
		imageUrl:
			"https://media.licdn.com/dms/image/D4E03AQGK0VWqp-B3XA/profile-displayphoto-shrink_400_400/0/1713902585796?e=1721865600&v=beta&t=g1OY5vHbmzdJDNXL7DtESCnLDRpju3hxbVXZ0x9_QRo",
	},
];

function App() {
	const [profileData, setProfileData] = useState(initialProfileData);

	useEffect(() => {
		chrome.storage.sync.get("profileData", (data) => {
			if (data.profileData) {
				setProfileData(data.profileData);
			}
		});
	}, []);

	useEffect(() => {
		chrome.storage.sync.set({ profileData });
	}, [profileData]);

	const handleDelete = (index) => {
		const updatedData = [...profileData];
		updatedData.splice(index, 1);
		setProfileData(updatedData);
	};

	const handleAddProfile = () => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const currentTab = tabs[0];
			if (currentTab) {
				chrome.scripting.executeScript(
					{
						target: { tabId: currentTab.id },
						func: () => {
							const nameSelector =
								"#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.hvmQIhWktYNWaSihuubCaqSbELUrJIvSA > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.jkTZSGDHrUQbqICGKZNwfcUnWKwEOqtdk > span > a > h1";
							const imageSelector = "#ember35 img";
							const name = document
								.querySelector(nameSelector)
								?.textContent.trim();
							const imageUrl =
								document.querySelector(imageSelector)?.src;
							return { name, imageUrl };
						},
					},
					(injectionResults) => {
						for (const frameResult of injectionResults) {
							const { name, imageUrl } = frameResult.result;
							if (name && imageUrl) {
								const newProfileData = {
									name,
									profileUrl: currentTab.url,
									imageUrl,
								};
								setProfileData([...profileData, newProfileData]);
							} else {
								alert(
									"Unable to extract profile data. Make sure you are on a LinkedIn profile page."
								);
							}
						}
					}
				);
			}
		});
	};

	return (
		<div className="app">
			<div className="profile-list">
				<h1>LinkedUp</h1>
				{profileData.map((profile, index) => (
					<div
						key={index}
						className="profile-card"
						onClick={() => {
							chrome.tabs.create({ url: profile.profileUrl });
						}}
					>
						<img
							src={profile.imageUrl}
							alt={profile.name}
							className="profile-image"
						/>
						<span>{profile.name}</span>
						<button
							className="delete-button"
							onClick={() => handleDelete(index)}
						>
							<img
								src="src/assets/trash.png"
								alt="Delete"
							/>
						</button>
					</div>
				))}
				{profileData.length < 6 && (
					<div className="add-profile">
						<button onClick={handleAddProfile}>
							Add current profile
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
