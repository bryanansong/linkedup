import React, { useState, useEffect } from "react";
import "./App.css";

const initialProfileData = [];

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
		if (profileData !== initialProfileData) {
			chrome.storage.sync.set({ profileData });
		}
	}, [profileData]);

	const handleDelete = (index) => {
		const updatedData = [...profileData];
		updatedData.splice(index, 1);
		setProfileData(updatedData);
	};

	const queryCurrentTab = async () => {
		const [tab] = await chrome.tabs.query({
			active: true,
			lastFocusedWindow: true,
		});
		return tab;
	};

	const extractProfileData = async (tabId) => {
		return new Promise((resolve, reject) => {
			chrome.scripting.executeScript(
				{
					target: { tabId },
					func: () => {
						const nameSelector =
							"#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.hvmQIhWktYNWaSihuubCaqSbELUrJIvSA > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.jkTZSGDHrUQbqICGKZNwfcUnWKwEOqtdk > span > a > h1";
						const imageSelector = ".POZmPZIwuGBDFUytXfVVSpsZBfRBqeUkk";
						const name = document
							.querySelector(nameSelector)
							?.textContent.trim();
						const imageUrl = document.querySelector(imageSelector)?.src;
						return { name, imageUrl };
					},
				},
				(injectionResults) => {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError);
						reject(chrome.runtime.lastError);
					} else if (injectionResults && injectionResults[0]?.result) {
						resolve(injectionResults[0].result);
					} else {
						console.error("No results returned from script injection.");
						reject(
							new Error("No results returned from script injection.")
						);
					}
				}
			);
		});
	};

	const addProfile = (profile) => {
		const isDuplicate = profileData.some(
			(existingProfile) => existingProfile.profileUrl === profile.profileUrl
		);

		if (isDuplicate) {
			alert("This profile is already in your list.");
		} else {
			const updatedData = [...profileData, profile];
			setProfileData(updatedData);
		}
	};

	const handleAddProfile = async () => {
		try {
			const currentTab = await queryCurrentTab();
			if (currentTab) {
				const { name, imageUrl } = await extractProfileData(currentTab.id);
				if (name && imageUrl) {
					const newProfile = {
						name,
						profileUrl: currentTab.url,
						imageUrl,
					};
					addProfile(newProfile);
				} else {
					alert(
						"Unable to extract profile data. Make sure you are on a LinkedIn profile page."
					);
				}
			}
		} catch (error) {
			console.error("Failed to add profile:", error);
		}
	};

	return (
		<div className="app">
			<div className="profile-list">
				<div className="logo-container">
					<img
						className="logo"
						src="https://github.com/bryanansong/linkedup/blob/main/src/assets/Logo.png?raw=true"
						alt="LinkedIn"
					/>
				</div>
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
						<span className="text-name">{profile.name}</span>
						<button
							className="delete-button"
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(index);
							}}
						>
							<img
								src="https://raw.githubusercontent.com/bryanansong/linkedup/8c22c7c4f7a2c0de0431ab4970fc71542d12630c/src/assets/trash.svg"
								alt="Delete"
							/>
						</button>
					</div>
				))}
				{profileData.length < 6 && (
					<div
						className="add-profile"
						onClick={handleAddProfile}
					>
						<button>Add current profile</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
