import { useState, useEffect } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import OutreachMessagesButton from "./components/OutreachMessagesButton";

const initialProfileData = [];

function App() {
	const [profileData, setProfileData] = useState(initialProfileData);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		const newDarkModeState = !isDarkMode;
		setIsDarkMode(newDarkModeState);
		toast.success(`${newDarkModeState ? "Dark mode" : "Light mode"}`, {
			icon: `${newDarkModeState ? "🌙" : "☀️"}`,
		});
		document.body.classList.remove(isDarkMode ? "dark-mode" : "light-mode");
		document.body.classList.add(isDarkMode ? "light-mode" : "dark-mode");
		chrome.storage.sync.set({ isDarkMode: newDarkModeState });
	};

	const toastOptions = {
		className: "",
		style: {
			fontSize: "15px",
			fontWeight: "bold",
		},
		success: {
			style: {
				background: "#246a2bab",
				border: "1px solid #46db55",
				color: "white",
			},
		},
		error: {
			style: {
				background: "#621616aa",
				border: "1px solid #ee2d2d",
				color: "white",
			},
		},
	};

	useEffect(() => {
		chrome.storage.sync.get("profileData", (data) => {
			if (data.profileData) {
				setProfileData(data.profileData);
			}
		});

		chrome.storage.sync.get(["isDarkMode"], (result) => {
			if (result.isDarkMode !== undefined) {
				setIsDarkMode(result.isDarkMode);
				document.body.classList.toggle("dark-mode", result.isDarkMode);
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
		const profileToDelete = updatedData.splice(index, 1)[0];

		setProfileData(updatedData);

		toast.success(
			(t) => (
				<div className="profile-deleted-toast">
					<span>Profile deleted</span>
					<button
						className="undo-delete-button"
						onClick={() => {
							// Restore the deleted profile
							const restoredData = [...updatedData];
							restoredData.splice(index, 0, profileToDelete);
							setProfileData(restoredData);
							toast.dismiss(t.id);
							toast.success("Profile restored", { icon: "🔄" });
						}}
					>
						Undo
					</button>
				</div>
			),
			{
				duration: 4500,
				icon: "🗑️",
			}
		);
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
						const connectionDistanceSelector = "span.dist-value";

						const name = document
							.querySelector(nameSelector)
							?.textContent.trim();
						const imageUrl = document.querySelector(imageSelector)?.src;

						// Extract company and position
						const experienceSection =
							document.getElementById("experience");
						const mainContainer = experienceSection.parentElement;

						const getPositionText = (selector) =>
							mainContainer
								.querySelector(selector)
								?.textContent?.trim() || "";

						const standardPosition = getPositionText(
							"div > ul > li:nth-child(1) > div > div > div > div > span > span"
						);
						const multiplePositions = getPositionText(
							"div > ul > li:nth-child(1) > div > div > div > a > div > div > div > div > span"
						);

						const company =
							standardPosition ||
							multiplePositions ||
							"No company found";

						const connectionDistance = document
							.querySelector(connectionDistanceSelector)
							?.textContent.trim();
						return { name, imageUrl, company, connectionDistance };
					},
				},
				(injectionResults) => {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError);
						reject(chrome.runtime.lastError);
					} else if (injectionResults && injectionResults[0]?.result) {
						resolve(injectionResults[0].result);
					} else {
						toast.error("Could not extract profile data.");
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
			toast.error("You've already added this profile");
		} else {
			const updatedData = [...profileData, profile];
			setProfileData(updatedData);
			toast.success("Profile added!");
		}
	};

	const handleAddProfile = async () => {
		try {
			const currentTab = await queryCurrentTab();
			if (currentTab) {
				const { name, imageUrl, company, connectionDistance } =
					await extractProfileData(currentTab.id);
				if (name && imageUrl) {
					const newProfile = {
						name,
						profileUrl: currentTab.url,
						imageUrl,
						company,
						connectionDistance: connectionDistance,
						comment: "",
					};
					console.log(newProfile);
					addProfile(newProfile);
				} else {
					toast.error(
						"Unable to add profile. Ensure you're on someone else's LinkedIn page",
						{
							duration: 6000,
						}
					);
				}
			}
		} catch (error) {
			toast.error("Failed to add profile");
		}
	};

	return (
		<div className="app">
			<Toaster
				reverseOrder={false}
				containerStyle={{
					top: 45,
				}}
				toastOptions={toastOptions}
			/>
			<div className="profile-list">
				<div className="header">
					<Header toggleDarkMode={toggleDarkMode} />
				</div>
				<OutreachMessagesButton />
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
