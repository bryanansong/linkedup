import { useState, useEffect } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import Header from "./components/Header";

function App() {
	const [profileData, setProfileData] = useState([]);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		const newDarkModeState = !isDarkMode;
		setIsDarkMode(newDarkModeState);
		// TODO: Add toast for dark mode toggle
		document.body.classList.toggle("dark-mode", newDarkModeState);
		chrome.storage.sync.set({ isDarkMode: newDarkModeState });
	};

	useEffect(() => {
		chrome.storage.sync.get("profileData", (data) => {
			if (data.profileData) {
				setProfileData(data.profileData);
			}
		});

		// Retrieve the dark mode setting from Chrome storage
		chrome.storage.sync.get(["isDarkMode"], (result) => {
			if (result.isDarkMode !== undefined) {
				setIsDarkMode(result.isDarkMode);
				document.body.classList.toggle("dark-mode", result.isDarkMode);
			}
		});
	}, []);

	useEffect(() => {
		if (!(profileData.length < 1)) {
			chrome.storage.sync.set({ profileData });
		}
	}, [profileData]);

	const handleDelete = (index) => {
		const updatedData = [...profileData];
		updatedData.splice(index, 1);
		setProfileData(updatedData);
	};

	const updateProfileData = (index, newProfileData) => {
		const updatedData = [...profileData];
		updatedData[index] = newProfileData;
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
							"#profile-content > div > div > div > div > main > section > div > div > div > div > span > a > h1";
						const imageSelector =
							"#profile-content > div > div > div > div > main > section > div > div > div > div > button > img";
						const companySelector =
							"#profile-content > div > div > div > div > main > section > div > ul > li > div > div > div > div > span > span";

						const name = document
							.querySelector(nameSelector)
							?.textContent.trim();
						const imageUrl = document.querySelector(imageSelector)?.src;
						const company =
							document.querySelector(companySelector)?.textContent;
						return { name, imageUrl, company };
					},
				},
				(injectionResults) => {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError);
						reject(chrome.runtime.lastError);
					} else if (injectionResults && injectionResults[0]?.result) {
						resolve(injectionResults[0].result);
					} else {
						console.error("Could not extract profile data.");
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
				const { name, imageUrl, company } = await extractProfileData(
					currentTab.id
				);
				if (name && imageUrl) {
					const newProfile = {
						name,
						profileUrl: currentTab.url,
						imageUrl,
						company,
						comment: "",
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
				<div className="header">
					<Header toggleDarkMode={toggleDarkMode} />
				</div>
				{profileData.map((profile, index) => (
					<ProfileCard
						key={index}
						index={index}
						handleDelete={handleDelete}
						updateProfileData={updateProfileData}
						profile={profile}
					/>
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
