const Header = ({ toggleDarkMode }) => {
	return (
		<div className="header-container">
			<div className="header">
				<button
					className="dark-mode-toggle"
					onClick={toggleDarkMode}
				>
					<svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{document.body.classList.contains("dark-mode") ? (
							<path
								d="M12.4999 2.08331V4.16665M12.4999 20.8333V22.9166M4.16659 12.5H2.08325M6.57712 6.57718L5.10398 5.10404M18.4227 6.57718L19.8959 5.10404M6.57712 18.4271L5.10398 19.9002M18.4227 18.4271L19.8959 19.9002M22.9166 12.5H20.8333M17.7083 12.5C17.7083 15.3765 15.3764 17.7083 12.4999 17.7083C9.62344 17.7083 7.29159 15.3765 7.29159 12.5C7.29159 9.6235 9.62344 7.29165 12.4999 7.29165C15.3764 7.29165 17.7083 9.6235 17.7083 12.5Z"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						) : (
							<path
								d="M22.8695 13.4965C21.4353 16.0124 18.7282 17.7087 15.6249 17.7087C11.0225 17.7087 7.29159 13.9777 7.29159 9.37533C7.29159 6.27182 8.98812 3.56457 11.5044 2.13037C6.2184 2.63156 2.08325 7.08291 2.08325 12.5001C2.08325 18.253 6.74695 22.9167 12.4999 22.9167C17.9168 22.9167 22.368 18.782 22.8695 13.4965Z"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						)}
					</svg>
				</button>
				<h1
					className="logo-text"
					onClick={() => {
						chrome.tabs.create({
							url: "https://chromewebstore.google.com/detail/linkedup/kbnclglbilajgngicamjdmgmlpgfeiik",
						});
					}}
					style={{ cursor: "pointer" }}
				>
					Linked<span>Up</span>
				</h1>
				<a
					href="mailto:bryanansong2003@gmail.com"
					className="message-button"
				>
					<svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.3957 18.75L15.4761 12.5M9.52373 12.5L2.60412 18.75M2.08325 7.29169L10.5884 13.2453C11.2771 13.7274 11.6215 13.9684 11.996 14.0618C12.3269 14.1443 12.6729 14.1443 13.0038 14.0618C13.3784 13.9684 13.7227 13.7274 14.4115 13.2453L22.9166 7.29169M7.08325 20.8334H17.9166C19.6667 20.8334 20.5418 20.8334 21.2103 20.4928C21.7983 20.1931 22.2764 19.7151 22.576 19.1271C22.9166 18.4586 22.9166 17.5835 22.9166 15.8334V9.16669C22.9166 7.41652 22.9166 6.54144 22.576 5.87297C22.2764 5.28496 21.7983 4.8069 21.2103 4.50729C20.5418 4.16669 19.6667 4.16669 17.9166 4.16669H7.08325C5.33309 4.16669 4.45801 4.16669 3.78953 4.50729C3.20153 4.8069 2.72346 5.28496 2.42386 5.87297C2.08325 6.54144 2.08325 7.41652 2.08325 9.16669V15.8334C2.08325 17.5835 2.08325 18.4586 2.42386 19.1271C2.72346 19.7151 3.20153 20.1931 3.78953 20.4928C4.45801 20.8334 5.33309 20.8334 7.08325 20.8334Z"
							stroke={`${
								document.body.classList.contains("dark-mode")
									? "white"
									: "black"
							}`}
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default Header;
